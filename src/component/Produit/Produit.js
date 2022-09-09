import './Produit.scss';
import React from 'react';

export default class Produit extends React.Component{
  constructor(props){
    super(props);

    this.state = {};
    
  }

  getFormattedNumber(number){
      return Number(number).toFixed(2)
  }

  render(){
    return(
      <article className='unProduit'>
        <p className={'title'}>
            <span>{this.props.produit.nom}</span>
            <span className={'green'}>{this.getFormattedNumber(this.props.produit.note_moyenne)}</span>
        </p>
        <p className={'description'}>
            <span className='label'>Description :</span>
            <span className={'value'}>{this.props.produit.description}</span>
        </p>
        <p className={'sub-title'}>
            <span className='label'>Fabricant : </span>
            <span className={'value'}>{this.props.produit.brasserie}</span>
        </p>
        <p className={'sub-title'}>
            <span className='label'>Nombre de notes :</span>
            <span className={'value'}>{this.props.produit.note_nombre}</span>
        </p>
        <p className={'sub-title'}>
              <span className='label'>Note moyenne : </span>
              <span className={'value'}>{this.props.produit.note_moyenne}</span>
          </p>
          <div className={'d-flex align-items-center justify-content-center'}>
              <button className={'btn btn-primary'}>
                  Voir
              </button>
          </div>
      </article>
    );
  }

}
