import '../styles/Signup.css';
import React, { useState } from "react";
import { validName, validEmail, validPassword } from './ValideRegex.js';

function Signup() {
    const [firstName, newFirstName] = useState("")
    const [lastName, newLastName] = useState("")
    const [email, newEmail] = useState("")
    const [password, newPassword] = useState("")
    const [image, newImage] = useState("")
    const [nameErr, setNameErr] = useState(false);
    const [pwdErr, setPwdErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const validate = () => {
        console.log(firstName);
        let isValid = true;
        if (!validName.test(firstName)) {
           setNameErr(true);
           isValid = false;
        }
        if (!validName.test(lastName)) {
            setNameErr(true);
            isValid = false;
         }
        if (!validPassword.test(password)) {
           setPwdErr(true);
           isValid = false;
        }
        if (!validEmail.test(email)) {
            setEmailErr(true);
            isValid = false;
        }
        return isValid;
    }


    const handleSubmit = e => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
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
        }}

    return(
        <div className="app_body app_body_login">
            <form onSubmit={e => handleSubmit(e)} className="app_login">
                <h1 className="add_post_h1">Inscription</h1>
                <div className="app_login_form">
                        <label htmlFor="firstName" className="label_login_form">Prénom : </label>
                        <input className="input_form input_login_form" placeholder="Inscrivez votre prénom" type="text" id="firstName" value={firstName} onChange={e => newFirstName(e.target.value)}/>
                        <label htmlFor="lastName" className="label_login_form">Nom : </label>
                        <input className="input_form input_login_form" placeholder="Inscrivez votre nom de famille" type="text" id="lastName" value={lastName} onChange={e => newLastName(e.target.value)}/>
                        <label htmlFor="email" className="label_login_form">Email : </label>
                        <input className="input_form input_login_form" placeholder="Inscrivez votre email" type="text" id="email" value={email} onChange={e => newEmail(e.target.value)}/>
                        <label htmlFor="password" className="label_login_form">Mot de passe : </label>
                        <input className="input_form input_login_form" placeholder="Inscrivez votre Mot de passe" type="password" id="password" value={password} onChange={e => newPassword(e.target.value)}/>
                        <label htmlFor="image" className="label_login_form">Image : </label>
                        <input className="input_form input_login_form" type="text" id="image" value={image} onChange={e => newImage(e.target.value)}/>
                </div>
                <button className="btn btn_login_form">S'inscrire</button>
                {emailErr && <p>Your email is invalid</p>}
                {pwdErr && <p>Your password is invalid</p>}
                {nameErr && <p>Your name is invalid</p>}
            </form>
        </div>
    );
}

export default Signup;