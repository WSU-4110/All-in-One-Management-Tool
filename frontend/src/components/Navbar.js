function Navbar(props){
    return(
        <div className="">
            <div className="ml-3">
                    <div className="mt-3 offset-md-1">
                        <h1 className="float-start px-2">{props.text}</h1>
                    </div>
            </div>
        </div>
    );
}

export default Navbar;