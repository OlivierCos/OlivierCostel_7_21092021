import '../styles/Profil.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { validName, validEmail, validPassword } from './ValideRegex.js';
const dotenv = require("dotenv");

dotenv.config({ path: "../../.env" });

function Profil() {
//GET USERPROFIL
const [listProfil, setProfil] = useState([]);
    useEffect ( () => {
        fetch(process.env.REACT_APP_URLAPI + "/api/users/" , {
            headers: { 
            Authorization:'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json'
         } })
            .then(res => res.json())
            .then(data => setProfil(data))
        }, [])

//DELETE PROFIL
const deleteProfil = (e, id) => {
    e.preventDefault()
            fetch(process.env.REACT_APP_URLAPI + "/api/users/" + id, {
                method: 'DELETE',
                headers: {
                    Authorization:'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },})
                    .then((res) => res.json())
                    .then(() => {
                window.localStorage.removeItem('token');
				window.localStorage.removeItem('userId');
                window.localStorage.removeItem('userAdmin');
                // window.location.href = "/signup";
                })
                    .catch( (error) => {
                        alert(error)
            })
        }
//MOFIFY PROFIL
const [focusUser, setFocusUser] = useState(-1);        
const [visible, setVisible] = useState(false);
const [firstName, modifyFirstName] = useState("")
const [lastName, modifyLastName] = useState("")
const [email, modifyEmail] = useState("")
const [password, modifyPassword] = useState("")
const [image, modifyImage] = useState(null)
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

const modifyProfil = (e, id) => {
    e.preventDefault()
    const isValid = validate();
    if (isValid) {
        let data = new FormData()
            data.append('image', image)
            data.append('firstName', firstName)
            data.append('lastName', lastName)
            data.append('email', email)
            data.append('password', password)
            
        axios({
        method: 'put',
        url: process.env.REACT_APP_URLAPI + "/api/users/" + id,
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data',
                Authorization:'Bearer '+localStorage.getItem('token'),
                
            },})
            .then(res => res)
                .then((res) => {localStorage.setItem('userImg', res.userImg)})
                .then(() => {
            window.location.href = "/home";
            })
                .catch( (error) => {
                    alert(error)
        })
    }}
return (
    <div className='home_page'>
        <div className="app_body">
            { listProfil.map( (user, id) => {
            return  <li key={id} className="app_post profil_page">
                        <h1 className="add_post_h1 profil_page_h1">Voici votre Profil :</h1>
                        <div className="profil_page_element">
                            <h3>Votre pr??nom : </h3>
                            <h4>{user.firstName}</h4> 
                        </div>
                        <div className="profil_page_element">
                            <h3>Votre nom : </h3>
                            <h4>{user.lastName}</h4>  
                        </div>
                        <div className="profil_page_element">
                            <h3 className="">Votre email : </h3>
                            <h4>{user.email}</h4>                         
                        </div>
                        <div className="profil_page_element">
                            <h3 className="">Votre image : </h3>
                            <img src={user.image} alt=''></img>  
                        </div> 
                        <div className="profil_page_element profil_page_btn"> 
                            <button onClick={() => {setVisible(!visible); setFocusUser(user.id)}} className="btn btn_profile revome_post_btn">{visible ? 'Annulez la modification!' : 'Modifiez votre profil'} </button>
                                {visible && focusUser === user.id &&
                                <form id="app_modify_post" className="app_post app_add_post">
                                    <h1 className="add_post_h1">Modifiez votre Profil :</h1>
                                    <div className="app_login_form">
                                        <label htmlFor="firstName" className="label_login_form">Pr??nom : </label>
                                        <input className="input_form input_login_form" placeholder={user.firstName} type="text" id="firstName" value={firstName} onChange={e => modifyFirstName(e.target.value)}/>
                                        {firstNameErr && <p>Impossible d'enregistrer ce pr??nom</p>}
                                        <label htmlFor="lastName" className="label_login_form">Nom : </label>
                                        <input className="input_form input_login_form" placeholder={user.lastName} type="text" id="lastName" value={lastName} onChange={e => modifyLastName(e.target.value)}/>
                                        {lastNameErr && <p>Impossible d'enregistrer ce nom</p>}
                                        <label htmlFor="email" className="label_login_form">Email : </label>
                                        <input className="input_form input_login_form" placeholder={user.email} type="text" id="email" value={email} onChange={e => modifyEmail(e.target.value)}/>
                                        {emailErr && <p>Votre email est invalide</p>}
                                        <label htmlFor="password" className="label_login_form">Mot de passe : </label>
                                        <input className="input_form input_login_form" placeholder="Inscrivez votre Mot de passe" type="password" id="password" value={password} onChange={e => modifyPassword(e.target.value)}/>
                                        {pwdErr && <p>Votre mot de passe doit comporter au moins 8 caract??res dont un chiffre</p>}
                                        <label htmlFor="image" className="label_login_form">Image : </label>
                                        <input className="input_form input_login_form" name="image" type="file" alt='' id="image" onChange={e => modifyImage(e.target.files[0])}/>
                                    </div>
                                    <button onClick={ e => { modifyProfil(e, user.id) ; setVisible(!visible); setFocusUser(-1) }} className="btn btn_profile btn_add_post">Modifier votre Profil !</button>
                                </form>
                                }
                            <button onClick={ e => deleteProfil(e, user.id) } className="btn revome_post_btn btn_profile remove_profil_btn">Supprimez votre profil </button>
                        </div>   
                    </li>
            })}
        </div>
    </div>
)}
    export default Profil;
    
    // import '../styles/Profil.css';
// import React, { useEffect, useState } from "react";
// import { validName, validEmail, validPassword } from './ValideRegex.js';
// const dotenv = require("dotenv");

// dotenv.config({ path: "../../.env" });

// function Profil() {
// //GET USERPROFIL
// const [listProfil, setProfil] = useState([]);
//     useEffect ( () => {
//         fetch(process.env.REACT_APP_URLAPI + "/api/users/" , {
//             headers: { 
//             Authorization:'Bearer '+localStorage.getItem('token'),
//             'Content-Type': 'application/json'
//          } })
//             .then(res => res.json())
//             .then(data => setProfil(data))
//         }, [])

// //DELETE PROFIL
// const deleteProfil = (e, id) => {
//     e.preventDefault()
//             fetch(process.env.REACT_APP_URLAPI + "/api/users/" + id, {
//                 method: 'DELETE',
//                 headers: {
//                     Authorization:'Bearer '+localStorage.getItem('token'),
//                     'Content-Type': 'application/json',
//                 },})
//                     .then((res) => res.json())
//                     .then(() => {
//                 window.localStorage.removeItem('token');
// 				window.localStorage.removeItem('userId')
//                 window.location.href = "/signup";
//                 })
//                     .catch( (error) => {
//                         alert(error)
//             })
//         }
// //MOFIFY PROFIL
// const [focusUser, setFocusUser] = useState(-1);        
// const [visible, setVisible] = useState(false);
// const [firstName, modifyFirstName] = useState("")
// const [lastName, modifyLastName] = useState("")
// const [email, modifyEmail] = useState("")
// const [password, modifyPassword] = useState("")
// const [firstNameErr, setFirstNameErr] = useState(false);
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

// const modifyProfil = (e, id) => {
//     e.preventDefault()
//     const isValid = validate();
//     if (isValid) {
//         const data = {firstName: firstName, lastName: lastName, email: email, password: password}                 
//         fetch(process.env.REACT_APP_URLAPI + "/api/users/" + id, {
//             method: 'PUT',
//             body: JSON.stringify(data),
//             headers: {
//                 Authorization:'Bearer '+localStorage.getItem('token'),
//                 'Content-Type': 'application/json',
//             },})
//                 .then((res) => res.json())
//                 .then(() => {
//             window.location.href = "/home";
//             })
//                 .catch( (error) => {
//                     alert(error)
//         })
//     }}
// return (
//     <div className='home_page'>
//         <div className="app_body">
//             { listProfil.map( (user, id) => {
//             return  <li key={id} className="app_post profil_page">
//                         <h1 className="add_post_h1 profil_page_h1">Voici votre Profil :</h1>
//                         <div className="profil_page_element">
//                             <h3>Votre pr??nom : </h3>
//                             <h4>{user.firstName}</h4> 
//                         </div>
//                         <div className="profil_page_element">
//                             <h3>Votre nom : </h3>
//                             <h4>{user.lastName}</h4>  
//                         </div>
//                         <div className="profil_page_element">
//                             <h3 className="">Votre email : </h3>
//                             <h4>{user.email}</h4>                         
//                         </div>
//                         <div className="profil_page_element profil_page_btn"> 
//                             <button onClick={() => {setVisible(!visible); setFocusUser(user.id)}} className="btn btn_profile revome_post_btn">{visible ? 'Annulez la modification!' : 'Modifiez votre profil'} </button>
//                                 {visible && focusUser === user.id &&
//                                 <form id="app_modify_post" onSubmit={e => modifyProfil(e, user.id)} className="app_post app_add_post">
//                                     <h1 className="add_post_h1">Modifiez votre Profil :</h1>
//                                     <div className="app_login_form">
//                                         <label htmlFor="firstName" className="label_login_form">Pr??nom : </label>
//                                         <input className="input_form input_login_form" placeholder={user.firstName} type="text" id="firstName" value={firstName} onChange={e => modifyFirstName(e.target.value)}/>
//                                         {firstNameErr && <p>Impossible d'enregistrer ce pr??nom</p>}
//                                         <label htmlFor="lastName" className="label_login_form">Nom : </label>
//                                         <input className="input_form input_login_form" placeholder={user.lastName} type="text" id="lastName" value={lastName} onChange={e => modifyLastName(e.target.value)}/>
//                                         {lastNameErr && <p>Impossible d'enregistrer ce nom</p>}
//                                         <label htmlFor="email" className="label_login_form">Email : </label>
//                                         <input className="input_form input_login_form" placeholder={user.email} type="text" id="email" value={email} onChange={e => modifyEmail(e.target.value)}/>
//                                         {emailErr && <p>Votre email est invalide</p>}
//                                         <label htmlFor="password" className="label_login_form">Mot de passe : </label>
//                                         <input className="input_form input_login_form" placeholder="Inscrivez votre Mot de passe" type="password" id="password" value={password} onChange={e => modifyPassword(e.target.value)}/>
//                                         {pwdErr && <p>Votre mot de passe doit comporter au moins 8 caract??res dont un chiffre</p>}
//                                         </div>
//                                     <button className="btn btn_profile btn_add_post">Modifier votre Profil !</button>
//                                 </form>
//                                 }
//                             <button onClick={ e => deleteProfil(e, user.id) } className="btn revome_post_btn btn_profile remove_profil_btn">Supprimez votre profil </button>
//                         </div>   
//                     </li>
//             })}
//         </div>
//     </div>
// )}
//     export default Profil;