'use client';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserNavitems, CompanyNavitems } from '../../constants';
import { HiCog, HiViewGrid } from 'react-icons/hi';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from 'react-icons/hi';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Sidebar,
  Avatar,
  Dropdown,
} from 'flowbite-react';

export default function Header() {
  const [authToken, setAuthToken] = useState('');
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [slidebarOpen, setSlidebarOpen] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
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
    localStorage.removeItem('roleFromServer');
    window.location.href = '/login';
  };

  useEffect(() => {
    // Check if window object is defined (running in
    console.log('profilePhotoUrl', profilePhotoUrl);
    if (typeof window !== 'undefined') {
      // Retrieve the profile photo URL from local storage
      const storedProfilePhotoUrl = localStorage.getItem('profilePhotoUrl');

      // Update state with the retrieved profile photo URL
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

  return (
    <Navbar className="flex w-full mx-0  flex-wrap items-center justify-between p-4 md:space-x-8">
      <div className="flex justify-start">
        <NavbarBrand href="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center px-1 whitespace-nowrap text-black text-xl font-semibold dark:text-white">
            Intelliview
          </span>
        </NavbarBrand>
      </div>
      {role == null && (
        <div className="order-2 hidden items-center lg:flex justify-start">
          <a
            href="/login"
            className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:mr-2 md:px-5 md:py-2.5"
          >
            Login
          </a>
          <Button
            className="bg-primary hover:bg-[#4bb6c9] text-white btn-search flex justify-content-center align-items-center"
            href="/login"
          >
            Sign up
          </Button>
        </div>
      )}

      {role != null && (
        <div className="flex md:order-2 flex-row-reverse">
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
        <NavbarLink href={'/Home'}>Home</NavbarLink>
        <NavbarLink href="/service">Service</NavbarLink>
        {/* <NavbarLink> */}
        <Dropdown
          label="Jobs"
          inline
          dismissOnClick={true}
          className="text-bold"
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
          label="Mocks"
          inline
          dismissOnClick={true}
          className="text-bold"
        >
          <Dropdown.Item href="/Interview/mocks" icon={HiViewGrid}>
            Mocks
          </Dropdown.Item>
          {role === 'user' && (
            <Dropdown.Item href="/Interview/mocks/user-mocks" icon={HiUser}>
              My Mocks
            </Dropdown.Item>
          )}
          <Dropdown.Item href="/Interview/mocks/Edit-mocks" icon={HiCog}>
            Add mocks
          </Dropdown.Item>
        </Dropdown>
        {/* <Dropdown.Divider />
          <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item> */}
        {/* </NavbarLink> */}
        {/* <NavbarLink href="#">Features</NavbarLink> */}
        <NavbarLink href="/contact">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
