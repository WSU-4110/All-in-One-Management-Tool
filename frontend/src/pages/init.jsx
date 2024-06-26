import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../stylesheets/backgroundstyles.css';

export default function Init() {
    return (
        <div className='init-background'>
            <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }} 
            className='center-hor'>
                <div>
                    <div>
                        <h2>Welcome to The All-In-One Managment Tool </h2>  
                    </div>
                    <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {/* <p>Log in with your account to continue</p> */}
                    </div>
                    <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <br></br>
                        <Link to="/login" className='mx-1'>
                            <Button variant="primary">Log In</Button>
                        </Link>
                        <Link to="/signup" className='mx-1'>
                            <Button variant="primary">Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </div> 
        </div>
    );
}   
