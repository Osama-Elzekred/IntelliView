'use client';
import Layout from '../../../components/Layout';
import MockCard from '../../../components/MockCard';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Breadcrumb } from '../../../components/components';
function UserMocks() {
  const [searchState, setSearchState] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [mocksData, setMocksData] = useState([]);
  const dataMocks = [
    {
      id: 1,
      icon: 'aaa',
      title: 'Coach',
      category: 'Sports',
      description: ' ay hewar kpeer wekhlas ahla klam bye men gheer salam ',
      score: 4.5,
    },
    {
      id: 2,
      icon: 'aaa',
      title: 'Coach',
      category: 'Sports',
      description: ' ay hewar kpeer wekhlas ahla klam bye men gheer salam ',
      score: 4.5,
    },
    {
      id: 3,
      icon: 'aaa',
      title: 'FrontEnd Developer',
      category: 'techno',
      description: ' ay hewar kpeer wekhlas ahla klam bye men gheer salam ',
      score: 4.5,
    },
    {
      id: 4,
      icon: 'aaa',
      title: 'FrontEnd Developer',
      category: 'techno',
      description: ' ay hewar kpeer wekhlas ahla klam bye men gheer salam ',
      score: 4.5,
    },
    {
      id: 5,
      icon: 'aaa',
      title: 'Doctor ',
      category: 'Medicine',
      description: ' ay hewar kpeer wekhlas ahla klam bye men gheer salam ',
      score: 4.5,
    },
    {
      id: 6,
      icon: 'aaa',
      title: 'Coach',
      category: 'Sports',
      description: ' ay hewar kpeer wekhlas ahla klam bye men gheer salam ',
      score: 4.5,
    },
    {
      id: 7,
      icon: 'aaa',
      title: 'BackEnd Developer',
      category: 'Techno',
      description: ' ay hewar kpeer wekhlas ahla klam bye men gheer salam ',
      score: 4.5,
    },
    {
      id: 8,
      icon: 'aaa',
      title: 'BackEnd Developer',
      category: 'Techno',
      description: ' ay hewar kpeer wekhlas ahla klam bye men gheer salam ',
      score: 4.5,
    },
    {
      id: 9,
      icon: 'aaa',
      title: 'BackEnd Developer',
      category: 'Techno',
      description: ' ay hewar kpeer wekhlas ahla klam bye men gheer salam ',
      score: 4.5,
    },
    {
      id: 10,
      icon: 'aaa',
      title: 'BackEnd Developer',
      category: 'Techno',
      description: ' ay hewar kpeer wekhlas ahla klam bye men gheer salam ',
      score: 4.5,
    },
  ];
  useEffect(() => {
    const fetchMocksData = async () => {
      const authToken = Cookies.get('authToken');
      try {
        const response = await fetch('https://localhost:7049/api/Job/GetAll', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const mocks = await response.json();
          setMocksData(mocks);
        }
      } catch (error) {
        console.log('error : ', error);
      }
    };
    fetchMocksData();
  }, [mocksData]);

  const handleSearch = () => {
    setSearchState(true);

    if (!searchTerm) {
      // If search term is empty, reset search state and clear search results
      setSearchState(false);
      setSearchResult([]);
    } else {
      // If search term is not empty, filter the data based on the search term
      const filteredResults = dataMocks.filter(
        (item) =>
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResult(filteredResults);
    }
  };
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
          </div>{' '}
          {/* .site-mobile-menu */}
          {/* NAVBAR */}
          {/* HOME */}
          <section
            // className="section-hero home-section overlay inner-page bg-image"
            // style={{ backgroundImage: 'url("/images/hero_1.jpg")' }}
            id="home-section"
          >
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="mb-5 text-center">
                    <h3 className="font-bold text-black">Your Mocks</h3>
                  </div>

                  <form
                    className="search-jobs-form "
                    onSubmit={(e) => {
                      handleSearch();
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <Breadcrumb links={[{ name: 'My Mocks', url: '#' }]} />
                    <div className="d-flex align-items-center justify-content-center">
                      <input
                        type="text"
                        className="form-control mr-2"
                        style={{ width: '500px' }}
                        placeholder="Category-Title ...."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="btn-lg bg-[#17a9c3] hover:bg-[#2ebfd9] text-white btn-search flex justify-content-center align-items-center"
                      >
                        <span className="icon-search icon mr-2" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              className="scroll-button smoothscroll"
              style={{
                position: 'absolute',
                bottom: '-26px',
                left: '49.9%',
                transform: 'translateX(-50%)',
                cursor: 'pointer',
              }}
              onClick={() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: 'smooth',
                });
              }}
            >
              <span className="icon-keyboard_arrow_down" />
            </div>
          </section>
          <section>
            <div className=" m-2 mt-4 mb-4 p-2 grid grid-cols-4 gap-4">
              {searchState === true && searchResult.length != 0 ? (
                searchResult.map((mock) => (
                  <MockCard
                    icon={mock.icon}
                    title={mock.title}
                    category={mock.category}
                    description={mock.description}
                    overallScore={mock.score}
                    onClick={() => {
                      redirectToReview(mock.id);
                    }}
                  />
                ))
              ) : searchState === true && searchResult.length === 0 ? (
                <div className=" d-flex align-items-center justify-content-center">
                  <h4>No Mocks Found</h4>
                </div>
              ) : (
                dataMocks.map((mock) => (
                  <MockCard
                    icon={mock.icon}
                    title={mock.title}
                    category={mock.category}
                    description={mock.description}
                    overallScore={mock.score}
                    onClick={() => {
                      redirectToReview(mock.id);
                    }}
                  />
                ))
              )}
            </div>
          </section>
        </div>
        <div id="footer"></div>
      </>
    </Layout>
  );
}
export default UserMocks;
