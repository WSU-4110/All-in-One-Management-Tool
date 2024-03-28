import '../stylesheets/notificationpagestyles.css';
import '../stylesheets/backgroundstyles.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Noficications() {
    const events =  sessionStorage.getItem('events');
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
            </div>
        </div>
            <Footer />
            </div>
        </div>
    )
}