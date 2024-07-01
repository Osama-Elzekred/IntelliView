import React from 'react';

function IsInProgress({ condition, children }) {
  return !condition ? (
    children
  ) : (
    <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
      In Progress
    </span>
  );
}
const VideoTable = ({ Data, handleRowClick, IsAnalysing = false }) => {
  // console.log(IsAnalysing);
  return (
    <>
      {/* component */}

      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              {/* card header */}
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">
                    Mock Videos
                  </span>
                  <span className="mt-1 font-medium text-secondary-dark text-lg/normal">
                    All Videos from the mock session
                  </span>
                </h3>
                <div className="relative flex flex-wrap items-center my-2">
                  <a
                    href="#"
                    className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light"
                  >
                    {' '}
                    See other mocks{' '}
                  </a>
                </div>
              </div>
              {/* end card header */}
              {/* card body  */}
              <div className="flex-auto block py-8 pt-6 px-9">
                <link
                  rel="stylesheet"
                  href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css"
                />
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-start min-w-[175px]">Video</th>
                        <th className="pb-3 text-center min-w-[100px]">
                          Total Ai Score
                        </th>
                        <th className="pb-3 text-center min-w-[100px]">
                          Sentiment Score
                        </th>
                        <th className="pb-3 text-center min-w-[100px]">
                          Answer Similarity Score
                        </th>
                        <th className="pb-3  text-center min-w-[100px]">
                          Record Date
                        </th>
                        <th className="pb-3 text-end min-w-[50px]">DETAILS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Data?.map((video, index) => (
                        <tr
                          key={index}
                          className="border-b border-dashed last:border-b-0"
                          onClick={
                            !IsAnalysing
                              ? () => handleRowClick(video)
                              : undefined
                          }
                        >
                          <td className="p-3 pl-0 text-start">
                            <div className="flex items-center">
                              <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                <video
                                  src={video.videoUrl}
                                  className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                ></video>
                              </div>
                              <div className="flex flex-col justify-start">
                                <a
                                  href="#"
                                  className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"
                                >
                                  {' '}
                                  {video?.InterviewQuestion?.Question.substring(
                                    0,
                                    20
                                  )}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 pr-0 text-center">
                            <IsInProgress condition={IsAnalysing}>
                              <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                {video.aiObjects?.totalScore?.toFixed(2) ??
                                  'N/A'}{' '}
                              </span>
                            </IsInProgress>
                          </td>
                          {/* <td className="p-3 pr-12 text-center">
                            <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                              {' '}
                              In Progress{' '}
                            </span>
                          </td> */}
                          <td className="pr-0 text-center">
                            <IsInProgress condition={IsAnalysing}>
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {video.aiObjects?.sentimentScore?.toFixed(2) ??
                                  'N/A'}{' '}
                              </span>
                            </IsInProgress>
                          </td>
                          <td className="pr-0 text-center">
                            <IsInProgress condition={IsAnalysing}>
                              <span className="font-semibold text-light-inverse text-md/normal">
                                {video.aiObjects?.answerSimilarityScore?.toFixed(
                                  2
                                ) ?? 'N/A'}{' '}
                              </span>
                            </IsInProgress>
                          </td>
                          <td className="pr-0 text-center">
                            <span className="font-semibold text-light-inverse text-md/normal">
                              {video.date}
                            </span>
                          </td>
                          <td className="p-3 pr-0 text-end">
                            <button className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center">
                              <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                  />
                                </svg>
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VideoTable;
