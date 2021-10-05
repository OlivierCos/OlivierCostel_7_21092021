import React, { useState } from "react";
 
function Post() {
    const [title, newTitle] = useState("")
    const [description, newDescription] = useState("")
    const [gif, newGif] = useState("")
 
    const handleSubmit = e => {
        e.preventDefault()
        const userId = localStorage.getItem('userId')
        const data = {title: title, description: description, gif: gif, userId: userId } 
 
        fetch("http://localhost:3000/api/posts/", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
          })
        .then((res) => res.json())
        // .then(() => {
        //     window.location.href ='/home';
        // })
        .catch( (error) => {
            alert(error)
        })
    }
 
    return(
        <div className="app_body">
            <form onSubmit={e => handleSubmit(e)} className="app_post">
                <h1>Poster un Gif :</h1>
                <div className="app_post_form">
                    <div>
                        <label htmlFor="title">Titre : </label>
                        <br></br>
                        <input className="input-form" placeholder="Inscrivez votre titre" maxLength="30" type="text" id="title" name="title" value={title} onChange={e => newTitle(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="description">Commentaire : </label>
                        <br></br>
                        <textarea className="input-form-description" placeholder="Inscrivez votre texte" maxLength="250" type="text" id="comment" name="comment" value={description} onChange={e => newDescription(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="gif">Gif : </label>
                        <br></br>
                        <input className="input-form" type="url" id="gif" name="gif" value={gif} onChange={e => newGif(e.target.value)}/>
                    </div>
                </div>
                <button className="connexion-button">Ajouter le post !</button>
            </form>
        </div>
    );
}
 
export default Post;