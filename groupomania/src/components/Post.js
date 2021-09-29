import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
 
function Post() {
    let history = useHistory();
    const [title, newTitle] = useState("")
    const [comment, newComment] = useState("")
    const [gif, newGif] = useState()
 
    const handleSubmit = e => {
        e.preventDefault()
 
        const data = new FormData();
        data.append('gif', gif);
        data.append('title', title);
        data.append('comment', comment);
        data.append('userId', localStorage.getItem("userId"));
 
        fetch("http://localhost:3000/post/", data, {
            method: 'POST',
            body: data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
          })
        .then(res => {
            history.push('/home');
        })
        .catch( (error) => {
            alert(error.response.data.error)
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
                        <label htmlFor="comment">Commentaire : </label>
                        <br></br>
                        <textarea className="input-form-comment" placeholder="Inscrivez votre texte" maxLength="250" type="text" id="comment" name="comment" value={comment} onChange={e => newComment(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="gif">Gif : </label>
                        <br></br>
                        <input className="input-form" type="url" id="gif" name="gif" onChange={e => newGif(e.target.value)}/>
                    </div>
                </div>
                <button className="connexion-button">Ajouter le post !</button>
            </form>
        </div>
    );
}
 
export default Post;