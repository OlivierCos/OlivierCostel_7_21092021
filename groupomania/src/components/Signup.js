import React, { useState } from "react";

function Signup() {
    const [firstName, newFirstName] = useState("")
    const [lastName, newLastName] = useState("")
    const [email, newEmail] = useState("")
    const [password, newPassword] = useState("")
    const [image, newImage] = useState("")


    const handleSubmit = e => {
        e.preventDefault()
        const data = {firstName: firstName, lastName: lastName, email: email, password: password, image: image} 

        fetch("http://localhost:3000/api/users/signup", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
          })
          .then((res) => res.json())
          .then(() => {
            window.location.href = "/login";
          })
        .catch( (error) => {
            error(error.response.error)
        })
    }

    return(
        <div className="app_body">
            <form onSubmit={e => handleSubmit(e)} className="app_signup">
                <h1>Inscription</h1>
                <div className="app_signup_form">
                    <div>
                        <label htmlFor="firstName">Prénom : </label>
                        <br></br>
                        <input className="input-form" placeholder="Inscrivez votre prénom" type="text" id="firstName" value={firstName} onChange={e => newFirstName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="lastName">Nom : </label>
                        <br></br>
                        <input className="input-form" placeholder="Inscrivez votre nom de famille" type="text" id="lastName" value={lastName} onChange={e => newLastName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email : </label>
                        <br></br>
                        <input className="input-form" placeholder="Inscrivez votre email" type="text" id="email" value={email} onChange={e => newEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe : </label>
                        <br></br>
                        <input className="input-form" placeholder="Inscrivez votre Mot de passe" type="password" id="password" value={password} onChange={e => newPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="image">Image : </label>
                        <br></br>
                        <input className="input-form" type="text" id="image" value={image} onChange={e => newImage(e.target.value)}/>
                    </div>
                </div>
                <button className="connexion-button">S'inscrire</button>
            </form>
        </div>
    );
}

export default Signup;