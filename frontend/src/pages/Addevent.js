import '../stylesheets/addeventstyles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Addevent() {
    return (
        <div className = "home-background">
            <Header />
            <div className='Addevent-mainbody'>
                <div className = 'Addevent-title'>
                    <p className = "Addevent-text">ADD EVENT</p>
                </div>
                <div className = "form-grid"> 
                    <div className = "form-inputbackground">
                        <div className = "Input-title">
                            CREATE EVENT
                        </div>
                        <div className = "event-details-grid">
                            <div className = "titleabove-input">
                                Class
                            </div>
                            <div className = "input-box">
                                <form>
                                <input type="text" className="actual-box" placeholder="Add your class here" />
                                </form>
                            </div>
                            <div className = "titleabove-input">
                                Assignment type
                            </div>
                            <div className = "input-box">
                                <form>
                                <input type="text" className="actual-box" placeholder="Whats your assignment?" />
                                </form>
                            </div>
                            <div className = "titleabove-input">
                                Due date
                            </div>
                            <div className = "input-box">
                                <form>
                                <input type="text" className="actual-box" placeholder="Whens your assignment due?" />
                                </form>
                            </div>
                            <div className = "titleabove-input">
                                Description
                            </div>
                            <div className = "input-box">
                                <form>
                                <input type="text" className="actual-box" placeholder="Add a description" />
                                </form>
                            </div>
                        </div>
                    <div className = "footer-Button">
                        <button class ="submit-button">
                            SUBMIT
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}