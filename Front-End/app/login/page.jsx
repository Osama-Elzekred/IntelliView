'use client';
import Image from 'next/image';
import Head from 'next/head';
import React from 'react';
import Script from 'next/script';
import Layout from '../components/Layout';
import Link from 'next/link';

// import  '../public/scss/styles.scss';
// import '../public/scss/style.scss';
export default function login() {
  return (
    <>
      <link rel="stylesheet" href="/css/Login_form_p.css" />

      <Layout>
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
            style={{
              backgroundImage:
                'url("/images/ai-background-business-technology-digital-transformation.jpg")',
            }}
            id="home-section"
          >
            <div className="container ">
              <div className="row">
                <div className="col-md-7">
                  <h1 className="text-white font-weight-bold">Sign Up/Login</h1>
                  <div className="custom-breadcrumbs">
                    <Link href="#">Home</Link> <span className="mx-2 slash">/</span>
                    <span className="text-white">
                      <strong>Log In</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="form bg-white">
            <div className="container_">
              <div className="box" id="face">
                <div className="sign-up- upin">
                  <p className="sign-up">sign up</p>
                  <div className="base-p-c  ">
                    <form className="c-p" id="role">
                      <input
                        type="button"
                        className="person active"
                        id="person"
                        defaultValue="User"
                        onClick={() => toggleButton('person')}
                      />
                      <input
                        type="button"
                        className="company"
                        id="company"
                        defaultValue="Company"
                        onClick={() => toggleButton('company')}
                      />
                    </form>
                  </div>
                  <form id="signup">
                    <div className="sign-up_">
                      <div className="input-container">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="currentColor"
                          className="bi bi-person-circle icon "
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          <path
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                          />
                        </svg>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          onInput={(event) => checkInput(event.target)}
                          placeholder="user name"
                        />
                      </div>
                      <br />
                      <div className="input-container">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="currentColor"
                          className="bi bi-envelope icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                        </svg>
                        <input
                          type="email"
                          id="E-mail"
                          name="email"
                          onInput={(event) => checkInput(event.target)}
                          placeholder="E-mail"
                        />
                      </div>
                      <br />
                      <div className="input-container">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="currentColor"
                          className="bi bi-file-lock2 icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1m2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224" />
                          <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                        </svg>
                        <input
                          type="password"
                          id="password-"
                          name="password"
                          onInput={(event) => checkInput(event.target)}
                          placeholder="password"
                        />
                        <div
                          className="eye-fill-"
                          onClick={() => togglePassword()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-eye-slash-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                          </svg>
                        </div>
                      </div>
                      <br />
                      <div className="input-container">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="currentColor"
                          className="bi bi-file-lock2 icon"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1m2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224" />
                          <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                        </svg>
                        <input
                          type="password"
                          id="confirm"
                          name="password-confirm"
                          onInput={(event) => checkInput(event.target)}
                          placeholder="confirm password"
                        />
                      </div>
                      <br />
                    </div>
                    <div id="messageOfEmptyUp" />
                    <div id="messageOfNotMatch" />
                    <div id="messageFromServer" />
                    <input
                      type="submit"
                      // defaultValue="sign up"
                      value="sign up"
                      className="button1 button-h"
                    />
                  </form>
                  <p className="already">
                    {' '}
                    already have an account?{' '}
                    <button
                      onClick={() => flipped_face()}
                      className="sign-in button-h"
                    >
                      log in
                    </button>
                  </p>
                </div>
                <div className="sign-in- upin">
                  <p className="word">log in</p>
                  <form className="form2" id="login">
                    <div className="input-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        fill="currentColor"
                        className="bi bi-person-circle icon"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                        />
                      </svg>
                      <input
                        type="text"
                        id="username_"
                        name="username"
                        onInput={(event) => checkInput(event.target)}
                        placeholder="user name"
                      />
                    </div>
                    <br />
                    <div className="input-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        fill="currentColor"
                        className="bi bi-file-lock2 icon"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1m2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224" />
                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                      </svg>
                      <input
                        type="password"
                        id="passwordField"
                        name="password"
                        onInput={(event) => checkInput(event.target)}
                        placeholder="password"
                      />
                      <div
                        className="eye-slash"
                        onClick={() => togglePassword_()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="bi bi-eye-slash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                        </svg>
                      </div>
                    </div>
                    <br />
                    <br />
                    <input type="checkbox" id="remember" className="checkbox" />
                    <label htmlFor="remember" className="remember">
                      remember me
                    </label>
                    <br />
                    <div id="messageOfWrong" />
                    <input
                      type="submit"
                      // defaultValue="log in"
                      value="log in"
                      className="button2 button-h"
                    />
                  </form>
                  <Link href="/forget-password/forget" className="forget-password">
                    forget password
                  </Link>
                  <p className="create">
                    Don't have an account?{' '}
                    <button
                      onClick={() => flipped_face()}
                      className="sign-in button-h"
                    >
                      sign up
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Script src="/js/forms_api_code.js"></Script>
    </>
  );
}
