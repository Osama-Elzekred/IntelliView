'use client';
import React from 'react';
import Link from 'next/link';
import { Layout, Breadcrumb, Loading } from '../../../components/components';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Toast } from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';

export default function MainComponent({ params }) {
  const DOMAIN_NAME = '//localhost:7049/api';
  const [userApprove, setUserApprove] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersData, setUserData] = useState([]); // this is the usedata will come from server
  const [loading, setLoading] = useState(true);
  const [approved, setApproved] = useState(false);
  // const [numberOfApplications, setNumberOfApplications] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const updateUserApprove = [...userApprove];
  const [usersPreview, setUsersPreview] = useState([]);

  const usersPerPage = 5;
  useEffect(() => {
    const fetchUsers = async () => {
      const authToken = Cookies.get('authToken');
      try {
        const response = await fetch(
          `https://${DOMAIN_NAME}/Interview/mock/${params.id}/users`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.ok) {
          const users = await response.json();
          setUserData(users);
          setLoading(false);
        }
      } catch (error) {
        console.log('error : ', error);
      }
    };
    fetchUsers();
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = Math.min(startIndex + usersPerPage, usersData.length);
    const sortedusersData = [...usersData].sort((a, b) => b.score - a.score); // Sort usersData based on score
    setUsersPreview(sortedusersData.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(usersData.length / usersPerPage));
  }, [currentPage, usersData, usersPerPage]); // This effect runs when currentPage, usersData, or usersPerPage changes
  const handleApprove = async (userId) => {
    const updatedApprove = [...userApprove];
    const index = usersData.findIndex((user) => user.id === userId);
    console.log('user: ', userId);
    updatedApprove[index] = true;
    setUserApprove(updatedApprove);
    setApproved(true);
    setTimeout(() => {
      setApproved(false);
    }, 5000);
    try {
      const authToken = Cookies.get('authToken');
      const response = await fetch(
        `https://${DOMAIN_NAME}/JobApplication/approveInterview/job/${params.id}/user/${userId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to approve job interview.');
      }
      // Handle success response
    } catch (error) {
      console.error('Error approving job interview:', error);
    }
  };
  // if (loading) {
  //   return <Loading />; // Display loading indicator while data is being fetched
  // }

  const changePage = (page) => {
    setCurrentPage(page);
    // setTimeout(() => {
    //   document
    //     .getElementById("user-listings")
    //     .scrollIntoView({ behavior: "smooth" });
    // }, 200);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // setTimeout(() => {
      //   document
      //     .getElementById("user-listings")
      //     .scrollIntoView({ behavior: "smooth" });
      // }, 200);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // setTimeout(() => {
      //   document
      //     .getElementById("user-listings")
      //     .scrollIntoView({ behavior: "smooth" });
      // }, 200);
    }
  };
  console.log('users : ', usersPreview.length);
  console.log('total pages : ', totalPages);
  if (loading) {
    return <Loading />;
  }
  return (
    <Layout approved={approved}>
      <>
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
          <Breadcrumb
            links={[
              { name: 'Job', link: '#' },
              { name: 'Mock Applicants', link: '#' },
            ]}
          />
          <div className="" id="user-listings">
            <div className="w-full h-full flex justify-center items-center p-8 m-2">
              <table className="w-full table-auto">
                <thead className=" font-bold text-black">
                  <tr>
                    <th className="px-4 py-2">Profile</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Contact</th>
                    <th className="px-4 py-2"> Overall Score</th>
                    <th className="px-4 py-2"> Action</th>
                  </tr>
                </thead>
                <tbody>
                  {usersPreview.map((user, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <Link href={`/Interview/UserList/${user.userId}`}>
                            <img
                              src={user.imageURL}
                              alt={`user of ${user.name}`}
                              className="h-12 w-12 rounded-full"
                            />
                          </Link>
                        </div>
                      </td>
                      <td
                        className="px-4 py-2"
                        onClick={() =>
                          (window.location.href = `/mockReview/${user.userMockSessionId}`)
                        }
                      >
                        <Link href={`/Interview/mockApplicants/${user.userId}`}>
                          {user.name}
                        </Link>
                      </td>
                      <td className="px-4 py-2">
                        <span className="flex items-center">{user.email}</span>
                      </td>
                      <td className="px-4 py-2">{user.phoneNumber}</td>
                      <td className="px-4 py-2 ">
                        <span
                          className={` font-bold  ${
                            user.score > 3 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {user.score}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {!user.isApproved ? (
                          <button
                            className="bg-[#17a9c3] text-white p-1 rounded hover:bg-[#20c997]"
                            onClick={() => {
                              handleApprove(user.userId);
                            }}
                          >
                            {' '}
                            Approve{' '}
                          </button>
                        ) : (
                          <span className="bg-green-500 text-white rounded p-1">
                            Approved
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="relative p-2">
            <div className="pagination-wrap absolute bottom-4 right-20">
              <div className="custom-pagination">
                {currentPage != 1 && (
                  <Link href="" className="prev" onClick={prevPage}>
                    Prev
                  </Link>
                )}
                {[...Array(totalPages).keys()].map((page) => (
                  <Link
                    key={page + 1}
                    href=""
                    className={page + 1 === currentPage ? 'active' : ''}
                    onClick={() => changePage(page + 1)}
                  >
                    {page + 1}
                  </Link>
                ))}
                {currentPage < totalPages && (
                  <Link href="" className="next" onClick={nextPage}>
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
          {approved ? (
            <div className="fixed bottom-4 right-4 flex items-center justify-end">
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                  User approved successfully.
                </div>
                <Toast.Toggle onDismiss={() => setApproved(false)} />
              </Toast>
            </div>
          ) : (
            ''
          )}
        </div>
      </>
    </Layout>
  );
}
