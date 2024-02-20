import Button from 'react-bootstrap/Button';

const Init = (props) => {

    return (
        <div>
                <div className='center-hor-ver'>
                    <div>
                        <div>
                            <p>Welcome to The All-In-One Managment Tool </p>
                            <p>Log in with your account to continue</p>    
                        </div>
                        <div>
                            <Button href="/login" variant="primary">Login</Button>
                            <Button href="/signup" variant="primary">Sign Up</Button>
                        </div>
                    </div>
                </div> 
        </div>  
    )
}   

export default Init;