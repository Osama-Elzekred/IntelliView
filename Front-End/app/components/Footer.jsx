export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="smoothscroll scroll-top">
        <span className="icon-keyboard_arrow_up " style={{cursor : "pointer"}} onClick={() => {
               window.scrollTo({ top: 0, behavior: "smooth" });
              }}/>
      </div>
      <div className="container">
        <div className="row mb-5">
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Search Trending</h3>
            <ul className="list-unstyled">
              <li>
                <a href="#">Web Design</a>
              </li>
              <li>
                <a href="#">Graphic Design</a>
              </li>
              <li>
                <a href="#">Web Developers</a>
              </li>
              <li>
                <a href="#">Python</a>
              </li>
              <li>
                <a href="#">HTML5</a>
              </li>
              <li>
                <a href="#">CSS3</a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Company</h3>
            <ul className="list-unstyled">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Career</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Resources</a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Support</h3>
            <ul className="list-unstyled">
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3 mb-4 mb-md-0">
            <h3>Contact Us</h3>
            <div className="footer-social">
              <a href="#" className="mr-1">
                <span className="icon-facebook" />
              </a>
              <a href="#" className="mr-1">
                <span className="icon-twitter" />
              </a>
              <a href="#" className="mr-1">
                <span className="icon-instagram" />
              </a>
              <a href="#" className="mr-1">
                <span className="icon-linkedin" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
