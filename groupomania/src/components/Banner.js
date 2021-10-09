import '../styles/Banner.css';
import logos from "../assets/logo_banner.svg";
import { Link } from 'react-router-dom';




function Banner() {

	const token = window.localStorage.getItem('token');

if(!token) {
   // do something with the sideBar
   return [
	<div className='banner'>
			<img src={logos} alt='logo-groupomania' className='img_banner_logo' />
		    <div className='btns'>
			    <button className='btn btn_login'><Link to="/Login">Connexion</Link></button>
				<button className='btn btn_signup'><Link to="/Signup">Inscription</Link></button>
			</div>
		</div>
   ]
}
else {
	return <div className='banner'>
	<img src={logos} alt='logo-groupomania' className='img_banner_logo' />
	<div className='btns'>
		<button className='btn btn_home'><Link to="/Home">Home Icone</Link></button>
		<button className='btn btn_profile'><Link to="/Profile">Profil icone</Link></button>
		<button className='btn btn_disconnect' onClick={(e) => {
				window.localStorage.removeItem('token');
				window.localStorage.removeItem('userId')
  				}}>
			<Link to="/login">Déconnexion</Link></button>
	</div>
</div>
}
}

// 	 if ( window.localStorage === 0 ){
// 		return window.localStorage === 0 [
// 		 <div className='banner'>
// 				<div>
// 					<img src={logos} alt='logo-groupomania' className='img_banner_logo' />
// 					<div className='btns'>
// 						<button className='btn btn_login'><Link to="/Login">Connexion</Link></button>
// 						<button className='btn btn_signup'><Link to="/Signup">Inscription</Link></button>
// 					</div>
// 				</div> 
// 				<div>
// 					<img src={logos} alt='logo-groupomania' className='img_banner_logo' />
// 					<div className='btns'>
// 						<button className='btn btn_login' onClick={(e) => {
//                     window.localStorage.removeItem('token')
//                   }}><Link to="/login">Déconnexion</Link></button>
// 						<button className='btn btn_profile'><Link to="/Profile">Profil icone</Link></button>
// 					</div>
// 				</div>
// 				<div>
// 					<img src={logos} alt='logo-groupomania' className='img_banner_logo' />
// 					<div className='btns'>
// 						<button className='btn btn_diconnect' onClick={(e) => {
//                     window.localStorage.removeItem('token')
//                   }}><Link to="/login">Déconnexion</Link></button>
// 						<button className='btn btn_home'><Link to="/Home">Home Icone</Link></button>
// 					</div>
// 				</div>
// 		 	</div>
// 		]
// 	}
// 	else {
// 		return <div>
// 		<img src={logos} alt='logo-groupomania' className='img_banner_logo' />
// 		<div className='btns'>
// 			<button className='btn btn_login' onClick={(e) => {
// 		window.localStorage.removeItem('token');
// 		window.localStorage.removeItem('userId')
// 	  }}><Link to="/login">Déconnexion</Link></button>
// 	  		<button className='btn btn_home'><Link to="/Home">Home Icone</Link></button>
// 			<button className='btn btn_profile'><Link to="/Profile">Profil icone</Link></button>
// 		</div>
// 	</div>
// 	  }
// }
// 	else {

// 	}
// }

export default Banner