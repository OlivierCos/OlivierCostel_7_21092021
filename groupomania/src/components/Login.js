import React, { useState } from "react";
// import {useHistory} from 'react-router-dom';

function Login() {
    // let history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        const data = {email: email, password: password}
        fetch("http://localhost:3000/api/users/login", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(
            (res) => {
                console.log(res)
                localStorage.setItem('token', res.token);
                localStorage.setItem('userId', res.userId);
            })
          .then(() => {
            window.location.href = "/home";
        })
        .catch( (error) => {
            alert(error)
        })
    }

    return(
        <div className="app_body">
            <form onSubmit={e => handleSubmit(e)} className="app_loggin">
                <h1>Connexion</h1>
                <div className="app_loggin_form">
                    <div>
                        <label htmlFor="email">Email : </label>
                        <br></br>
                        <input className="input-form" placeholder="Inscrivez votre email" type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe : </label>
                        <br></br>
                        <input className="input-form" placeholder="Inscrivez votre Mot de passe" type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <button className="connexion-button">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;