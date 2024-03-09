'use client';
import Image from 'next/image';
import Head from 'next/head';
import React from 'react';
import Script from 'next/script';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useState } from 'react';

// import  '../public/scss/styles.scss';
// import '../public/scss/style.scss';
export default function login() {
  const DOMAIN_NAME = 'localhost:7049';
  const [isFlipped, setIsFlipped] = useState(true);
  const [loginForm, setLogin] = useState({
    Email: '',
    Password: '',
  });
  const [messageOfWrong, setMessageOfWrong] = useState('');
  const [activeButton, setActiveButton] = useState('User');

  const handleChange = (e) => {
    setLogin({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessageOfWrong('');

    const { Email: username, Password: password } = loginForm;

    if (typeof username !== 'string' || typeof password !== 'string') {
      setMessageOfWrong('Username and password must be strings.');
      return;
    }
    if (username === '' || password === '') {
      setMessageOfWrong('Please Enter E-mail and Password');
    } else {
      try {
        const response = await fetch(`https://${DOMAIN_NAME}/api/Auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            email: username,
            password: password,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });

        const data = await response.json();

        if (data.token) {
          document.cookie = `authToken=${data.token};path=/`;
          document.cookie = `user_id=${data.id};path=/`;
          localStorage.setItem('roleFromServer', data.roles);
          document.cookie = `role=${data.roles[0].toLowerCase()};path=/`;
          document.cookie = `userName=${data.username};path=/`;
          window.location.href = `/Home`;
        } else if (data.message) {
          setMessageOfWrong(data.message);
        }
      } catch (error) {
        setMessageOfWrong(
          'Sorry ... The Server can not be reach now ... please try later'
        );
      }
    }
  };

  /// Sign up form
  const [signupForm, setSignup] = useState({
    Email: '',
    Username: '',
    Password: '',
    PasswordConfirm: '',
    Role: 'User',
  });
  const [messageFromServer, setMessageFromServer] = useState('');

  const handleSignUpChange = (e) => {
    setSignup({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };
  const toggleButton = (role) => {
    setSignup({
      ...signupForm,
      Role: role,
    });
    setActiveButton(role);
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setMessageFromServer('');

    const {
      Email: email,
      Username: username,
      Password: password,
      PasswordConfirm: password_confirm,
      Role: role,
    } = signupForm;

    if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      typeof password_confirm !== 'string'
    ) {
      setMessageFromServer('Username and password must be strings.');
      return;
    }
    if (
      username === '' ||
      password === '' ||
      password_confirm === '' ||
      email === ''
    ) {
      setMessageFromServer('Please Fill All Fields');
    } else if (password !== password_confirm) {
      setMessageFromServer("Password doesn't match");
    } else {
      try {
        const response = await fetch(
          `https://${DOMAIN_NAME}/api/Auth/register`,
          {
            method: 'POST',
            body: JSON.stringify({
              email,
              username,
              password,
              role,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }
        );

        const data = await response.json();

        if (data.token) {
          document.cookie = `authToken=${data.token};path=/`;
          document.cookie = `user_id=${data.id};path=/`;
          localStorage.setItem('roleFromServer', data.roles);
          document.cookie = `role=${data.roles[0].toLowerCase()};path=/`;
          document.cookie = `userName=${data.username};path=/`;
          setSignup({
            Email: '',
            Username: '',
            Password: '',
            PasswordConfirm: '',
            Role: 'User',
          });
          window.location.href = `/Home`;
        } else if (data.message) {
          setMessageFromServer(data.message);
        } else {
          setMessageFromServer('An error occurred');
        }
      } catch (error) {
        setMessageFromServer('Connection Error ... Please Try Later');
      }
    }
  };

  return (
    <>
      <link rel="stylesheet" href="/css/Login_form_p.css" />

      <Layout>
        {/* <div id="overlayer" /> */}

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
                    <Link href="#">Home</Link>{' '}
                    <span className="mx-2 slash">/</span>
                    <span className="text-white">
                      <strong>Log In</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className=" bg-white">
            <div className="container">
              <div class="font-[sans-serif] text-[#333]">
                <div class="min-h-screen flex flex-col items-center justify-center">
                  <div class="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                    {isFlipped ? (
                      <form className="form2" onSubmit={handleSubmit}>
                        <div className="w-full  p-6">
                          <h1 className="text-4xl font-bold mb-6">Sign in</h1>
                          <p className="mt-2">
                            Don't have an account?{' '}
                            <a
                              href="#"
                              className="text-blue-600"
                              onClick={() => {
                                setIsFlipped(!isFlipped);
                                window.scrollTo({
                                  top: 500,
                                  behavior: 'smooth',
                                });
                              }}
                            >
                              Register here
                            </a>
                          </p>
                          <div className="space-y-4 mt-6">
                            <div className="w-full">
                              <label
                                htmlFor="email"
                                className="block text-gray-600"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                name="Email"
                                value={loginForm.Email}
                                onChange={handleChange}
                                placeholder="Name@Company.Com"
                                className="w-full px-4 py-3 border rounded-lg text-sm"
                              />
                            </div>
                            <div className="w-full">
                              <label
                                htmlFor="password"
                                className="block text-gray-600"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                name="Password"
                                value={loginForm.Password}
                                onChange={handleChange}
                                placeholder="••••••••••"
                                className="w-full px-4 py-3 border rounded-lg text-sm"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="flex items-center text-sm">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                  name="remember"
                                />
                                <span className="ml-2">Remember me</span>
                              </label>
                              <Link
                                href="/forget-password/forget"
                                className="text-sm text-blue-600"
                              >
                                Forgot Password?
                              </Link>
                            </div>
                          </div>
                          <button
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
                            type="submit"
                          >
                            Sign in
                          </button>
                          {messageOfWrong && (
                            <div
                              id="alert-2"
                              class="flex items-center mt-3 p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                              role="alert"
                            >
                              <svg
                                class="flex-shrink-0 w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                              </svg>
                              <span class="sr-only">Info</span>
                              <div class="ms-3 text-sm font-medium">
                                {messageOfWrong}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-6">
                            <span className="w-1/5 border-b"></span>
                            <p className="text-xs text-center text-gray-500 uppercase">
                              or continue with
                            </p>
                            <span className="w-1/5 border-b"></span>
                          </div>

                          <div className="space-x-8 flex justify-center mt-6 mb-3">
                            <button
                              type="button"
                              class="border-none outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30px"
                                class="inline"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="#fbbd00"
                                  d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                                  data-original="#fbbd00"
                                />
                                <path
                                  fill="#0f9d58"
                                  d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                                  data-original="#0f9d58"
                                />
                                <path
                                  fill="#31aa52"
                                  d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                                  data-original="#31aa52"
                                />
                                <path
                                  fill="#3c79e6"
                                  d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                                  data-original="#3c79e6"
                                />
                                <path
                                  fill="#cf2d48"
                                  d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                                  data-original="#cf2d48"
                                />
                                <path
                                  fill="#eb4132"
                                  d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                                  data-original="#eb4132"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              class="border-none outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30px"
                                fill="#000"
                                viewBox="0 0 22.773 22.773"
                              >
                                <path
                                  d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                                  data-original="#000000"
                                ></path>
                              </svg>
                            </button>
                            <button
                              type="button"
                              class="border-none outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30px"
                                fill="#007bff"
                                viewBox="0 0 167.657 167.657"
                              >
                                <path
                                  d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                                  data-original="#010002"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <form
                        className="flex justify-center items-center"
                        onSubmit={handleSignUpSubmit}
                      >
                        <div className="w-full  p-6">
                          <h1 className="text-4xl font-bold mb-6">Sign Up</h1>

                          <div className="space-y-4 mt-6">
                            <div className="base-p-c  ">
                              <div className="c-p" id="role">
                                <input
                                  type="button"
                                  className={`person w-[100%]  ${
                                    activeButton === 'User' ? 'active' : ''
                                  }`}
                                  id="person"
                                  defaultValue="User"
                                  onClick={() => toggleButton('User')}
                                />
                                <input
                                  type="button"
                                  className={`company w-[100%] ${
                                    activeButton === 'Company' ? 'active' : ''
                                  }`}
                                  id="company"
                                  defaultValue="Company"
                                  onClick={() => toggleButton('Company')}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="w-full">
                            <label
                              htmlFor="email"
                              className="block text-gray-600"
                            >
                              Username
                            </label>
                            <input
                              type="text"
                              name="Username"
                              value={signupForm.Username}
                              onChange={handleSignUpChange}
                              placeholder="Type your username here..."
                              className="w-full px-4 py-3 border rounded-lg text-sm"
                            />
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="email"
                              className="block text-gray-600"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              name="Email"
                              value={signupForm.Email}
                              onChange={handleSignUpChange}
                              placeholder="Name@Company.Com"
                              className="w-full px-4 py-3 border rounded-lg text-sm"
                            />
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="password"
                              className="block text-gray-600"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              name="Password"
                              value={signupForm.Password}
                              onChange={handleSignUpChange}
                              placeholder="••••••••••"
                              className="w-full px-4 py-3 border rounded-lg text-sm"
                            />
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor="Confirm password"
                              className="block text-gray-600"
                            >
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              name="PasswordConfirm"
                              value={signupForm.PasswordConfirm}
                              onChange={handleSignUpChange}
                              placeholder="••••••••••"
                              className="w-full px-4 py-3 border rounded-lg text-sm"
                            />
                          </div>

                          <p
                            id="filled_error_help"
                            class="mt-2 text-xs text-red-600 dark:text-red-400"
                          >
                            <span class="font-medium"></span>{' '}
                            <div id="messageOfEmptyUp" />
                            <div id="messageOfNotMatch" />
                            <div id="messageFromServer" />
                          </p>

                          <button
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
                            type="submit"
                            // defaultValue="sign up"
                            value="sign up"
                          >
                            Sign Up
                          </button>
                          {messageFromServer && (
                            <div
                              id="alert-2"
                              class="flex items-center mt-3 p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                              role="alert"
                            >
                              <svg
                                class="flex-shrink-0 w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                              </svg>
                              <span class="sr-only">Info</span>
                              <div class="ms-3 text-sm font-medium">
                                {messageFromServer}
                              </div>
                            </div>
                          )}

                          <p className="mt-3 mr-1 flex justify-end items-end">
                            <a
                              href="#"
                              className="text-blue-600"
                              onClick={() => {
                                setIsFlipped(!isFlipped);
                                window.scrollTo({
                                  top: 500,
                                  behavior: 'smooth',
                                });
                              }}
                            >
                              Login in
                            </a>
                          </p>
                          <div className="flex items-center justify-between mt-6">
                            <span className="w-1/5 border-b"></span>
                            <p className="text-xs text-center text-gray-500 uppercase">
                              or continue with
                            </p>
                            <span className="w-1/5 border-b"></span>
                          </div>

                          <div className="space-x-8 flex justify-center mt-6">
                            <button
                              type="button"
                              class="border-none outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30px"
                                class="inline"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="#fbbd00"
                                  d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                                  data-original="#fbbd00"
                                />
                                <path
                                  fill="#0f9d58"
                                  d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                                  data-original="#0f9d58"
                                />
                                <path
                                  fill="#31aa52"
                                  d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                                  data-original="#31aa52"
                                />
                                <path
                                  fill="#3c79e6"
                                  d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                                  data-original="#3c79e6"
                                />
                                <path
                                  fill="#cf2d48"
                                  d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                                  data-original="#cf2d48"
                                />
                                <path
                                  fill="#eb4132"
                                  d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                                  data-original="#eb4132"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              class="border-none outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30px"
                                fill="#000"
                                viewBox="0 0 22.773 22.773"
                              >
                                <path
                                  d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                                  data-original="#000000"
                                ></path>
                              </svg>
                            </button>
                            <button
                              type="button"
                              class="border-none outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30px"
                                fill="#007bff"
                                viewBox="0 0 167.657 167.657"
                              >
                                <path
                                  d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                                  data-original="#010002"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                    <div class="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8">
                      <img
                        src="https://readymadeui.com/signin-image.webp"
                        class="w-full h-full object-contain"
                        alt="login-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {/* <Script src="/js/forms_api_code.js"></Script> */}
    </>
  );
}
