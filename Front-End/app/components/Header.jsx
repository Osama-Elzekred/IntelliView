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
import { Sidebar } from 'flowbite-react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from 'react-icons/hi';

export default function Header() {
  // const role = Cookies.get('role');
  // const userName = Cookies.get('userName');
  // const authToken = Cookies.get('authToken');
  const [authToken, setAuthToken] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [slidebarOpen, setSlidebarOpen] = useState(false);
  useEffect(() => {
    setAuthToken(Cookies.get('authToken'));
    setUserName(Cookies.get('userName'));
    setRole(Cookies.get('role'));
  }, []);

  const signOut = async () => {
    Cookies.remove('authToken');
    Cookies.remove('user_id');
    Cookies.remove('role');
    Cookies.remove('userName');
    localStorage.removeItem('profilePhotoUrl');
    localStorage.removeItem('cvName');

    window.location.href = '/login';
  };
  const Slidebar = () => {
    return (
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className="absolute top-15 right-0 mx-4 my-2 min-w-[200px] h-auto rounded-xl"
      >
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />

        <Sidebar.Items>
          <button
            aria-label="Close"
            className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-gray-100 text-cyan-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
            type="button"
            onClick={() => setSlidebarOpen(!slidebarOpen)}
          >
            <svg
              aria-hidden
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <Sidebar.ItemGroup className="p-0 m-2">
            <Link href={'/Home'}>
              <Sidebar.Item icon={HiChartPie}>Home</Sidebar.Item>
            </Link>
            <Link href="/about">
              <Sidebar.Item icon={HiChartPie}>About</Sidebar.Item>
            </Link>
            <Sidebar.Collapse icon={HiShoppingBag} label="Jobs">
              <Link href="/job/post">
                <Sidebar.Item>Post a Job</Sidebar.Item>
              </Link>
              <Link href="/job/job-company">
                <Sidebar.Item>Job of Company</Sidebar.Item>
              </Link>
            </Sidebar.Collapse>
            <Sidebar.Collapse icon={HiShoppingBag} label="Interview">
              <Link href="/Interview/mocks">
                <Sidebar.Item>Mocks</Sidebar.Item>
              </Link>
            </Sidebar.Collapse>
            <Link href="/service">
              <Sidebar.Item icon={HiInbox}>Service</Sidebar.Item>
            </Link>
            {/* <Link href="/blog">
              <Sidebar.Item icon={HiInbox}>Blog</Sidebar.Item>
            </Link>
            <Link href="/contact">
              <Sidebar.Item icon={HiUser}>Contact</Sidebar.Item>
            </Link> */}
            <Link href="/login">
              <Sidebar.Item icon={HiArrowSmRight}>Sign In</Sidebar.Item>
            </Link>
            <Link href="/login">
              <Sidebar.Item icon={HiTable}>Sign Up</Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    );
  };
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

  useEffect(() => {
    // Check if window object is defined (running in the browser)
    if (typeof window !== 'undefined') {
      // Retrieve the profile photo URL from local storage
      const storedProfilePhotoUrl = localStorage.getItem('profilePhotoUrl');

      // Update state with the retrieved profile photo URL
      setProfilePhotoUrl(storedProfilePhotoUrl || '');
      
      localStorage.setItem('profilePhotoUrl', storedProfilePhotoUrl);
      
    }
  }, []); // Empty dependency array ensures this effect runs only once after component mounts


  return (
    <header className="site-navbar mt-3" id="top">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="site-logo col-6">
            <Link href="/Home" replace>
              intelliview
            </Link>
          </div>
          <nav className="mx-auto site-navigation">
            <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
              <li>
                <Link href="/Home" replace>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/service" replace>
                  Service
                </Link>
              </li>
              <li className="has-children">
                <Link href="/job" replace>
                  Jobs
                </Link>
                <ul className="dropdown">
                  <li>
                    <Link href="/job/post" replace>
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
                <Link href="/Interview" replace>
                  Interview
                </Link>
                <ul className="dropdown">
                  <li>
                    <Link href="/Interview/mocks" replace>
                      Mocks
                    </Link>
                  </li>
                  <li>
                    <Link href="/Interview/review" replace>
                      Review
                    </Link>
                  </li>
                  <li>
                    <Link href="/Interview/mocks/Edit-mocks" replace>
                      Edit Mocks
                    </Link>
                  </li>
                </ul>
              </li>
              {/* <li>
                <Link href="/blog" replace>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" replace>
                  Contact
                </Link>
              </li> */}
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
              {authToken ? (
                <div className="mr-3 d-flex align-items-center">
                  <span className="block text-xl mr-3 text-light ">
                    {userName}
                  </span>
                  <Dropdown
                    label={
                      <Avatar
                        alt="User settings"
                        img={profilePhotoUrl}
                        rounded
                      />
                    }
                    arrowIcon={false}
                    inline
                  >
                    <DropdownHeader>
                      <span className="block text-xl">{userName}</span>
                    </DropdownHeader>
                    <Link
                      href={
                        role === 'company' || role === 'Company'
                          ? '/profile/Edit-company-profile'
                          : '/profile/Edit-user-profile'
                      }
                    >
                      <DropdownItem>Settings</DropdownItem>
                    </Link>
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
              className="site-menu-toggle  d-inline-block d-xl-none mt-lg-2 flex items-center justify-between xl:hidden mt-2 ml-3"
            >
              <span
                className="icon-menu h3 m-0 p-0 mt-2"
                onClick={() => setSlidebarOpen(!slidebarOpen)}
              />
              {slidebarOpen && <Slidebar />}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
