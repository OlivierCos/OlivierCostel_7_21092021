import '../styles/Banner.css';
import logos from "../assets/logo_banner.svg";
import { Link } from 'react-router-dom';

function Banner() {
	return <div className='banner'>
				<div>
					<img src={logos} alt='logo-groupomania' className='img_banner_logo' />
					<div className='btns'>
						<button className='btn btn_login'><Link to="/Login">Connexion</Link></button>
						<button className='btn btn_signup'><Link to="/Signup">Inscription</Link></button>
					</div>
				</div>
				{/* <div>
					<img src={logos} alt='logo-groupomania' className='img_banner_logo' />
					<div className='btns'>
						<button className='btn btn_login' onClick={(e) => {
                    window.localStorage.removeItem('token')
                  }}><Link to="/login">Déconnexion</Link></button>
						<button className='btn btn_profile'><Link to="/Profile">Profil icone</Link></button>
					</div>
				</div>
				<div>
					<img src={logos} alt='logo-groupomania' className='img_banner_logo' />
					<div className='btns'>
						<button className='btn btn_diconnect' onClick={(e) => {
                    window.localStorage.removeItem('token')
                  }}><Link to="/login">Déconnexion</Link></button>
						<button className='btn btn_home'><Link to="/Home">Home Icone</Link></button>
					</div>
				</div> */}
			</div>
	}
	// else {

	// }
// }

export default Banner