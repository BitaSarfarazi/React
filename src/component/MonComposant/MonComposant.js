import './MonComposant.css';
import React from 'react';

export default class MonComposant extends React.Component{
  constructor(props){
    super(props);

    this.state = {};
    
  }

  render(){
    return(
       <article>
        Mon composant
      </article>
    );
  }

}
