import '../styles/Home.css';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { validComment } from './ValideRegex.js';
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });


function Home() {

//GET POSTS
    const getAllPost = () => {
        fetch(process.env.REACT_APP_URLAPI + "/api/posts/", {
            headers: { 
            Authorization:'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json'
         } })
            .then(res => res.json())
            .then(data => setPosts(data))}
    
    const [listPosts, setPosts] = useState([]);
    useEffect ( getAllPost , [])

//DELETE POST

    const deletePost = (e, id) => {
        e.preventDefault()
                fetch(process.env.REACT_APP_URLAPI + "/api/posts/" + id, {
            method: 'DELETE',
            headers: {
                Authorization:'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },})
                .then((res) => res.json())
                .then(() => {
                    getAllPost();})
                .catch( (error) => {
                    alert(error)
        })
    }

//MODIFY POST
    const [focusPost, setFocusPost] = useState(-1);
    const [visible, setVisible] = useState(false);
    const [title, modifyTitle] = useState("")
    const [description, modifyDescription] = useState("")
    const [gif, modifyGif] = useState("")
    const modifyPost = (e, id) => {
        e.preventDefault()
        const data = {title: title, description: description, gif: gif } 
                fetch(process.env.REACT_APP_URLAPI + "/api/posts/" + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                Authorization:'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },})
                .then((res) => res.json())
                .then(() => {
                    getAllPost();})
                .catch( (error) => {
                    alert(error)
        })
    }

// GET COMMENTS

const getAllComment = () => {
    fetch(process.env.REACT_APP_URLAPI + "/api/comments/", {
    headers: { 
        Authorization:'Bearer '+localStorage.getItem('token'),
        'Content-Type': 'application/json',
    },})
    .then(res => res.json())  
    .then(data => setComments(data))}

const [listComments, setComments] = useState([]);
useEffect ( getAllComment, [])


//POST COMMENTS 
const [comment, newComment] = useState("")
const [commentErr, setCommentErr] = useState(false);
const validate = () => {
    let isValid = true;
    if (!validComment.test(comment)) {
       setCommentErr(true);
       isValid = false;
    } return isValid;
}
const addComment = (e, id) => {
    e.preventDefault()
    const isValid = validate();
    if (isValid) {
        const data = {comment: comment } 
            fetch(process.env.REACT_APP_URLAPI + "/api/comments/" + id, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },})
            .then((res) => res.json())
            .then(() => {
                getAllComment();})
            .catch( (error) => {
                alert(error)
    })
}}

//DELETE COMMENT

const deleteComment = (e, id) => {
    e.preventDefault()
            fetch(process.env.REACT_APP_URLAPI + "/api/comments/" + id, {
        method: 'DELETE',
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },})
            .then((res) => res.json())
            .then(() => {
                getAllComment();})
            .catch( (error) => {
                alert(error)
    })
}


    return (
        <div className='home_page'>
        <button className='btn btn_link_post'><Link to="/post">Publier un gif</Link></button>
        <ul className="app_body">
            { listPosts.map( (post, id) => {
                return <li key={id} className="app_post">                   
                    <div className="post_title">
                        <h3>{post.title}</h3>                        
                        <div className="post_date">
                            <p>Posté le <Moment format="D MMM YYYY">{post.createdAt}</Moment></p>
                            <p style={{fontWeight:600}}> {post.User.firstName} {post.User.lastName}</p>
                        </div>
                    </div>
                    <img className="post_gif" src={post.gif} alt=""/>
                    <div className="post_body">
                        Légende : {post.description}
                    </div>
                    <div className="btn_modif_remove">
                    {( localStorage.getItem('userId') === post.User.id.toString() || localStorage.getItem('userAdmin') === 'true') &&
                        <React.Fragment>
                            <button onClick={ () => { setVisible(!visible); setFocusPost(post.id) } } className="btn btn_home revome_post_btn">{visible ? 'Annulez votre modification!' : 'Modifiez votre publication'} </button> 
                            <button onClick={ e => deletePost(e, post.id) } className="fa fa-trash btn revome_post_btn"> </button>                   
                        </React.Fragment>
                    }
                    </div>
                    {visible && focusPost === post.id &&
                    <form id="app_modify_post" onSubmit={e => modifyPost(e, post.id)} className="app_post app_modfiy_post">
                        <h1 className="add_post_h1">Modifiez votre Gif :</h1>
                        <div className="app_post_form">
                            <label htmlFor="title" className="add_post_title">Votre Titre : </label>
                            <input className="input_form input_form_title" placeholder="Modifiez votre titre" maxLength="50" type="text" id="title" name="title" value={title} onChange={e => modifyTitle(e.target.value)}/>
                            <label htmlFor="description" className="add_post_description">Légende : </label>
                            <textarea className="input_form input_form_description" placeholder="Modifiez la légende" maxLength="250" type="text" id="comment" name="comment" value={description} onChange={e => modifyDescription(e.target.value)}/>
                            <label htmlFor="gif" className="add_post_gif">Lien du Gif : </label>
                            <input className="input_form" placeholder="https://" type="url" id="gif" name="gif" value={gif} onChange={e => modifyGif(e.target.value)}/>
                        </div>
                        <button className="btn btn_add_post">Modifier le post !</button>
                    </form>
                    }
                    <form onSubmit={e => addComment(e, post.id)} className="add_comment">
                        <div className="add_comment_form">
                            <label htmlFor="comment"></label>                          
                            <input className="input_form_comment" placeholder="Ajoutez un commentaire !" maxLength="250" type="text" id="comment" name="comment" value={comment} onChange={(e) => newComment(e.target.value) }/>                       
                            {commentErr && <p>Votre commentaire doit comporter au moins 2 caractères</p>}
                        </div>
                        <button className="btn btn_home add_comment_btn">Commenter !</button>
                    </form>            
                    <ul className="comments">
                        { listComments.filter((comment)=> comment.PostId === post.id).map( (comment, id) => {
                            return <li key={id} className="display_comment">
                                <div className="titles_comment">
                                    <h4 className="comment_name"> {comment.User.firstName} {comment.User.lastName} </h4>
                                    <h5 className="comment_date">Commentaire écrit le <Moment format="D MMM YYYY">{comment.createdAt}</Moment></h5>
                                    <div className="comment_body">
                                        {comment.comment}
                                    </div>
                                </div>
                                <div className="comment_btn_remove">
                                {( localStorage.getItem('userId') === comment.User.id.toString() || localStorage.getItem('userAdmin') === 'true') &&
                                <React.Fragment> 
                                 <button onClick={ e => deleteComment(e, comment.id) } className="fa fa-trash btn revome_post_btn"> </button>                       
                                </React.Fragment>
                                }
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