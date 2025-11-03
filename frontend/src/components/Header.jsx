import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <span className="logo-icon">🚗</span>
          <span className="logo-text">Autodealafrica</span>
        </div>
        <nav className="nav">
          <a href="#home">Accueil</a>
          <a href="#cars">Parcourir</a>
          <a href="#about">À Propos</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
