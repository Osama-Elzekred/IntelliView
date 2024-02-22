  // Fetch job listings from the backend (replace this with your actual backend API endpoint)
  fetch('https://example.com/api/jobListings')
    .then(response => response.json())
    .then(data => {
      const jobListingsContainer = document.getElementById('jobListings');

      // Loop through the job listings data and create HTML elements for each listing
      data.forEach(job => {
        const listItem = document.createElement('li');
        listItem.className = 'job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center';

        const link = document.createElement('a');
        link.href = 'job-single.html';

        const logoDiv = document.createElement('div');
        logoDiv.className = 'job-listing-logo';

        const logoImg = document.createElement('img');
        logoImg.src = job.logoUrl; // Replace 'logoUrl' with the actual property name in your job object
        logoImg.alt = 'Job Logo';
        logoImg.className = 'img-fluid';

        logoDiv.appendChild(logoImg);
        link.appendChild(logoDiv);
        listItem.appendChild(link);

        const aboutDiv = document.createElement('div');
        aboutDiv.className = 'job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4';

        const positionDiv = document.createElement('div');
        positionDiv.className = 'job-listing-position custom-width w-50 mb-3 mb-sm-0';

        const positionTitle = document.createElement('h2');
        positionTitle.textContent = job.position; // Replace 'position' with the actual property name in your job object

        const company = document.createElement('strong');
        company.textContent = job.company; // Replace 'company' with the actual property name in your job object

        positionDiv.appendChild(positionTitle);
        positionDiv.appendChild(company);
        aboutDiv.appendChild(positionDiv);

        const locationDiv = document.createElement('div');
        locationDiv.className = 'job-listing-location mb-3 mb-sm-0 custom-width w-25';
        locationDiv.innerHTML = `<span class="icon-room"></span> ${job.location}`; // Replace 'location' with the actual property name in your job object

        const metaDiv = document.createElement('div');
        metaDiv.className = 'job-listing-meta';
        const badge = document.createElement('span');
        badge.className = 'badge badge-success';
        badge.textContent = job.jobType; // Replace 'jobType' with the actual property name in your job object

        metaDiv.appendChild(badge);
        aboutDiv.appendChild(locationDiv);
        aboutDiv.appendChild(metaDiv);

        listItem.appendChild(aboutDiv);
        jobListingsContainer.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching job listings:', error);
    });




    // Function to fetch paginated job data from backend
async function fetchJobs(page) {
    try {
      const response = await fetch(`/api/jobs?page=${page}`); // Replace with your actual backend API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch job data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching job data:', error);
      return null;
    }
  }
  
  // Function to render jobs
  function renderJobs(jobs) {
    // Render your job data here
  }
  
  // Function to render pagination links
  function renderPagination(totalJobs, jobsPerPage, currentPage) {
    // Calculate total pages
    const totalPages = Math.ceil(totalJobs / jobsPerPage);
  
    // Render pagination links
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear existing pagination links
    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = i;
      link.addEventListener('click', async function(event) {
        event.preventDefault();
        const page = parseInt(event.target.textContent);
        const jobs = await fetchJobs(page);
        if (jobs) {
          currentPage = page;
          renderJobs(jobs);
          renderPagination(totalJobs, jobsPerPage, currentPage);
        }
      });
      paginationContainer.appendChild(link);
    }
  }
  
  // Initial setup
  async function initialize() {
    const initialJobs = await fetchJobs(1); // Fetch jobs for the initial page
    if (initialJobs) {
      renderJobs(initialJobs);
      renderPagination(initialJobs.totalJobs, initialJobs.jobsPerPage, initialJobs.currentPage);
    }
  }
  
  initialize(); // Call the initialize function to start fetching and rendering data
  