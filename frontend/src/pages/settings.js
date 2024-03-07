import '../stylesheets/settingspagestyles.css';
import '../stylesheets/backgroundstyles.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Settings() {
    const settingsOptions = [
        { id: 1, title: "Change Password" },
        { id: 2, title: "Notification Preferences" },
        { id: 3, title: "Theme Settings" },
        { id: 4, title: "Language Preferences" }
    ];

    return (
        <div className='home-background'>
            <Header />
            <h1 className="settings-title">Settings</h1> {}
            <div className='settings-container'>
                <div className="settings-options">
                    {settingsOptions.map(option => (
                        <button key={option.id} className="settings-button">{option.title}</button>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
