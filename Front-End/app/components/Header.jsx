import Link from "next/link";

export default function Header() {
  return (
    <header className="site-navbar mt-3" id="top">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="site-logo col-6">
            <Link href="/job">intelliview</Link>
          </div>
          <nav className="mx-auto site-navigation">
            <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
              <li>
                <Link href="/job">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li className="has-children">
                <Link href="/job-listings">Job Listings</Link>
                <ul className="dropdown">
                  <li>
                    <Link href="/id">Job Single</Link>
                  </li>
                  <li>
                    <Link href="/post">Post a Job</Link>
                  </li>
                </ul>
              </li>
              <li className="has-children">
                <Link href="/service">Pages</Link>
                <ul className="dropdown">
                  <li>
                    <Link href="/service">Services</Link>
                  </li>
                  <li>
                    <Link href="/service-single">Service Single</Link>
                  </li>
                  <li>
                    <Link href="/blog-single">Blog Single</Link>
                  </li>
                  <li>
                    <Link href="/portfolio">Portfolio</Link>
                  </li>
                  <li>
                    <Link href="/portfolio-single">Portfolio Single</Link>
                  </li>
                  <li>
                    <Link href="/testimonials">Testimonials</Link>
                  </li>
                  <li>
                    <Link href="/faq">Frequently Ask Questions</Link>
                  </li>
                  <li>
                    <Link href="/gallery">Gallery</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li className="d-lg-none">
                <Link href="/post">
                  <span className="mr-2">+</span>
                </Link>
              </li>
              <li className="d-lg-none">
                <Link href="/login">Log In</Link>
              </li>
            </ul>
          </nav>
          <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
            <div className="ml-auto">
              <Link href="/post"
                className="btn btn-outline-white border-width-2 d-none d-lg-inline-block">
                  <span className="mr-2 icon-add" />
                Post a Job
              </Link>
              <Link href="/login"
                className="btn btn-primary border-width-2 d-none d-lg-inline-block">
                  <span className="mr-2 icon-lock_outline" />
                Log In
              </Link>
            </div>
            {/* <a
              href="#"
              className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"
            >
              <span className="icon-menu h3 m-0 p-0 mt-2" />
            </a> */}
            <Link href="" className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3">
              <span className="icon-menu h3 m-0 p-0 mt-2" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
