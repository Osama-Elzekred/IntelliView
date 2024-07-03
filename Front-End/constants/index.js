import { title } from 'process';

const topFeatures = [
  {
    title: 'Customizable Mock Interviews',
    description:
      'Tailor mock interviews to specific job roles or industries, allowing users to focus on areas of interest.',
    icon: 'fa-cogs',
  },
  {
    title: 'Interactive Video Avatars',
    description:
      'Engage with interview questions presented by video avatars, enhancing the simulation experience.',
    icon: 'fa-user-circle',
  },
  {
    title: 'Recording and Playback Functionality',
    description:
      'Record interview responses for self-assessment and playback, enabling users to review and improve their performance.',
    icon: 'fa-video',
  },
  {
    title: 'Feedback Analysis',
    description:
      'Receive comprehensive feedback and analysis on interview responses, highlighting strengths and areas for improvement.',
    icon: 'fa-chart-bar',
  },
  {
    title: 'AI-Powered Evaluation',
    description:
      'Benefit from AI technology for interview evaluation, providing valuable insights and recommendations.',
    icon: 'fa-robot',
  },
  {
    title: 'Candidate Filtering',
    description:
      'Utilize the platform to filter job candidates based on their performance in mock interviews, streamlining the selection process.',
    icon: 'fa-filter',
  },
];

const CompanyNavitems = [
  {
    title: 'Post a Job',
    href: '/job/post',
  },
  {
    title: 'Jobs of Company',
    href: '/job/job-company',
  },
];
const UserNavitems = [
  {
    title: 'My jobs',
    href: '/job/user-jobs',
  },
];

export { topFeatures, CompanyNavitems, UserNavitems };
