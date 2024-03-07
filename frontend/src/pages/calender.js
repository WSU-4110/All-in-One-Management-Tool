import '../stylesheets/calenderpagestyles.css';
import '../stylesheets/backgroundstyles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function Calender() {
    return (
        <div className='home-background'>
            <Header />
            <div className ="mainbody-grid">
                    <div className="title-div">

                        <p className = "title-text">CALENDAR</p>

                    </div>
                    
                    <div className="Calendar-header"> 
                        <button class="Arrow-Left"> &larr; </button>
                        <p className="Month-Text">MARCH</p>
                        <button class="Arrow-Right"> &rarr; </button>
                    </div>
                    <div className="Calendar-main-body">
                        <div className = "M-SGrid">
                            <p className = "M-SText">S</p>
                            <p className = "M-SText">M</p>
                            <p className = "M-SText">T</p>
                            <p className = "M-SText">W</p>
                            <p className = "M-SText">T</p>
                            <p className = "M-SText">F</p>
                            <p className = "M-SText">S</p>
                        </div>
                        <div className = "Dates-grid"> 
                            <button className ="DateButton">1</button>
                            <button className ="DateButton">2</button>
                            <button className ="DateButton">3</button>
                            <button className ="DateButton">4</button>
                            <button className ="DateButton">5</button>
                            <button className ="DateButton">6</button>
                            <button className ="DateButton">7</button>
                            <button className ="DateButton">8</button>
                            <button className ="DateButton">9</button>
                            <button className ="DateButton">10</button>
                            <button className ="DateButton">11</button>
                            <button className ="DateButton">12</button>
                            <button className ="DateButton">13</button>
                            <button className ="DateButton">14</button>
                            <button className ="DateButton">15</button>
                            <button className ="DateButton">16</button>
                            <button className ="DateButton">17</button>
                            <button className ="DateButton">18</button>
                            <button className ="DateButton">19</button>
                            <button className ="DateButton">20</button>
                            <button className ="DateButton">21</button>
                            <button className ="DateButton">22</button>
                            <button className ="DateButton">23</button>
                            <button className ="DateButton">24</button>
                            <button className ="DateButton">25</button>
                            <button className ="DateButton">26</button>
                            <button className ="DateButton">27</button>
                            <button className ="DateButton">28</button>
                            <button className ="DateButton">29</button>
                        </div>
                    </div>
            </div>
            <Footer />
        </div>
    )
}