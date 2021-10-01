import React, { useEffect, useState } from "react";

function Home() {
    const setPosts = useState([]);
    useEffect ( () => {
        fetch("http://localhost:3000/api/posts/", {
            headers: { 
                'Content-Type': 'application/json',
            },
        })

        .then(data => data.json())
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
                        {post.description}
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