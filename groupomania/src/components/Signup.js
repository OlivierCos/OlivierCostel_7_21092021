// import '../styles/Signup.css';
// import React, { useState } from "react";
// import { validName, validEmail, validPassword } from './ValideRegex.js';
// const dotenv = require("dotenv");
// dotenv.config({ path: "../../.env" });

// function Signup() {
    
//     const [firstName, newFirstName] = useState("")
//     const [lastName, newLastName] = useState("")
//     const [email, newEmail] = useState("")
//     const [password, newPassword] = useState("")
//     const [firstNameErr, setFirstNameErr] = useState(false);
//     const [lastNameErr, setLastNameErr] = useState(false);
//     const [pwdErr, setPwdErr] = useState(false);
//     const [emailErr, setEmailErr] = useState(false);
//     const validate = () => {
//         let isValid = true;
//         if (!validName.test(firstName)) {
//            setFirstNameErr(true);
//            isValid = false;
//         }
//         if (!validName.test(lastName)) {
//             setLastNameErr(true);
//             isValid = false;
//          }
//         if (!validPassword.test(password)) {
//            setPwdErr(true);
//            isValid = false;
//         }
//         if (!validEmail.test(email)) {
//             setEmailErr(true);
//             isValid = false;
//         }
//         return isValid;
//     }       

//     const handleSubmit = e => {
//         e.preventDefault();
//         const isValid = validate(); 
        
//         if (isValid) {
//             const data = { firstName: firstName, lastName: lastName, email: email, password: password} 
//             fetch(process.env.REACT_APP_URLAPI + "/api/users/signup", {
//                 method: 'POST',
//                 body: JSON.stringify(data),
//                 headers: { 'Content-Type': 'application/json'}
//             })
//             .then((res) => res.json())
//             .then(() => {
//                 window.location.href = "/login";
//             })
//             .catch( (error) => {
//                 alert(error)
//             })
//         }};

        

//     return(
//         <div className="app_body app_body_login">
//             <form onSubmit={e => handleSubmit(e)} className="app_login">
//                 <h1 className="add_post_h1">Inscription</h1>
//                 <div className="app_login_form">
//                         <label htmlFor="firstName" className="label_login_form">Prénom : </label>
//                         <input className="input_form input_login_form" placeholder="Inscrivez votre prénom" type="text" id="firstName" value={firstName} onChange={e => newFirstName(e.target.value)}/>
//                         {firstNameErr && <p>Impossible d'enregistrer ce prénom</p>}
//                         <label htmlFor="lastName" className="label_login_form">Nom : </label>
//                         <input className="input_form input_login_form" placeholder="Inscrivez votre nom de famille" type="text" id="lastName" value={lastName} onChange={e => newLastName(e.target.value)}/>
//                         {lastNameErr && <p>Impossible d'enregistrer ce nom</p>}
//                         <label htmlFor="email" className="label_login_form">Email : </label>
//                         <input className="input_form input_login_form" placeholder="Inscrivez votre email" type="text" id="email" value={email} onChange={e => newEmail(e.target.value)}/>
//                         {emailErr && <p>Votre email est invalide</p>}
//                         <label htmlFor="password" className="label_login_form">Mot de passe : </label>
//                         <input className="input_form input_login_form" placeholder="Inscrivez votre Mot de passe" type="password" id="password" value={password} onChange={e => newPassword(e.target.value)}/>
//                         {pwdErr && <p>Votre mot de passe doit comporter au moins 8 caractères dont un chiffre</p>}
//                 </div>
//                 <button className="btn btn_login_form">S'inscrire</button>
//             </form>
//         </div>
//     );
// }

// export default Signup;

import '../styles/Signup.css';
import axios from "axios";
import React, { useState } from "react";
import { validName, validEmail, validPassword } from './ValideRegex.js';
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

function Signup() {
    
    const [firstName, newFirstName] = useState("")
    const [lastName, newLastName] = useState("")
    const [email, newEmail] = useState("")
    const [password, newPassword] = useState("")
    const [image, newImage] = useState(null)
    const [firstNameErr, setFirstNameErr] = useState(false);
    const [lastNameErr, setLastNameErr] = useState(false);
    const [pwdErr, setPwdErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const validate = () => {
        let isValid = true;
        if (!validName.test(firstName)) {
           setFirstNameErr(true);
           isValid = false;
        }
        if (!validName.test(lastName)) {
            setLastNameErr(true);
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

            let data = new FormData()
            data.append('image', image)
            data.append('firstName', firstName)
            data.append('lastName', lastName)
            data.append('email', email)
            data.append('password', password)
           
            axios({
                method: 'post',
                url: process.env.REACT_APP_URLAPI + "/api/users/signup",
                data: data,
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(res => res)
                .then(() => {
                window.location.href = "/login";
            })
            .catch( (error) => {
                        alert(error)
                    })
          }};
        //     .then((res) => res.json())
        //     .then(() => {
        //         window.location.href = "/login";
        //     })
        //     .catch( (error) => {
        //         alert(error)
        //     })
        // }};

        

    return(
        <div className="app_body app_body_login">
            <form onSubmit={e => handleSubmit(e)} className="app_login">
                <h1 className="add_post_h1">Inscription</h1>
                <div className="app_login_form">
                        <label htmlFor="firstName" className="label_login_form">Prénom : </label>
                        <input className="input_form input_login_form" placeholder="Inscrivez votre prénom" type="text" id="firstName" value={firstName} onChange={e => newFirstName(e.target.value)}/>
                        {firstNameErr && <p>Impossible d'enregistrer ce prénom</p>}
                        <label htmlFor="lastName" className="label_login_form">Nom : </label>
                        <input className="input_form input_login_form" placeholder="Inscrivez votre nom de famille" type="text" id="lastName" value={lastName} onChange={e => newLastName(e.target.value)}/>
                        {lastNameErr && <p>Impossible d'enregistrer ce nom</p>}
                        <label htmlFor="email" className="label_login_form">Email : </label>
                        <input className="input_form input_login_form" placeholder="Inscrivez votre email" type="text" id="email" value={email} onChange={e => newEmail(e.target.value)}/>
                        {emailErr && <p>Votre email est invalide</p>}
                        <label htmlFor="password" className="label_login_form">Mot de passe : </label>
                        <input className="input_form input_login_form" placeholder="Inscrivez votre Mot de passe" type="password" id="password" value={password} onChange={e => newPassword(e.target.value)}/>
                        {pwdErr && <p>Votre mot de passe doit comporter au moins 8 caractères dont un chiffre</p>}
                        <label htmlFor="image" className="label_login_form">Image : </label>
                        <input className="input_form input_login_form" name="image" type="file" id="image" onChange={(e) => newImage(e.target.files[0])}/>
                </div>
                <button className="btn btn_login_form">S'inscrire</button>
            </form>
        </div>
    );
}

export default Signup;