import React from 'react'

const Footer = () => {
    return (
        <footer>
      <div className="footer-container">
        <div className="row">
          <div className="colmn">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">home</a></li>
              <li><a href="#">branches</a></li>
            </ul>
          </div>
          <div className="colmn">
            <h4>About</h4>
            <ul>
              <li><a href="#">about us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Condition</a></li>
            </ul>
          </div>
          <div className="colmn">
            <h4>Help</h4>
            <ul>
              <li><a href="#">help</a></li>
              <li><a href="#">contact us</a></li>
            </ul>
          </div>
          <div className="colmn">
            <h4>Products</h4>
            <ul>
              <li><a href="#">hostel management</a></li>
              <li><a href="#">library management </a></li>
              <li><a href="#">school management </a></li>
            </ul>
          </div>
          <div className="colmn">
            <h4>connect</h4>
            <div className="social">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    )
}

export default Footer
