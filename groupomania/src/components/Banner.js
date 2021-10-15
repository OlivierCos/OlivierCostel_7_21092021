import '../styles/Banner.css';
import logos from "../assets/logo_banner.svg";
import { Link } from 'react-router-dom';

function Banner() {

const token = window.localStorage.getItem('token');

if(!token) {
   return [
	<div className='banner'>		
		<div className="banner_componants banner_login">
			<img src={logos} alt='logo-groupomania' className='img_banner_logo' />
		    <div className='btns'>
			    <button className='btn btn_login'><Link to="/Login">Connexion</Link></button>
				<button className='btn btn_signup'><Link to="/Signup">Inscription</Link></button>
			</div>
		</div>
	</div>
   ]
}
else {
	return <div className='banner'>
		<div className="banner_componants">
	<img src={logos} alt='logo-groupomania' className='img_banner_logo' />
	<div className='btns'>
		<Link to="/Home"><i className="fas fa-home"></i></Link>
		<Link to="/Profil"><i className="fas fa-user-circle"></i></Link>
			<Link to="/login"><i className="fas fa-power-off" onClick={() => {
				window.localStorage.removeItem('token');
				window.localStorage.removeItem('userAdmin');
				window.localStorage.removeItem('userId')
  				}}></i></Link>
	</div>
	</div>
</div>
}
}

export default Banner