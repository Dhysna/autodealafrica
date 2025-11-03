import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Autodealafrica</h3>
            <p>Votre plateforme de confiance pour acheter et vendre des voitures de qualité à travers l'Afrique</p>
          </div>

          <div className="footer-section">
            <h4>Liens Rapides</h4>
            <ul>
              <li><a href="#home">Accueil</a></li>
              <li><a href="#cars">Parcourir les Voitures</a></li>
              <li><a href="#about">À Propos</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@autodealafrica.com</p>
            <p>Téléphone: +234 123 456 7890</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Autodealafrica. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
