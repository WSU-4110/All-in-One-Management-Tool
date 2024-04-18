import '../stylesheets/notificationpagestyles.css';
import '../stylesheets/backgroundstyles.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NotificationIcon from '../images/NotificationIcon.png';
import {useNavigate} from 'react-router-dom'

export default function Noficications() {
    const navigate = useNavigate();
    let events;
    
    try {
        events = JSON.parse(sessionStorage.getItem('Tasks'));
    } catch {
        events = '';
        navigate("/login");
    }

    try {
        if (sessionStorage['Username'] != null) {
            console.log("");
        } else {
            navigate("/login");
        }
    } catch {
        navigate("/login");
    }

    const handleClick = () => {
        console.log(events);
    }
    const handleCalendarClick = () => {
        navigate('/calendar');
    }
    const handleToDoClick = () => {
        navigate('/todolist');
    } // test comment
    return (
        <div className='home-outer'>
            <div className='home-background'/>
            <div className='home-inner'>
            <Header />
            <div className="notifications-body">
            <div className="notifications-header">
                <p className="notifications-title">NOTIFICATIONS</p>
            </div>
            <div className="notifications-list">
                {/* alskjdlkasjdlkjasd */}
                <div className="notification-item">
                    <p className="notification-text"
                    style={{
                        color: "white",
                        textShadow: "2px 2px 4px #000000",
                    }}>Welcome to your new management tool!</p>
                    {/* <span className="notification-date">Feb 22, 2024</span> */}
                  
                </div>
                {events && events.map( event => (
                    
                        <div className='events-render'>
                            
                            <div className='event-left'>
                                <div>
                                    <img src={NotificationIcon } className='noti-image'/>
                                </div>
                                <div className='event-details'>
                                    <h1 className='event-name'>{event.class}</h1>
                                    <h1>{event.Assignment}</h1>
                                    <h1>{event.DueDate}</h1>
                                </div>
                            </div>
                            <div className='event-buttons'>
                                <button onClick={handleCalendarClick}>Calendar</button>
                                <button onClick={handleToDoClick}>To Do</button>
                            </div>
                        </div>
                    
                ))}
            </div>
        </div>
            <Footer />
            </div>
        </div>
    )
}