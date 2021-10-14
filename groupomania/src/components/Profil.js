import '../styles/Profil.css';
import React, { useEffect, useState } from "react";


function Profil() {
//GET USERPROFIL
const [listProfil, setProfil] = useState([]);
    useEffect ( () => {
        fetch("http://localhost:3000/api/users/" , {
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
            fetch("http://localhost:3000/api/users/" + id, {
                method: 'DELETE',
                headers: {
                    Authorization:'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },})
                    .then((res) => res.json())
                    .then(() => {
                window.localStorage.removeItem('token');
				window.localStorage.removeItem('userId')
                window.location.href = "/signup";
                })
                    .catch( (error) => {
                        alert(error)
            })
        }
//MOFIFY PROFIL        
const [visible, setVisible] = useState(false);
const [firstName, modifyFirstName] = useState("")
const [lastName, modifyLastName] = useState("")
const [email, modifyEmail] = useState("")
const [password, modifyPassword] = useState("")
const [image, modifyImage] = useState("")
const modifyProfil = (e, id) => {
    e.preventDefault()
        const data = {firstName: firstName, lastName: lastName, email: email, password: password, image: image}                 
        fetch("http://localhost:3000/api/users/" + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                Authorization:'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },})
                .then((res) => res.json())
                .then(() => {
            window.location.href = "/home";
            })
                .catch( (error) => {
                    alert(error)
        })
    }
return (
    <div className='home_page'>
        <div className="app_body">
            { listProfil.map( (user, id) => {
            return  <li key={id} className="app_post profil_page">
                        <h1 className="add_post_h1 profil_page_h1">Voici votre Profil :</h1>
                        <div className="profil_page_element">
                            <h3>Votre prénom : </h3>
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
                            <h4>{user.image}</h4>   
                        </div> 
                        <div className="profil_page_element profil_page_btn"> 
                            <button onClick={() => setVisible(!visible)} className="btn revome_post_btn">{visible ? 'X' : 'Modifiez votre profil'} </button>
                                {visible && 
                                // <ModifyForm />
                                <form id="app_modify_post" onSubmit={e => modifyProfil(e, user.id)} className="app_post app_add_post">
                                    <h1 className="add_post_h1">Modifiez votre Profil :</h1>
                                    <div className="app_login_form">
                                        <label htmlFor="firstName" className="label_login_form">Prénom : </label>
                                        <input className="input_form input_login_form" placeholder={user.firstName} type="text" id="firstName" value={firstName} onChange={e => modifyFirstName(e.target.value)}/>
                                        <label htmlFor="lastName" className="label_login_form">Nom : </label>
                                        <input className="input_form input_login_form" placeholder={user.lastName} type="text" id="lastName" value={lastName} onChange={e => modifyLastName(e.target.value)}/>
                                        <label htmlFor="email" className="label_login_form">Email : </label>
                                        <input className="input_form input_login_form" placeholder={user.email} type="text" id="email" value={email} onChange={e => modifyEmail(e.target.value)}/>
                                        <label htmlFor="password" className="label_login_form">Mot de passe : </label>
                                        <input className="input_form input_login_form" placeholder="Inscrivez votre Mot de passe" type="password" id="password" value={password} onChange={e => modifyPassword(e.target.value)}/>
                                        <label htmlFor="image" className="label_login_form">Image : </label>
                                        <input className="input_form input_login_form" type="text" placeholder={user.img} id="image" value={image} onChange={e => modifyImage(e.target.value)}/>
                                    </div>
                                    <button className="btn btn_add_post">Modifier votre Profil !</button>
                                </form>
                                }
                            <button onClick={ e => deleteProfil(e, user.id) } className="btn revome_post_btn remove_profil_btn">Supprimer votre profil </button>
                        </div>   
                    </li>
            })}
        </div>
    </div>
)}
    export default Profil;