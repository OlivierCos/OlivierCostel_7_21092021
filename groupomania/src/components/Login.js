import '../styles/Login.css';
import React, { useState } from "react";

function Login() {
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
                localStorage.setItem('token', res.token)
                localStorage.setItem('userId', res.userId)
                localStorage.setItem('userAdmin', res.userAdmin)
            })
          .then(() => {
            window.location.href = "/home";
        })
        .catch( (error) => {
            alert(error)
        })
    }

    return(
        <div className="app_body app_body_login">
            <form onSubmit={e => handleSubmit(e)} className="app_login">
                <h1 className="add_post_h1">Connexion</h1>
                <div className="app_login_form">
                        <label htmlFor="email" className="label_login_form">Email : </label>
                        <input className="input_form input_login_form" placeholder="Inscrivez votre email" type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                        <label htmlFor="password" className="label_login_form">Mot de passe : </label>
                        <input className="input_form input_login_form" placeholder="Inscrivez votre Mot de passe" type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className="btn btn_login_form">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;