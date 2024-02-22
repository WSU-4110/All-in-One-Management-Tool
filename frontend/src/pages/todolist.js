import '../stylesheets/todolistpagestyles.css';
import '../stylesheets/backgroundstyles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Todolist() {
    return (
        <div className='home-background'>
            <Header />
            <Footer />
        </div>
    )
}