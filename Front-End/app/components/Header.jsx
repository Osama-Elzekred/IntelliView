'use client';
import Cookies from 'js-cookie';
import Link from 'next/link';
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function Header() {
  // const role = Cookies.get('role');
  // const userName = Cookies.get('userName');
  // const authToken = Cookies.get('authToken');

  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    // const authToken = Cookies.get('authToken');
    setUserName(Cookies.get('userName'));
    setRole(Cookies.get('role'));
  }, []);

  const signOut = async () => {
    Cookies.remove('authToken');
    Cookies.remove('user_id');
    Cookies.remove('role');

    window.location.href = '/login';
  };

  return (
    <header className="site-navbar mt-3" id="top">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="site-logo col-6">
            <Link href="/" replace>
              intelliview
            </Link>
          </div>
          <nav className="mx-auto site-navigation">
            <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
              <li>
                <Link href="/" replace>
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
                  Interview
                </Link>
                <ul className="dropdown">
                  <li>
                    <Link href="/Interview/mocks" replace>
                      Mocks
                    </Link>
                  </li>
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
            <div className="ml-auto d-flex align-items-center">
              {role != 'user' && (
                <Link
                  href="job/post"
                  className="btn btn-outline-white border-width-2 d-none d-lg-inline-block mr-3"
                  replace
                >
                  <span className="mr-2 icon-add" />
                  Post a Job
                </Link>
              )}
              {/* Conditional rendering based on authToken */}
              {userName ? (
                <div className="mr-3 d-flex align-items-center">
                  <span className="block text-xl mr-3 text-light ">
                    {userName}
                  </span>
                  <Dropdown
                    label={
                      <Avatar
                        alt="User settings"
                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        rounded
                      />
                    }
                    arrowIcon={false}
                    inline
                  >
                    <DropdownHeader>
                      <span className="block text-xl">{userName}</span>
                    </DropdownHeader>
                    <DropdownItem>Dashboard</DropdownItem>
                    <Link
                      href={
                        role === 'company' || role === 'Company'
                          ? '/profile/Edit-company-profile'
                          : '/profile/Edit-user-profile'
                      }
                    >
                      <DropdownItem>Settings</DropdownItem>
                    </Link>
                    <DropdownItem>Earnings</DropdownItem>
                    <DropdownDivider />
                    <Link href="" onClick={signOut}>
                      <DropdownItem>Sign out</DropdownItem>
                    </Link>
                  </Dropdown>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="btn btn-primary border-width-2 d-none ml-2 d-lg-inline-block"
                  replace
                >
                  <span className="mr-2 icon-lock_outline" />
                  Log In
                </Link>
              )}
            </div>
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
