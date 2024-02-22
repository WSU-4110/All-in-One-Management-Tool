import '../stylesheets/calenderpagestyles.css';
import '../stylesheets/backgroundstyles.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
    // Sample profile information
    const userProfile = {
        username: "example_user",
        email: "example@example.com",
        university: "Example University",
        major: "Computer Science",
        age: 30,
        location: "Example City"
    };

    return (
        <div className='home-background'>
            <Header />
            <div className='profile-container'>
                <h1>Profile Page</h1>
                <div>
                    <h2>Username: {userProfile.username}</h2>
                    <p>Email: {userProfile.email}</p>
                    <p>University: {userProfile.university}</p>
                    <p>Major: {userProfile.major}</p>
                    <p>Age: {userProfile.age}</p>
                    <p>Location: {userProfile.location}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
