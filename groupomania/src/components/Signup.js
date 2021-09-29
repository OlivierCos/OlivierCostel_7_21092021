import React, { useState } from "react";
import {useHistory} from 'react-router-dom';

function Signup() {
    let history = useHistory();
    const [nom, newNom] = useState("")
    const [email, newEmail] = useState("")
    const [pass, newPass] = useState("")

    const undleSubmit = e => {
        e.preventDefault()
        const data = {name: nom, email: email, password: pass} 

        fetch("http://localhost:3000/signup", {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/json' },
          })
        .then(res => { 
            history.push('/login')
        })
        .catch( (error) => {
            error(error.response.data.error)
        })
    }

    return(
        <div className="app_body">
            <form onSubmit={e => undleSubmit(e)} className="app_signup">
                <h1>Inscription</h1>
                <div className="app_signup_form">
                    <div>
                        <label htmlFor="name">Pseudo : </label>
                        <br></br>
                        <input className="input-form" placeholder="Inscrivez votre pseudo" type="text" id="name" value={nom} onChange={e => newNom(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email : </label>
                        <br></br>
                        <input className="input-form" placeholder="Inscrivez votre email" type="text" id="email" value={email} onChange={e => newEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe : </label>
                        <br></br>
                        <input className="input-form" placeholder="Inscrivez votre Mot de passe" type="password" id="password" value={pass} onChange={e => newPass(e.target.value)}/>
                    </div>
                </div>
                <button className="connexion-button">S'inscrire</button>
            </form>
        </div>
    );
}

export default Signup;