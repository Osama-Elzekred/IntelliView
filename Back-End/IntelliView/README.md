# Intelliview

## Overview

Intelliview is a powerful AI-driven platform designed to enhance the recruitment process for companies and help job seekers prepare for interviews through mock interview sessions. The platform supports both Arabic and English languages, making it versatile and accessible for a diverse user base.

## Features

### For Recruiters
- **Post Jobs**: Companies can post job listings with detailed descriptions and requirements.
- **Interview Questions**: Attach specific interview questions to job postings.
- **CV Scoring**: Automatically score and filter candidates based on their CVs.
- **AI Analysis**: Utilize AI to analyze candidates' answers from mock interviews.
- **Bilingual Support**: Conduct interviews in both Arabic and English.

### For Job Seekers
- **Mock Interviews**: Practice for interviews with pre-set or custom mock interview sessions.
- **AI Feedback**: Receive AI-generated feedback on interview performance.
- **Upload CVs**: Post CVs to be reviewed and commented on by peers and recruiters.
- **Bilingual Support**: Practice mock interviews in both Arabic and English.

## Technologies Used

### Frontend
- **Next.js**: A React framework for building user interfaces.
- **Formidable**: A Node.js module for parsing form data, especially file uploads.
- **React**: A JavaScript library for building user interfaces.

### Backend
- **.NET Core**: A cross-platform framework for building modern, cloud-based, Internet-connected applications.
- **Entity Framework Core**: An object-database mapper for .NET.
- **Azure Services**: Used for text-to-avatar conversion.
- **Google Gemini API**: Used for analyzing and providing feedback on interview answers.

## Setup and Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **.NET Core SDK**: Ensure you have .NET Core SDK installed.
- **SQL Server**: Ensure you have a SQL Server instance running.

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Osama-Elzekred/IntelliView.git
   cd IntelliView/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd ../backend
   ```

2. Update the `appsettings.json` with your database connection string and other configurations.

3. Restore .NET packages:

   ```bash
   dotnet restore
   ```

4. Apply database migrations:

   ```bash
   dotnet ef database update
   ```

5. Run the backend server:

   ```bash
   dotnet run
   ```
## Usage

### Posting a Job (Recruiter)
1. Log in to the recruiter dashboard.
2. Navigate to the "Post a Job" section.
3. Fill in the job details and attach interview questions.
4. Publish the job.

### Practicing a Mock Interview (Job Seeker)
1. Log in to the job seeker dashboard.
2. Navigate to the "Mock Interviews" section.
3. Select a mock interview to practice.
4. Record and upload your answers.
5. Receive AI-generated feedback.

## Contributing

We welcome contributions to improve Intelliview. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to our amazing team and mentors who contributed to the success of this project.

---

Feel free to explore and contribute to Intelliview. For any questions or issues, please contact us at [intelliviewApp@gmail.com](mailto:intelliviewApp@gmail.com).
