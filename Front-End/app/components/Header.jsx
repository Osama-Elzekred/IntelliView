import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-navbar mt-3" id="top">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="site-logo col-6">
            <Link href="/job" replace>
              intelliview
            </Link>
          </div>
          <nav className="mx-auto site-navigation">
            <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
              <li>
                <Link href="/job" replace>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" replace>
                  About
                </Link>
              </li>
              <li className="has-children">
                <Link href="/job" replace>
                  Jobs
                </Link>
                <ul className="dropdown">
                  <li>
                    <Link href="job/id" replace>
                      Job Single
                    </Link>
                  </li>
                  <li>
                    <Link href="job/post" replace>
                      Post a Job
                    </Link>
                  </li>
                  <li>
                    <Link href="/job/job-company" replace>
                      Job of Company
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="has-children">
                <Link href="/service" replace>
                  Pages
                </Link>
                <ul className="dropdown">
                  <li>
                    <Link href="/service" replace>
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/service-single" replace>
                      Service Single
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-single" replace>
                      Blog Single
                    </Link>
                  </li>
                  <li>
                    <Link href="/portfolio" replace>
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link href="/portfolio-single" replace>
                      Portfolio Single
                    </Link>
                  </li>
                  <li>
                    <Link href="/testimonials" replace>
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" replace>
                      Frequently Ask Questions
                    </Link>
                  </li>
                  <li>
                    <Link href="/gallery" replace>
                      Gallery
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/blog" replace>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" replace>
                  Contact
                </Link>
              </li>
              <li className="d-lg-none">
                <Link href="/post">
                  <span className="mr-2">+</span>
                </Link>
              </li>
              <li className="d-lg-none">
                <Link href="/login" replace>
                  Log In
                </Link>
              </li>
            </ul>
          </nav>
          <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
            <div className="ml-auto">
              <Link
                href="job/post"
                className="btn btn-outline-white border-width-2 d-none d-lg-inline-block"
                replace
              >
                <span className="mr-2 icon-add" />
                Post a Job
              </Link>
              <Link
                href="/login"
                className="btn btn-primary border-width-2 d-none ml-2 d-lg-inline-block"
                replace
              >
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
            <Link
              href=""
              className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"
            >
              <span className="icon-menu h3 m-0 p-0 mt-2" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
