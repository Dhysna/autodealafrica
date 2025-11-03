import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Autodealafrica</h3>
            <p>Your trusted platform for buying and selling quality cars across Africa</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#cars">Browse Cars</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@autodealafrica.com</p>
            <p>Phone: +234 123 456 7890</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Autodealafrica. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
