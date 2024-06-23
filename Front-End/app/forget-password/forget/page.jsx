'use client';
import { useState } from 'react';
import Link from 'next/link';
import config from '../../../config';


const Forget_password = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showResetForm, setShowResetForm] = useState(false); // State to manage form visibility
  const [isPending, setIsPending] = useState(true);
  const { DOMAIN_NAME } = config;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    try {
      const response = await fetch(
        `https://${DOMAIN_NAME}/api/Password/forget-password`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      if (response.ok) {
        setMessage('Check your inbox to reset your password.');
        setShowResetForm(true); // Display the reset form
        setIsPending(false);
          setError(null);
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
      setIsPending(false);
    }
  };

  return (
    <>
      {error &&<div>{alert}</div>}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Forgot Password</title>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 400px;
            margin: 50px auto;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            padding: 40px;
        }
        .container h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
            box-sizing: border-box;
        }
        .form-group button {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 3px;
            background-color: #17a9c3;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        .form-group button:hover {
            background-color: #44cc16;
        }
        .message {
            display: ${message ? 'block' : 'none'};
            text-align: center;
            margin-top: 20px;
            color: #007bff;
        }
        .error {
            display: ${error ? 'block' : 'none'};
            text-align: center;
            margin-top: 20px;
            color: #ff0000;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #888;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    `,
        }}
      />
      <div className="container">
        <h2>Forgot Password</h2>
        {!showResetForm ? ( // Display the initial form if showResetForm is false
          <form id="forgotPasswordForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <button type="submit" id="submitButton">
                Send Reset Email
              </button>
            </div>
            <div className="footer">
              <p>
                Remember your password? <Link href="/login">Login here</Link>
              </p>
            </div>
            <div id="error" className="error">
              {error}
            </div>
          </form>
        ) : (
          // Display the reset form if showResetForm is true
          <form id="resetPasswordForm">
            {/* Add your fields for resetting password here */}
            <div className="form-group">
              <label htmlFor="newPassword">E-mail</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Code</label>
              <input type="text" id="code" name="code" required />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" id="resetButton">
                Reset Password
              </button>
            </div>
          </form>
        )}
        <div id="message" className="message">
          {message}
        </div>
      </div>
    </>
  );
};

export default Forget_password;
