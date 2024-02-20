function Navbar(props){
    return(
        <div className="Navbar">
            <div className="ml-3">
                    <div className="mt-3 offset-md-1">
                        <h1 className="float-start px-20">{props.text}</h1>
                    </div>
            </div>
        </div>
    );
}

export default Navbar;