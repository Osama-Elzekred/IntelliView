import Link from 'next/link';

const UnauthorizedPage = () => {
  return (
    <div className="container">
      <h1>Unauthorized Access</h1>
      <p>You are not authorized to access this page.</p>
       <Link href="/Home">Go Back To Home Page</Link>
    </div>
  );
};

export default UnauthorizedPage;