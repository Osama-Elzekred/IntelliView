"use client";
import { redirect } from "next/dist/server/api-utils";
import Layout from "../../../components/Layout";
import MockCard from "../../../components/MockCard";
import Link from "next/link";
function UserMocks() {
  const dataMocks = [
    {
      id: 1,
      icon: "aaa",
      title: "BackEnd Developer",
      topic: "Techno",
      description: " ay hewar kpeer wekhlas ahla klam bye men gheer salam ",
      score: 4.5,
    },
    {
      id: 2,
      icon: "aaa",
      title: "BackEnd Developer",
      topic: "Techno",
      description: " ay hewar kpeer wekhlas ahla klam bye men gheer salam ",
      score: 4.5,
    },
    {
      id: 3,
      icon: "aaa",
      title: "BackEnd Developer",
      topic: "Techno",
      description: " ay hewar kpeer wekhlas ahla klam bye men gheer salam ",
      score: 4.5,
    },
    {
      id: 4,
      icon: "aaa",
      title: "BackEnd Developer",
      topic: "Techno",
      description: " ay hewar kpeer wekhlas ahla klam bye men gheer salam ",
      score: 4.5,
    },
    {
      id: 5,
      icon: "aaa",
      title: "BackEnd Developer",
      topic: "Techno",
      description: " ay hewar kpeer wekhlas ahla klam bye men gheer salam ",
      score: 4.5,
    },
    {
      id: 6,
      icon: "aaa",
      title: "BackEnd Developer",
      topic: "Techno",
      description: " ay hewar kpeer wekhlas ahla klam bye men gheer salam ",
      score: 4.5,
    },
    {
      id: 7,
      icon: "aaa",
      title: "BackEnd Developer",
      topic: "Techno",
      description: " ay hewar kpeer wekhlas ahla klam bye men gheer salam ",
      score: 4.5,
    },
    {
      id: 8,
      icon: "aaa",
      title: "BackEnd Developer",
      topic: "Techno",
      description: " ay hewar kpeer wekhlas ahla klam bye men gheer salam ",
      score: 4.5,
    },
    {
      id: 9,
      icon: "aaa",
      title: "BackEnd Developer",
      topic: "Techno",
      description: " ay hewar kpeer wekhlas ahla klam bye men gheer salam ",
      score: 4.5,
    },
    {
      id: 10,
      icon: "aaa",
      title: "BackEnd Developer",
      topic: "Techno",
      description: " ay hewar kpeer wekhlas ahla klam bye men gheer salam ",
      score: 4.5,
    },
  ];
  const redirectToReview = (userId) => {
    window.location.href = `/Interview/UserList/${userId}`;
  };
  return (
    <Layout>
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
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="mb-5 text-center">
                    <h3 className="font-bold text-white">Your Mocks</h3>
                  </div>
                </div>
              </div>
            </div>
            <Link href="#next" className="scroll-button smoothscroll">
              <span className=" icon-keyboard_arrow_down" />
            </Link>
          </section>
          <section>
            <div className=" m-2 p-2 grid grid-cols-4 gap-4">
              {dataMocks.map((mock) => (
                <MockCard
                  icon={mock.icon}
                  title={mock.title}
                  topic={mock.topic}
                  description={mock.description}
                  overallScore={mock.score}
                  onClick={() => {
                    redirectToReview(mock.id);
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </>
    </Layout>
  );
}
export default UserMocks;
