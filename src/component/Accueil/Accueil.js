import './Accueil.scss';
import React from 'react';
import {Link} from "react-router-dom";


export default class Accueil extends React.Component{
  constructor(props){
    super(props);


    this.state = {};

  }



  render(){
    return(
      <article  >
        <div className="hero-wrap"
             data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="container">
            <div className="row no-gutters slider-text align-items-center justify-content-center">
              <div className="align-items-center col-md-8 d-flex flex-column ftco-animate justify-content-center">
                <div className="text w-100 text-center">
                  <h1 className="mb-4">Good <span>Drink</span> for Good <span>Moments</span>.</h1>
                </div>
                <p>
                  Bienvenue dans votre plateforme Biero de dégustation et évaluation des bières
                </p>
                <p>
                  <Link to='/produit'>
                    <button type="button" className="btn btn-primary"> Visiter maintenant</button>
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </article>
    );
  }

}
