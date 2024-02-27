// import React from 'react'
import Link from 'next/link';
import Layout from '../components/Layout'
import Script from 'next/script';
export default function Service(){
  return (
    <Layout>
    <>
      <div id="overlayer" />
      <div className="loader">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <div className="site-wrap">
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle" />
            </div>
          </div>
          <div className="site-mobile-menu-body" />
        </div>{' '}
        {/* .site-mobile-menu */}
        {/* NAVBAR */}
        {/* HOME */}
        <section
          className="section-hero overlay inner-page bg-image"
          style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
          id="home-section"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">Services</h1>
                <div className="custom-breadcrumbs">
                  <a href="#">Home</a> <span className="mx-2 slash">/</span>
                  <span className="text-white">
                    <strong>Services</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="site-section services-section bg-light block__62849"
          id="next-section"
        >
          <div className="container">
            <div className="row">
              <div className="col-6 col-md-6 col-lg-4 mb-4 mb-lg-5">
                <Link href="/service-single"
                  className="block__16443 text-center d-block">
                  <span className="custom-icon mx-auto">
                    <span className="icon-magnet d-block" />
                  </span>
                  <h3>Graphic Design</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit facilis, pariatur harum labore aperiam assumenda.
                  </p>
                </Link>
              </div>
              <div className="col-6 col-md-6 col-lg-4 mb-4 mb-lg-5">

                <Link href="/service-single"
                  className="block__16443 text-center d-block">
                  <span className="custom-icon mx-auto">
                    <span className="icon-trophy d-block" />
                  </span>
                  <h3>Marketing Strategy</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit facilis, pariatur harum labore aperiam assumenda.
                  </p>
                </Link>

              </div>
              <div className="col-6 col-md-6 col-lg-4 mb-4 mb-lg-5">

                <Link href="/service-single"
                  className="block__16443 text-center d-block">
                 <span className="custom-icon mx-auto">
                    <span className="icon-laptop d-block" />
                  </span>
                  <h3>Web Design</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit facilis, pariatur harum labore aperiam assumenda.
                  </p>
                </Link>

              </div>
              <div className="col-6 col-md-6 col-lg-4 mb-4 mb-lg-5">

                <Link href="/service-single"
                  className="block__16443 text-center d-block">
                 <span className="custom-icon mx-auto">
                    <span className="icon-search d-block" />
                  </span>
                  <h3>SEO</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit facilis, pariatur harum labore aperiam assumenda.
                  </p>
                </Link>

              </div>
              <div className="col-6 col-md-6 col-lg-4 mb-4 mb-lg-5">

                <Link href="/service-single"
                  className="block__16443 text-center d-block">
                <span className="custom-icon mx-auto">
                    <span className="icon-paper-plane d-block" />
                  </span>
                  <h3>Market Leading </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit facilis, pariatur harum labore aperiam assumenda.
                  </p>
                </Link>
              </div>
              <div className="col-6 col-md-6 col-lg-4 mb-4 mb-lg-5">

                <Link href="/service-single"
                  className="block__16443 text-center d-block">
                <span className="custom-icon mx-auto">
                    <span className="icon-plug d-block" />
                  </span>
                  <h3>Pixel Perfect Design</h3>
                  <p className="d-sm-block">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit facilis, pariatur harum labore aperiam assumenda.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
    </Layout>
  );
}
