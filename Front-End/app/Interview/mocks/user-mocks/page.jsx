'use client';
import Layout from '../../../components/Layout';
import MockCard from '../../../components/MockCard';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Breadcrumb, Loading } from '../../../components/components';
function UserMocks() {
  const [searchState, setSearchState] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [mocksData, setMocksData] = useState();
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMocksData = async () => {
      const authToken = Cookies.get('authToken');
      try {
        const response = await fetch(
          'https://localhost:7049/api/mockSession/userAppliedMocks',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.ok) {
          const mocks = await response.json();
          setMocksData(mocks);
          setLoading(false);
        }
      } catch (error) {
        setMocksData(response);
        console.log('error : ', error);
      }
    };
    fetchMocksData();
  }, []);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredMocks = mocksData?.filter(
    (mock) =>
      mock.mock.title &&
      mock.mock.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSearch = () => {
    setSearchState(true);

    if (!searchTerm) {
      // If search term is empty, reset search state and clear search results
      setSearchState(false);
      setSearchResult([]);
    } else {
      // If search term is not empty, filter the data based on the search term
      const filteredResults = mocksData.filter(
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

  if (loading) {
    return <Loading />; // Display loading indicator while data is being fetched
  }
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
                        value={filter}
                        onChange={handleFilterChange}
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
              {filteredMocks?.map((mock, index) => (
                <MockCard
                  key={index}
                  icon={mock.mock.icon}
                  title={mock.mock.title}
                  category={mock.mock.category}
                  description={mock.mock.description}
                  overallScore={mock.totalScore}
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
