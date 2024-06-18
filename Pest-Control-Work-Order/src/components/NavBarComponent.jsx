import "./NavBarComponent.css";

const NavBarComponent = () => {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h2>LOGO</h2>
        </div>
        <ul className="navbar-items">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBarComponent;
