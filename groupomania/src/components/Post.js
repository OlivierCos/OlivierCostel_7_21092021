import '../styles/Post.css';
import React, { useState } from "react";


function Post() {
    const [title, newTitle] = useState("")
    const [description, newDescription] = useState("")
    const [gif, newGif] = useState("")
 
    const addPost = e => {
        e.preventDefault()
        const data = {title: title, description: description, gif: gif } 
 
        fetch("http://localhost:3000/api/posts/", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Authorization:'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
          })
        .then((res) => res.json())
        .then(() => {
            window.location.href ='/home';
        })
        .catch( (error) => {
            alert(error)
        })
    }
 
    return(
        <div className="app_body">
            <form onSubmit={e => addPost(e)} className="app_post app_add_post">
                <h1 className="add_post_h1">Ajoutez votre Gif :</h1>
                <div className="app_post_form">
                        <label htmlFor="title" className="add_post_title">Votre Titre : </label>
                        <input className="input_form input_form_title" placeholder="Inscrivez votre titre" maxLength="50" type="text" id="title" name="title" value={title} onChange={e => newTitle(e.target.value)}/>
                        <label htmlFor="description" className="add_post_description">Légende : </label>
                        <textarea className="input_form input_form_description" placeholder="Inscrivez une légende" maxLength="250" type="text" id="comment" name="comment" value={description} onChange={e => newDescription(e.target.value)}/>
                        <label htmlFor="gif" className="add_post_gif">Lien du Gif : </label>
                        <input className="input_form" placeholder="https://" type="url" id="gif" name="gif" value={gif} onChange={e => newGif(e.target.value)}/>
                </div>
                <button className="btn btn_add_post">Ajouter le post !</button>
            </form>
        </div>
    );
}
 
export default Post;