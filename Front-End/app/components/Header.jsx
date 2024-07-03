'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { UserNavitems, CompanyNavitems } from '../../constants';
import { HiCog, HiViewGrid } from 'react-icons/hi';
import { HiUser } from 'react-icons/hi';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Avatar,
  Dropdown,
} from 'flowbite-react';

const Header = () => {
  const [authToken, setAuthToken] = useState('');
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [slidebarOpen, setSlidebarOpen] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    const userName = Cookies.get('userName');
    const role = Cookies.get('role');

    setAuthToken(authToken);
    setUserName(userName);
    setRole(role);
    setIsLoading(false);
  }, []);

  const signOut = async () => {
    Cookies.remove('authToken');
    Cookies.remove('user_id');
    Cookies.remove('role');
    Cookies.remove('userName');
    localStorage.removeItem('profilePhotoUrl');
    localStorage.removeItem('cvName');
    localStorage.removeItem('roleFromServer');
    window.location.href = '/login';
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProfilePhotoUrl = localStorage.getItem('profilePhotoUrl');
      setProfilePhotoUrl(storedProfilePhotoUrl || '');
      if (storedProfilePhotoUrl === null) {
        localStorage.setItem(
          'profilePhotoUrl',
          'https://res.cloudinary.com/djvcgnkbn/image/upload/v1714246729/qcicrkq2tjflesksdsat.jpg'
        );
      } else {
        localStorage.setItem('profilePhotoUrl', storedProfilePhotoUrl);
      }
    }
  }, []); // Empty dependency array ensures this effect runs only once after component mounts

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <Navbar
      rounded
      className="flex w-full mx-0 flex-row flex-wrap items-center justify-between p-4 md:space-x-8"
    >
      {/* Adjusted the container of the NavbarBrand to use flex and items-center to align it vertically */}
      <NavbarBrand href="/" className="flex">
        <img
          src="/images/intelliview.png"
          className="h-8"
          alt="Flowbite Logo"
          sizes="(max-width: 640px) 100px, 200px"
        />
        {/* Uncommented and adjusted the span for additional brand text, ensuring it aligns properly */}
        {/* <span className="self-center px-1 whitespace-nowrap text-black text-xl font-semibold dark:text-white">
        Intelliview
      </span> */}
      </NavbarBrand>
      <div className="flex"></div>
      {role != null && (
        <div className="flex md:order-2">
          {' '}
          {/* Added items-center to align dropdown vertically */}
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={
                  profilePhotoUrl
                    ? profilePhotoUrl
                    : 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                }
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-xl">{userName}</span>
            </Dropdown.Header>

            <Dropdown.Item
              href={` ${
                role === 'company' || role === 'Company'
                  ? '/profile/Edit-company-profile'
                  : '/profile/Edit-user-profile'
              }`}
            >
              Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      )}
      <NavbarToggle />

      <NavbarCollapse>
        {role == null && (
          <div className="order-2 items-center flex flex-col sm:flex-row justify-start space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-4">
            <a
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 transition-colors duration-200 w-full sm:w-auto text-center"
            >
              Login
            </a>
            <a
              href="/login"
              className="bg-primary hover:bg-[#17a9c3] text-white rounded-lg px-3 py-2 text-sm font-medium flex justify-center items-center transition-colors duration-200 w-full sm:w-auto text-center"
            >
              Sign up
            </a>
          </div>
        )}
        <NavbarLink href={'/Home'}>Home</NavbarLink>
        <NavbarLink href="/service">Service</NavbarLink>
        <NavbarLink href="/contact">Contact</NavbarLink>
        <Dropdown
            label={<span style={{ fontFamily: 'Roboto, sans-serif' }}>Jobs</span>}
            inline
            dismissOnClick={true}
>
          <Dropdown.Item href="/job/" icon={HiViewGrid}>
            Jobs
          </Dropdown.Item>
          <Dropdown.Divider />
          {role === 'company' &&
            CompanyNavitems?.map((item, index) => (
              <Dropdown.Item key={index} href={item.href} icon={HiViewGrid}>
                {item.title}
              </Dropdown.Item>
            ))}
          {role === 'user' &&
            UserNavitems?.map((item, index) => (
              <Dropdown.Item href={item.href} key={index} icon={HiViewGrid}>
                {item.title}
              </Dropdown.Item>
            ))}
        </Dropdown>
        <Dropdown
            label={<span style={{ fontFamily: 'Roboto, sans-serif' }}>Mocks</span>}
            inline
            dismissOnClick={true}
          >
          <Dropdown.Item href="/Interview/mocks" icon={HiViewGrid}>
            Mocks
          </Dropdown.Item>
          {role === 'user' && (
            <Dropdown.Item href="/Interview/mocks/user-mocks" icon={HiUser}>
              My Mocks
            </Dropdown.Item>
          )}{role === 'admin' && (
          <Dropdown.Item href="/Interview/mocks/Edit-mocks" icon={HiCog}>
            Add mocks
          </Dropdown.Item>)}
        </Dropdown>
      </NavbarCollapse>
    </Navbar>
  );
};

export default React.memo(Header);
