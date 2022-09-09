import './ListeProduit.scss';
import React from 'react';
import Produit from '../Produit/Produit';
import { Link } from 'react-router-dom';
import {BiereService} from '../../services/biere';

export default class ListeProduit extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      items: []

    };
    
    /*for(let i=0; i< 25; i++){
      this.state.items.push({
        id_biere: i,
        nom: "Lorem_"+ i,
        brasserie : "Ipsum_" + (i % 3)
      });
    }*/

    //console.log(this.state.items);

  }

  componentDidMount(){ // j'ai essayé de cette façon comme notre dernier tp, de rendre le code réutilisable à l'intérieur d'autres pages et de ne pas le dupliquer.
  
      BiereService.getListeBieres().then(res => {
          this.setState({items : res.data});
      });



  }


  render(){
    console.log(this.state)
    const mesProduits = this.state.items.map((item, index)=>{
                                              //return <Produit key={item.id} nom={item.nom} fabricant={item.fabricant} id={item.id} />
                                              return <Link key={index}
                                                           className={'no-link-style col-12 col-md-6 col-lg-4'}
                                                           to={"/produit/"+item.id_biere} >
                                                  <Produit produit={item} />
                                              </Link>
                                              //return <Produit key={item.id} {...item} />
                                              })

    return(
      <article>
          <div className={'sub-header'}>
              <div className={'overlay'}>
                  <div className={'container big-title row'}>
                      <h1>Liste de produits</h1>
                      <p>Il y a {mesProduits.length} produits</p>
                  </div>
              </div>
          </div>
          <div className={'container'}>
              <section className={'row list-products'} >
                  {mesProduits}
              </section>
          </div>
      </article>
    );
  }

}
