import './DetailsProduit.scss';
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {BiereService} from "../../services/biere";
import avatar from '../../assets/man.png';
import ReactStars from "react-rating-stars-component";



export default function DetailsProduit(props) {
    const params = useParams(); // Récupère les paramètres de l'URL

    const [biere, setBiere] = useState({nom: ""});
    const [note, setNote] = useState({note: 0, nombre: 0});
    const [commentaires, setCommentaires] = useState([]);
    const [monCommentaire, setMonCommentaire] = useState("");
    const [manote, setManote] = useState("");
    //console.log(biere, setBiere);

    function changeCommentaire(evt){
      setMonCommentaire(evt.target.value);
    }

    function soumettreCommentaire(){
        const oCommentaire = {courriel : props.courriel, commentaire : monCommentaire, id_biere: params.id_biere};

        BiereService.soumettreCommentaire(oCommentaire).then(res => {
            setMonCommentaire('');
            BiereService.getCommentaires(params.id_biere).then(res => {
                setCommentaires(res.data)
            });
        });
    }

    function soumettreNote(newNote){
        const oNote = {courriel : props.courriel, note : newNote, id_biere: params.id_biere};

        BiereService.soumettreNote(oNote).then(res => {
            setManote(newNote)
            BiereService.getNotes(params.id_biere).then(res => {
                setNote(res.data)
            });
        });
    }

    console.log('props DetailsProduit', props);
    console.log(params);

    useEffect(()=>{
      // fetch("http://127.0.0.1:8000/webservice/php/biere/"+params.id_biere)
      //   .then(reponse => reponse.json())
      //   .then(donnees => {
      //     setBiere(donnees.data)
      //   })
        BiereService.getOneBiere(params.id_biere).then(res => {
            setBiere(res.data)
            console.log('biere', res.data);
        });

        BiereService.getCommentaires(params.id_biere).then(res => {
            setCommentaires(res.data)
            console.log('Comments', res.data);
        });

        BiereService.getNotes(params.id_biere).then(res => {
            setNote(res.data)
            console.log('Comments', res.data);
        });



      // fetch("http://127.0.0.1:8000/webservice/php/biere/"+params.id_biere+ "/commentaire")
      //   .then(reponse => reponse.json())
      //   .then(donnees => {
      //     setCommentaires(donnees.data)
      //     console.log(donnees.data)
      //   })

    }, []);

    const getFormattedNumber = (number) => {
        return Number(number).toFixed(2)
    }

    const bloclistcomments = commentaires?.map((item, key) => {
        return <div className="comment" key={key}>
            <img src={avatar}/>
            <div className="comment-body">
                <div className="comment-header">
                    <b>{item.courriel}</b>
                    <span className="light-text">{item.date_ajout}</span>
                </div>
                <div className="comment-text">
                    {item.commentaire}
                </div>
            </div>
        </div>
    })?.reverse();

    const newCommentBloc = () => {
        return <div className="comment" >
            <img src={avatar}/>
            <div className="comment-body">
                <div className="comment-header">
                    <b>{props.courriel || 'Anonyme'}</b>
                </div>
                <div className="comment-text new-comment">
                    <input onChange={changeCommentaire}
                           placeholder={'Ajouter un nouveau commentaire'}
                           type="text"
                           value={monCommentaire}
                           disabled={!props.courriel || props.courriel?.length === 0 }
                           className={'form-control input'} />
                    <button onClick={soumettreCommentaire}
                            disabled={!props.courriel || props.courriel?.length === 0 || !(monCommentaire?.trim()?.length>0)}
                            className={'btn btn-primary'}>Soumettre</button>
                </div>
                {
                    (!props.courriel || props.courriel?.length === 0) &&
                    <div className={'light-text orange'}>Veillez vous connecter pour pouvoir soumettre un commentaire</div>
                }
            </div>
        </div>
    }

    const ratingChanged = (newRating) => {
        console.log('new rating', newRating);
        // setManote(newRating * 2);
        soumettreNote(newRating * 2);
    }
    return (
        <article>
            <div className={'sub-header'}>
                <div className={'overlay'}>
                    <div className={'container big-title'}>
                        <h1>{biere?.nom}</h1>
                    </div>
                </div>
            </div>
            <div className={'container'}>
                <div className={'details'}>
                    <h3>Details</h3>
                    <div className={'description row'}>
                        <div className='label col-6 col-md-5 col-lg-3'>Nom :</div>
                        <div  className={'value col bold-value'}>{biere?.nom}</div>
                    </div>
                    <div className={'description row'}>
                        <div className='label  col-6 col-md-5 col-lg-3'>Description :</div>
                        <div className={'value col'}>{biere?.description}</div>
                    </div>
                    <div className={'description row'}>
                        <div className='label  col-6 col-md-5 col-lg-3'>Fabricant : </div>
                        <div className={'value col'}>{biere?.brasserie}</div>
                    </div>
                    <div className={'description row'}>
                        <div className='label  col-6 col-md-5 col-lg-3'>Nombre de notes :</div>
                        <div className={'value col'}>{note?.nombre}</div>
                    </div>
                    <div className={'description row'}>
                        <div className='label  col-6 col-md-5 col-lg-3'>Note moyenne : </div>
                        <div className={'value col green'}>{getFormattedNumber(note?.note)}</div>
                    </div>
                </div>
                {props.courriel && <div className={'comments'}>
                    <h3>Ajouter une note</h3>
                    <div className='note-container'>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                        />
                        {manote && <span className={'light-text'}>({manote} / 10)</span>}
                    </div>
                </div>}
                <div className={'comments'}>
                    <h3>Commentaires</h3>
                    {newCommentBloc()}
                    {bloclistcomments}
                    {/*{blocCommentaire}*/}
                </div>
            </div>

        </article>
    );

}
