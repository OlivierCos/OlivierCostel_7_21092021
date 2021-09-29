import '../styles/Banner.css';
import logos from "../assets/logo_banner.svg";
import { Link } from 'react-router-dom';

function Banner() {
	return <div className='banner'>
		<img src={logos} alt='logo-groupomania' className='img_banner_logo' />
					<button><Link to="/Login">Connexion</Link></button>
					</div>
}

export default Banner