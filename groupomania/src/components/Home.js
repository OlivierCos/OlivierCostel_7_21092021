import '../styles/Home.css';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
// import { post } from '../../../backend/app';
// import { post } from '../../../backend/app';
// import ButtonDelete from './Buttons';

function Home() {

    //GET POSTS
    const [listPosts, setPosts] = useState([]);
    useEffect ( () => {
        fetch("http://localhost:3000/api/posts/", {
            headers: { 
            Authorization:'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json'
         } })
            .then(res => res.json()) 
            .then(data => setPosts(data))}, [])

// GET COMMENTS
    const [listComments, setComments] = useState([]);
    useEffect ( () => {
        fetch("http://localhost:3000/api/comments/", {
            headers: { 
                Authorization:'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },})
            .then(res => res.json()) 
            .then(data => setComments(data))}, [])
    
    
   //POST COMMENTS 
    const [comment, newComment] = useState("")
    const addComment = (e, id) => {
        e.preventDefault()
            const data = {comment: comment } 
                fetch("http://localhost:3000/api/comments/" + id, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Authorization:'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },})
                .then((res) => res.json())
                .then(() => {
            window.location.href = "/home";
            })
                .catch( (error) => {
                    alert(error)
        })
    }

//DELETE COMMENTS

    const deletePost = (e, id) => {
        e.preventDefault()
                fetch("http://localhost:3000/api/posts/" + id, {
            method: 'DELETE',
            headers: {
                Authorization:'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },})
                .then((res) => res.json())
                .then(() => {
            window.location.href = "/home";
            })
                .catch( (error) => {
                    alert(error)
        })
    }


    // <button onClick={ e => deletePost(e, post.id) } className="btn revome_post_btn">Supprimer votre publication </button>

//     const ButtonDelete = (post) => {
    // const userId = window.localStorage.getItem('userId');
//     if (post.UserId === userId) {
//             <button onClick={ e => deletePost(e, post.id) } className="btn revome_post_btn">Supprimer votre publication </button>
//     } else {
        
//     }
// }
//     // id={ post.UserId===userId ? 'remove_post_btn' : null }

    //     post.PostId === userId
    // }
  
//        function DeleteButton(post) {
//         const userId = window.localStorage.getItem('userId');
//     if(post.UserId === userId) {
//         return [ 
//             <button id="remove_post_btn" onClick={ e => deletePost(e, post.id) } className="btn revome_post_btn">Supprimer votre publication </button>
//         ]
//     }
//     else {}
// }
    // }
    // else {
    //     return null
    // }}
    return (
        <div className='home_page'>
        <button className='btn btn_link_post'><Link to="/post">Publier un gif</Link></button>
        <ul className="app_body">
            { listPosts.map( (post, id) => {
                return <li key={id} className="app_post">
                    <div className="post_title">
                        <h3>{post.title}</h3>
                        <p>Posté par Jean Michel{post.firstName} {post.lastName}</p>
                    </div>
                    <img className="post_gif" src={post.gif} alt=""/>
                    <div className="post_body">
                        Légende : {post.description}
                    </div>
        
                    {/* <div id={ post.PostId===userId ? 'remove_post_div' : null } className="remove_post_div"> */}
                    {/* {  post.UserId===userId ? ( */}
                    <button onClick={ e => deletePost(e, post.id) } className="btn revome_post_btn">Supprimer votre publication </button>
                     {/* ) : ( null )
                     } */}
                    {/* </div> */}
                    <div className="post_date">
                    <p>Post créé le {post.createdAt.slice(0,10)}</p>
                    </div>
                    <form onSubmit={e => addComment(e, post.id)} className="add_comment">
                        <div className="add_comment_form">
                            <label htmlFor="comment"></label>
                            <input className="input_form_comment" placeholder="Ajoutez un commentaire !" maxLength="250" type="text" id="comment" name="comment" value={comment} onChange={e => newComment(e.target.value)}/>
                        </div>
                        <button className="btn add_comment_btn">Commenter !</button>
                    </form>
                    <ul className="comments">
                        { listComments.filter((comment)=> comment.PostId === post.id).map( (comment, id) => {
                            return <li key={id} className="display_comment">
                                <h4 className="comment_name"> Jean Michel {comment.firstName} {comment.lastName} </h4>
                                <h5 className="comment_date">Commentaire écrit le {comment.createdAt.slice(0,10)}</h5>
                                <div className="comment_body">
                                    {comment.comment}
                                </div>                
                            </li>    
                        }) }
                    </ul>
                </li>                   
            }) }
       </ul>
       </div>
    )
        
}


export default Home;