import './Entete.scss';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from "../../assets/logo.svg"

export default class Entete extends React.Component{
  constructor(props){
    super(props);
    this.state = {courriel : localStorage.getItem('courriel') || null};
    
    this.login = this.login.bind(this);
    this.loggout = this.loggout.bind(this);
    this.changeCourriel = this.changeCourriel.bind(this);

  }


  login(){
    console.log(this.state.courriel);
    // Il pourrait y avoir des conditions ici... comme une validation de courriel avant d'appeler this.props.fctLogin... tsé un if...
    this.props.fctLogin(this.state.courriel);
  }

  loggout(){
    console.log(this.state.courriel);
    // Il pourrait y avoir des conditions ici... comme une validation de courriel avant d'appeler this.props.fctLogin... tsé un if...
    this.props.fctLoggout();
  }

  changeCourriel(evt){
      if(!evt || !evt.target) {}
      this.setState({courriel : evt.target.value})
    // }
  }

  validateEmail (email) {
    return String(email)
        .toLowerCase()
        .match(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/
        );
  };

  isLoginDisabled(){
    if(!this.state.courriel || this.state.courriel?.length === 0){
      return true;
    }
    if(!this.validateEmail(this.state.courriel)){
      return true;
    }
    return false;
  }

  render(){
    const titre = this.props.titre || "Titre de l'application";
    // Il peut y avoir du code ici...
    const courriel = this.state.courriel;
    console.log('courrienl', courriel);

    const newCourriel =
       <div className={'login'}>
        <input onChange={this.changeCourriel}
               type="text"
               placeholder={"courriel@mail.com"}
               name="courriel" className={'form-control'} />
        <button onClick={this.login}
                className={'btn-primary btn'}
                disabled={this.isLoginDisabled()}
        >Se connecter</button>
      </div>

    const connectedUSer = (courriel) => {
      return <div className={'login'}>
        <span className={'courrielLabel'}>{courriel}</span>
        <button onClick={this.loggout} className={'btn-danger btn'}>Se déconnecter</button>
      </div>
    }
    console.log('anas', courriel);
    return(
      <header className={'header container row'}>

          <div className={'logo col text-center'}>
            <Link to='/'>
             <img src={logo} alt="React Logo" />
            </Link>
          </div>

        <nav className={'col text-center'}>
          <ul className={'test'}>
            {/*<li><a href='/'>Accueil (a)</a></li>
            <li><Link to='/'>Accueil (Link)</Link></li> */}
            <li><NavLink to='/'>Accueil</NavLink></li>
            {/*<li><a href='/produit'>Liste des produits (a)</a></li>
            <li><Link to='/produit'>Liste des produits (link)</Link></li>*/}
            <li><NavLink to='/produit'>Liste des produits</NavLink></li>
          </ul>
        </nav>
        <div className={'login col text-center'}>
          {localStorage.getItem('courriel') ? connectedUSer(localStorage.getItem('courriel')):  newCourriel}
        </div>
      </header>
    );
  }

}
