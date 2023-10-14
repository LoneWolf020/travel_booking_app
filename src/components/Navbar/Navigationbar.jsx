import "./Navigationbar.css";

export const Navigationbar = () => {
    return (
        
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid heading">
                <a className="navbar-brand" href={"/"}>ChaeinG</a>

                <div className="form-container cursor-pointer nav">
                    <span className="form-option">Anywhere</span>
                    <span className="border-right-1px"></span>
                    <span className="form-option">Any week</span>
                    <span className="border-right-1px"></span>
                    <span className="form-option">Add guest</span>
                    <i className="fa-solid fa-magnifying-glass search"></i>
                </div>


                <div className="navbar-nav nav cursor-pointer">
                    
                    <i className="fa-solid fa-bars profile-option menu"></i>
                    <i className="fa-regular fa-user profile-option person"> </i>

                </div>

            </div>
        </nav>


    )
}