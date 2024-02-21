import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../stylesheets/backgroundstyles.css';
import Navbar from '../components/Navbar';

const Init = (props) => {

    return (
        <>
        <Navbar text="All-In-One Managment Tool"/>
            <div>
                <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }} 
                className='center-hor'>
                    <div>
                        <div>
                            <p>Welcome to The All-In-One Managment Tool </p>
                            <p>Log in with your account to continue</p>    
                        </div>
                        <div>
                            <Link to="/login">
                                <Button variant="primary">Log In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="primary">Sign Up</Button>
                            </Link>
                        </div>
                    </div>
                </div> 
            </div>  
        </>
    )
}   

export default Init;