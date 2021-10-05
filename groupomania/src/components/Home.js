import '../styles/Home.css';
import React, { useEffect, useState } from "react";

function Home() {
    const [listPosts, setPosts] = useState([]);
    useEffect ( () => {
        fetch("http://localhost:3000/api/posts/", {
            headers: { 
            Authorization:'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json'
         } })
            .then(res => res.json()) 
            .then(data => setPosts(data))
    }, [])
    const [listComments, setComments] = useState([]);
    useEffect ( () => {
        fetch("http://localhost:3000/api/comments/", {
            headers: { 
                'Content-Type': 'application/json',
            },
        })

            .then(res => res.json()) 
            .then(data => setComments(data))
    }, [])
    const [comment, newComment] = useState("")
    const handleSubmit = e => {
        e.preventDefault()

        const data = {comment: comment } 


 
        fetch("http://localhost:3000/api/comments/", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
          })
        .then((res) => res.json())
        .then(() => {
            window.location.href = "/home";
        })
        .catch( (error) => {
            alert(error)
        })
    }

    return (

        
        <div className="app_body">
            { listPosts.map( (post, id) => {
                return <div key={id} className="app_post">
                    <div className="post_title">
                        <h3>{post.title}</h3>
                    </div>
                    <img className="post_gif" src={post.gif} alt=""/>
                    <div className="post_body">
                        {post.description}
                    </div>
                    <form onSubmit={e => handleSubmit(e)} className="app_comment">
                        <div className="app_comment_form">
                                <label htmlFor="comment">Commenter : </label>
                                <input className="input-form" placeholder="Inscrivez votre commentaire" maxLength="250" type="text" id="comment" name="comment" value={comment} onChange={e => newComment(e.target.value)}/>
                        </div>
                        <button className="connexion-button">Ajouter le commentaire !</button>
                    </form>
                    <div className="post_date">
                        <p>Post créé le {post.createdAt}</p>
                    </div>
                    <div>
                        { listComments.map( (comment, id) => {
                            return <div key={id} className="app_comment">
                                        <div className="comment">
                                            {comment.comment}
                                        </div>
                                        <p> Ecrit par : {comment.name} </p>
                                    </div>    
                            }) }
                    </div>
                </div>                   
            }) }
       </div>
    )
        
}


export default Home;