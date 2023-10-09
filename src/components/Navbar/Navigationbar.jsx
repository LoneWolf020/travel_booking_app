import "./Navigationbar.css";

export const Navigationbar = () => {
    return (
        <header className="heading d-flex align-center">
            <h1 className="heading-1">

                ChaleinG

            </h1>
            <nav className="d-flex align-center gap-large">
                <div className="nav d-flex align-center cursor-pointer">
                    <i class="fa-solid fa-bars profile-option menu"></i>
                    <i class="fa-regular fa-user profile-option person"> </i>
                </div>
            </nav>
        </header>
    )
}