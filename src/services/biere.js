export   class BiereService {

    static api_url = "http://127.0.0.1:8000/webservice/php"
    


    static getListeBieres (){
        //const donnees;
        const entete = new Headers();
        entete.append("Content-Type", "application/json");

        const reqOptions = {
            method: "GET",
            headers: entete,
            redirect : "follow"
        };
        //https://developer.mozilla.org/fr/docs/Web/API/Fetch_API
        return fetch (this.api_url + "/biere", reqOptions)
            //.then(reponse=>reponse.json())
            .then((reponse)=>{
                return reponse.json();
            });

    }

    static getOneBiere (id){
        //const donnees;
        const entete = new Headers();
        entete.append("Content-Type", "application/json");

        const reqOptions = {
            method: "GET",
            headers: entete,
            redirect : "follow"
        };
        //https://developer.mozilla.org/fr/docs/Web/API/Fetch_API
        return fetch (this.api_url + "/biere/"+id, reqOptions)
            //.then(reponse=>reponse.json())
            .then((reponse)=>{
                return reponse.json();
            });

    }

    static getNotes(id_biere){
        const entete = new Headers();
        entete.append("Content-Type", "application/json");

        const reqOptions = {
            method: "GET",
            headers: entete,
            redirect : "follow"
        };
        //https://developer.mozilla.org/fr/docs/Web/API/Fetch_API
        return fetch (this.api_url + "/biere/"+id_biere+"/note", reqOptions)
            //.then(reponse=>reponse.json())
            .then((reponse)=>{
                return reponse.json();
            });
    }

    static  getCommentaires(id_biere){
        const entete = new Headers();
        entete.append("Content-Type", "application/json");

        const reqOptions = {
            method: "GET",
            headers: entete,
            redirect : "follow"
        };
        //https://developer.mozilla.org/fr/docs/Web/API/Fetch_API
        return fetch (this.api_url + "/biere/"+id_biere+"/commentaire", reqOptions)
            //.then(reponse=>reponse.json())
            .then((reponse)=>{
                return reponse.json();
            });
    }

    static soumettreCommentaire(oCommentaire){
        console.log(oCommentaire);
        // Faire un fetch en PUT!
        const reqOptions = {
            method: "PUT",
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa("biero:biero")
            },
            body : JSON.stringify(oCommentaire)
        }
        return fetch(this.api_url + "/biere/"+oCommentaire.id_biere+"/commentaire", reqOptions)
            .then((reponse)=>{
                reponse.json();
                // Dois-je faire autre chose après avoir envoyé un nouveau commentaire ? Mystère...
            })
    }

    static soumettreNote(oNote){
        console.log(oNote);
        // Faire un fetch en PUT!
        const reqOptions = {
            method: "PUT",
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa("biero:biero")
            },
            body : JSON.stringify(oNote)
        }
        return fetch(this.api_url + "/biere/"+oNote.id_biere+"/note", reqOptions)
            .then((reponse)=>{
                reponse.json();
                // Dois-je faire autre chose après avoir envoyé un nouveau commentaire ? Mystère...
            })
    }
}
