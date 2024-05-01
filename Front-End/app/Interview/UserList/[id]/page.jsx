"use client";
import React, { useState,useEffect } from "react";
import Layout from "../../../components/Layout";
import FullScreenModal from "../../../components/FullScreenModal";
import Cookies from "js-cookie";
function MainComponent({params}) {
  const [userScores,setUsersScores] = useState(); 
  const [data, setData] = useState([
    {
      id: 1,
      videoUrl: "/images/vid1.mp4",
      title: "Walk me through your resume and your background.",
      date: "30 Apr 2021",
      aiRating: 4.7,
      duration: "00:38",
      level: "Level 3",
      notes: "learn more about soft skills",
      checked: false,
    },
    {
      id: 2,
      videoUrl: "/images/vid2.mp4",
      title: "What makes you qualified for this position?",
      date: "30 Mar 2021",
      aiRating: 3.6,
      duration: "00:15",
      level: "Level 3",
      notes: "your language need to improved",
      checked: false,
    },
  ]);

  const toggleCheck = (id) =>
    setData(
      data.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  // get avreage score
  const getAverage = () => {
    var sum = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].aiRating) {
        sum = data[i].aiRating + sum;
      }
    }
    let average = sum / data.length;
    return average;
  };
  const [selectedRow, setSelectedRow] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(false); // Add modalVisible state
  const [selectedRowData, setSelectedRowData] = useState(null);

  // Function to handle row click and display details screen
  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setDetailsVisible(true);
  };

  // Function to close the details screen
  const closeDetailsScreen = () => {
    setSelectedRowData(null);
    setDetailsVisible(false);
  };
  useEffect(() => {
    const fetchUserScores= async () => {
      const authToken = Cookies.get('authToken');
      try {
        const response = await fetch('https://localhost:7049/api/Job/GetAll', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const Scores = await response.json();
          setUsersScores(Scores);
        }
      } catch (error) {
        console.log('error : ', error);
      }
    };
    fetchUserScores();
  }, []);
  return (
    <Layout>
      <div className="font-roboto bg-white">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle" />
            </div>
          </div>
          <div className="site-mobile-menu-body" />
        </div>
        {/* .site-mobile-menu */}
        {/* NAVBAR */}
        {/* HOME */}
        <section
          className="section-hero overlay inner-page bg-image"
          style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
          id="home-section"
        ></section>
        <div className="bg-gray-200 flex items-center justify-center ">
          <div className="mx-auto space-y-2 py-2 p-4" style={{ width: "70%" }}>
            <div className="flex justify-center space-x-4 ">
              <div className="flex flex-row bg-white shadow-sm rounded p-4 ">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="bi bi-camera-fill w-10 h-10"
                    viewBox="0 0 16 16"
                    style={{ color: "inherit" }}
                  >
                    {" "}
                    <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />{" "}
                    <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />{" "}
                  </svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-500">videos</div>
                  <div className="font-bold text-lg">{data.length}</div>
                </div>
              </div>

              <div className=" flex justify-center ">
                <div className="flex flex-row bg-white shadow-sm rounded p-4">
                  <div className="flex items-center justify-center  h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-bar-chart h-10 w-10"
                      viewBox="0 0 16 16"
                      style={{ color: "inherit" }}
                    >
                      {" "}
                      <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />{" "}
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow ml-4">
                    <div className="text-sm text-gray-500">Average Score</div>
                    <div className="font-bold text-lg">{getAverage()}</div>
                  </div>
                </div>
              </div>
            </div>
            {detailsVisible && selectedRowData && (
              <FullScreenModal
                onClose={closeDetailsScreen}
                rowData={selectedRowData}
              />
            )}
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-[#121212]">
                <thead className="bg-[#17a9c3] text-[#fff]">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Video
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Recorded on
                    </th>
                    <th scope="col" className="px-6 py-3">
                      AI Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b bg-white cursor-pointer ${
                        selectedRow === row.id ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleRowClick(row)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="relative mr-4">
                            <div
                              id={`checked-${index}`}
                              onClick={(e) => {
                                e.stopPropagation(); // Stop event propagation
                                toggleCheck(row.id);
                              }}
                              className={`w-[20px] h-[20px] rounded-[6px] border-[1px] cursor-pointer ${
                                row.checked
                                  ? "border-[#17a9c3] bg-[#17a9c3]"
                                  : "border-[#d0d5dd] bg-transparent"
                              } flex items-center justify-center`}
                            >
                              {row.checked && (
                                <i className="fas fa-check text-[#fff]"></i>
                              )}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <video
                              src={row.videoUrl}
                              className="w-[75px] h-[52px] object-cover rounded border border-gray-300"
                              title={row.title}
                            ></video>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-[#121212]">
                              {row.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {row.duration}
                            </div>
                            <div className="text-xs text-gray-500">
                              {row.level}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {row.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800 py-1 px-2`}
                        >
                          {row.aiRating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <style jsx global>{`
              input[type="checkbox"]:checked + label {
                border-color: #17a9c3;
                background-color: #17a9c3;
              }
              input[type="checkbox"]:checked + label svg {
                display: block;
              }
              input[type="checkbox"]:not(:checked) + label {
                border-width: 1px;
                border-color: #d0d5dd;
              }
              input[type="checkbox"]:checked + label {
                border-width: 1px;
                border-color: #fff;
              }
              label {
                width: 20px;
                height: 20px;
                border-radius: 6px;
              }
              svg {
                color: #fff;
              }
            `}</style>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default MainComponent;
