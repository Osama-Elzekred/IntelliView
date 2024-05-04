"use client";
import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "../../components/loading";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
function MainComponent({params}) {
  const DOMAIN_NAME = '//localhost:7049/api';
  const [userApprove, setUserApprove] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // const usersData = [
  //   {
  //     id: 1,
  //     name: "Ahmed",
  //     email: "ahemd@mm.com",
  //     status: "active",
  //     location: "Cairo",
  //     contact: "+912457874589",
  //     image: "/images/ava.jpg",
  //     score: "4.3",
  //     approve: userApprove[0],
  //   },
  //   {
  //     id: 2,
  //     name: "Mohamed",
  //     email: "mohamed@mm.com",
  //     status: "Alexandria",
  //     location: "Bangalore",
  //     contact: "+912457874589",
  //     image: "/images/ava.jpg",
  //     score: "2.9",
  //     approve: userApprove[1],
  //   },
  //   {
  //     id: 3,
  //     name: "Ali",
  //     email: "ali@mm.com",
  //     status: "active",
  //     location: "Mansoura",
  //     contact: "+912457874589",
  //     image: "/images/ava.jpg",
  //     score: "4.3",
  //     approve: userApprove[2],
  //   },
  //   {
  //     id: 4,
  //     name: "Ahmed",
  //     email: "ahemd@mm.com",
  //     status: "active",
  //     location: "Cairo",
  //     contact: "+912457874589",
  //     image: "/images/ava.jpg",
  //     score: "4.3",
  //     approve: userApprove[3],
  //   },
  //   {
  //     id: 5,
  //     name: "Mohamed",
  //     email: "mohamed@mm.com",
  //     status: "Alexandria",
  //     location: "Bangalore",
  //     contact: "+912457874589",
  //     image: "/images/ava.jpg",
  //     score: "2.9",
  //     approve: userApprove[4],
  //   },
  //   {
  //     id: 6,
  //     name: "Ali",
  //     email: "ali@mm.com",
  //     status: "active",
  //     location: "Mansoura",
  //     contact: "+912457874589",
  //     image: "/images/ava.jpg",
  //     score: "4.3",
  //     approve: userApprove[5],
  //   },
  //   {
  //     id: 7,
  //     name: "Ahmed",
  //     email: "ahemd@mm.com",
  //     status: "active",
  //     location: "Cairo",
  //     contact: "+912457874589",
  //     image: "/images/ava.jpg",
  //     score: "4.3",
  //     approve: userApprove[6],
  //   },
  //   {
  //     id: 8,
  //     name: "Mohamed",
  //     email: "mohamed@mm.com",
  //     status: "Alexandria",
  //     location: "Bangalore",
  //     contact: "+912457874589",
  //     image: "/images/ava.jpg",
  //     score: "2.9",
  //     approve: userApprove[7],
  //   },
  //   {
  //     id: 9,
  //     name: "Ali",
  //     email: "ali@mm.com",
  //     status: "active",
  //     location: "Mansoura",
  //     contact: "+912457874589",
  //     image: "/images/ava.jpg",
  //     score: "4.3",
  //     approve: userApprove[8],
  //   },
  // ];
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
      const authToken = Cookies.get("authToken");
      try {
        const response = await fetch(`https://${DOMAIN_NAME}/Interview/mock/${params.mockId}/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const users = await response.json();
          setUserData(users);
        }
        //console.log("dsfdssfsd");
        // setLoading(false);
      } catch (error) {
        console.log("error : ", error);
      }
    };
    fetchUsers();

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = Math.min(startIndex + usersPerPage, usersData.length);
    const sortedusersData = [...usersData].sort((a, b) => b.score - a.score); // Sort usersData based on score
    setUsersPreview(sortedusersData.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(usersData.length / usersPerPage));
  }, [currentPage, usersData, usersPerPage]);

  const handleApprove = async (userId) => {
    const updatedApprove = [...userApprove];
    const index = usersData.findIndex((user) => user.id === userId);
    updatedApprove[index] = true;
    setUserApprove(updatedApprove);
    setApproved(true);
    setTimeout(() => {
      setApproved(false);
    }, 5000);
    try {
      const authToken = Cookies.get("authToken");
      const response = await fetch(
        `https://${DOMAIN_NAME}/JobApplication/approve/job/user/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve job interview.");
      }
      setLoading(false);
      // Handle success response
    } catch (error) {
      console.error("Error approving job interview:", error);
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
  console.log("users : ", usersPreview.length);
  console.log("total pages : ", totalPages);
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
          </div>{" "}
          {/* .site-mobile-menu */}
          {/* NAVBAR */}
          {/* HOME */}
          <section
            className="section-hero home-section overlay inner-page bg-image"
            style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
            id="home-section"
          >
            <div className="mt-5">
              <Link href="#next" className="scroll-button smoothscroll">
                <span className=" icon-keyboard_arrow_down" />
              </Link>
            </div>
          </section>
          <div className="p-4 m-4" id="user-listings">
            <div className="w-full h-full flex justify-center items-center bg-[#f8f9fa] p-8">
              <table className="w-full table-auto">
                <thead className=" font-bold text-black">
                  <tr>
                    <th className="px-4 py-2">Profile</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Location</th>
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
                      <Link href={`/Interview/UserList/${user.id}`}>
                          <img
                            src={user.image}
                            alt={`user of ${user.name}`}
                            className="h-12 w-12 rounded-full"
                            />
                            </Link>
                        </div>
                      </td>
                      <td className="px-4 py-2" onClick={()=> window.location.href = `/Interview/UserList/${user.id}`}>
                        <Link href={`/Interview/UserList/${user.id}`}>
                          {user.name}
                        </Link>
                      </td>
                      <td className="px-4 py-2">
                        <span className="flex items-center">{user.email}</span>
                      </td>
                      <td className="px-4 py-2">{user.location}</td>
                      <td className="px-4 py-2">{user.contact}</td>
                      <td className="px-4 py-2 ">
                        <span
                          className={` font-bold  ${
                            user.score > 3 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {user.score}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {!user.approve ? (
                          <button
                            className="bg-[#17a9c3] text-white p-1 rounded hover:bg-[#20c997]"
                            onClick={() => {
                              handleApprove(user.id);
                            }}
                          >
                            {" "}
                            Approve{" "}
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
                    className={page + 1 === currentPage ? "active" : ""}
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
              ""
            )}
        </div>
      </>
    </Layout>
  );
}

export default MainComponent;
