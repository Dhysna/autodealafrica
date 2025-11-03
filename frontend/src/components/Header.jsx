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
          <a href="#home">Home</a>
          <a href="#cars">Browse Cars</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
