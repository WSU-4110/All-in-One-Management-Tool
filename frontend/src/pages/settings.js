import '../stylesheets/settingspagestyles.css';
import Footer from '../components/Footer';
import Header from '../components/header';

export default function Settings() {
    // Sample settings options
    const settingsOptions = [
        { id: 1, title: "Change Password" },
        { id: 2, title: "Notification Preferences" },
        { id: 3, title: "Theme Settings" },
        { id: 4, title: "Language Preferences" }
    ];

    return (
        <div className='home-background'>
            <Header />
            <div className='settings-container'>
                <h1>Settings</h1>
                <ul>
                    {settingsOptions.map(option => (
                        <li key={option.id}>{option.title}</li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
}
