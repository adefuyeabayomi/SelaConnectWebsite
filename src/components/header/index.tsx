
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logo.png'

function Header() {
    return (
        <header className="header container-fluid no-space">
            <div className='row no-space align-items-center justify-content-center px-3'>
            <div className='w-max-content'><h5><img src={logo} className='logo' /></h5></div>
            <div className='col'></div>
            <nav className="navbar w-max-content">
                <ul className="nav-links">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/payment'}>Payment</Link>
                </ul>
            </nav>
            </div>
        </header>
    );
}

export default Header;
