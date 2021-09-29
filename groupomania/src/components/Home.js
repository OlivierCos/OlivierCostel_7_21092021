import React, { useEffect, useState } from "react";

function Home() {
    const [setPosts, getPosts] = useState([]);
    useEffect ( () => {
        fetch("http://localhost:3000/post/", {
            headers: { 
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            getPosts(res.data)
        })
        .catch( (error) => {
            alert(error);
        })
    })

    return (
        <div className="app-body">
            { setPosts.map( (post, key) => {

                return <div key={key} className="app_post">
                    <div className="post_title">
                        <h3>{post.title}</h3>
                    </div>
                    <img className="post_gif" src={post.gif} alt=""/>
                    <div className="post_body">
                        {post.content}
                    </div>
                    <br></br>
                    <div className="post_date">
                        <p>Post créé le {post.createdAt}</p>
                    </div>
                </div>

            }) }
       </div>
    )
        
}


export default Home;