'use client';
import React from 'react';
import Layout from '../../components/Layout';

function MainComponent() {
  const [questionSets, setQuestionSets] = React.useState([
    {
      icon: 'fa-star',
      title: 'My Sets',
      description: 'Your personal list of picked out question sets.',
      bgColor: 'bg-[#f87171]',
    },
    {
      icon: 'fa-lightbulb',
      title: 'Featured Sets',
      description:
        'Sets specifically recommended for you by your organization.',
      bgColor: 'bg-[#60a5fa]',
    },
    {
      icon: 'fa-briefcase',
      title: 'Custom Sets',
      description: 'Sets put together by your organization.',
      bgColor: 'bg-[#fbbf24]',
    },
    {
      icon: 'fa-play-circle',
      title: 'General',
      description: 'Covers 80% of the interview questions you might get.',
      bgColor: 'bg-[#34d399]',
    },
    {
      icon: 'fa-industry',
      title: 'By Industry',
      description:
        'Start practicing interviews in hundreds of industries and job titles.',
      bgColor: 'bg-[#a78bfa]',
    },
  ]);

  const [occupations, setOccupations] = React.useState([
    { icon: 'fa-calculator', title: 'Accounting & Financial Operations' },
    { icon: 'fa-palette', title: 'Art & Design' },
    { icon: 'fa-dna', title: 'Biotech' },
    { icon: 'fa-headset', title: 'Customer Service & Success' },
    { icon: 'fa-tshirt', title: 'Fashion Industry' },
    { icon: 'fa-user-tie', title: 'Administrative Assistant' },
    { icon: 'fa-bullhorn', title: 'Advertising Industry' },
    { icon: 'fa-plane', title: 'Aviation & Aerospace Industry' },
    { icon: 'fa-hard-hat', title: 'Banking (Retail)' },
    { icon: 'fa-tools', title: 'Construction Trades' },
    { icon: 'fa-comments', title: 'Communications' },
    { icon: 'fa-fire', title: 'Energy Sector' },
    { icon: 'fa-gears', title: 'Engineering' },
    { icon: 'fa-landmark', title: 'Financial Services Industry' },
    { icon: 'fa-stethoscope', title: 'Healthcare' },
  ]);

  const [selectedSet, setSelectedSet] = React.useState(null);
  const [selectedOccupation, setSelectedOccupation] = React.useState(null);
  const [filter, setFilter] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('entry');

  const handleSetClick = (title) => setSelectedSet(title);
  const handleOccupationClick = (title) => setSelectedOccupation(title);
  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleDifficultyChange = (e) => setDifficulty(e.target.value);

  const filteredOccupations = occupations.filter((occupation) =>
    occupation.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Layout>
      <>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
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
        >
          <div className="container">
            <div className="row"></div>
          </div>
        </section>
        <div className="flex flex-col lg:flex-row gap-4 ">
          <div
            className="lg:w-1/4 bg-white rounded-lg shadow p-4 overflow-auto"
            style={{ maxHeight: '75vh' }}
          >
            <h2 className="text-lg font-semibold text-[#121212] mb-4">
              Question Sets
            </h2>
            <ul>
              {questionSets.map((set) => (
                <li
                  key={set.title}
                  className={`flex items-center mb-4 cursor-pointer ${
                    selectedSet === set.title
                      ? 'ring-2 ring-offset-2 ring-[#6366F1] bg-gray-100 rounded'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleSetClick(set.title)}
                >
                  <span
                    className={`text-2xl rounded-full p-3 mr-3 text-white ${set.bgColor}`}
                  >
                    <i className={`fas ${set.icon}`}></i>
                  </span>
                  <div>
                    <h3 className="font-medium text-[#121212]">{set.title}</h3>
                    <p className="text-sm text-gray-500">{set.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-3/4 bg-white rounded-lg shadow p-4">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <h2 className="flex-1 text-lg font-semibold text-[#121212]">
                Most Popular Occupations
              </h2>
              <div className="flex-1 max-w-md">
                <div className="flex items-center bg-gray-100 rounded overflow-hidden">
                  <i className="fas fa-search text-gray-400 p-2"></i>
                  <input
                    className="bg-transparent p-2 outline-none w-full"
                    placeholder="Search"
                    type="search"
                    name="search"
                    value={filter}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <div className="flex-1">
                <select
                  name="difficulty"
                  className="bg-gray-100 p-2 rounded outline-none cursor-pointer w-full"
                  value={difficulty}
                  onChange={handleDifficultyChange}
                >
                  <option value="entry">Entry Level</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredOccupations.map((occupation) => (
                <div
                  key={occupation.title}
                  className={`flex flex-col items-center text-center p-4 bg-gray-50 rounded shadow cursor-pointer ${
                    selectedOccupation === occupation.title
                      ? 'ring-2 ring-offset-2 ring-[#6366F1]'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleOccupationClick(occupation.title)}
                >
                  <i
                    className={`fas ${occupation.icon} text-3xl mb-3 text-gray-700`}
                  ></i>
                  <p className="font-semibold text-sm text-[#121212]">
                    {occupation.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default MainComponent;
