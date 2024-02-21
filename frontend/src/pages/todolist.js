import '../stylesheets/todolistpagestyles.css';


export default function Todolist() {
    return (
        <div className='todolist-grid'>
            <div className ="title-div">
                <p className = "title-text">
                    TO DO LIST
                </p>
            </div>
            <div className ="todolist-mainbody">
                <div className="todolist-background">
                    <div className="clipboard"></div>
                    <div className="clipboard-circle"></div>
                    <div className ="Shadow-effect">
                        <div className ="center-title">
                            <p className="todolist-title">
                            TO DO
                            </p>
                        </div>
                        <div className="List">
                            <ul>
                                <li>List event 1</li>
                                <li>List event 2</li>
                                <li>List event 3</li>
                                <li>List event 4</li>
                                <li>List event 5</li>
                                <li>List event 6</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}