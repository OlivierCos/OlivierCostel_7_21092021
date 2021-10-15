import Banner from "./Banner";
import Footer from './Footer';
import Home from './Home';
import Login from "./Login";
import Post from './Post';
import Profil from './Profil';
import Signup from "./Signup";
import '../styles/App.css';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import logo from "../assets/logo_footer.svg";




const history = createBrowserHistory({forceRefresh:true});

function App() {

	return (
		<div className='body_app'>
			<Router history={history}>
			<Banner>
			</Banner>
				<Route path='/' exact component={Login}/>
				<Route path='/home' exact component={Home}/>
				<Route path='/login' exact component={Login}/>
				<Route path='/signup' exact component={Signup}/>
				<Route path='/post' exact component={Post}/>
				<Route path='/profil' exact component={Profil}/>
			</Router>
      		<Footer>
	  			<img src={logo} alt='logo-groupomania' className='img_footer_logo' />
	  			<h4 className='footer'> Copyright</h4>      
			</Footer>
    	</div>
	)
}

export default App;

