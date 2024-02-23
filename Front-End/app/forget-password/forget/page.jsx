import Script from 'next/script';
const Forget_password = () => (
  <><>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forgot Password</title>
    <style
      dangerouslySetInnerHTML={{
        __html: "\n        body {\n            font-family: Arial, sans-serif;\n            background-color: #f5f5f5;\n            margin: 0;\n            padding: 0;\n        }\n        .container {\n            max-width: 400px;\n            margin: 50px auto;\n            background-color: #fff;\n            border-radius: 5px;\n            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n            padding: 40px;\n        }\n        .container h2 {\n            text-align: center;\n            margin-bottom: 20px;\n            color: #333;\n        }\n        .form-group {\n            margin-bottom: 20px;\n        }\n        .form-group label {\n            display: block;\n            font-weight: bold;\n            margin-bottom: 5px;\n        }\n        .form-group input {\n            width: 100%;\n            padding: 10px;\n            border: 1px solid #ccc;\n            border-radius: 3px;\n            box-sizing: border-box;\n        }\n        .form-group button {\n            width: 100%;\n            padding: 10px;\n            border: none;\n            border-radius: 3px;\n            background-color: #007bff;\n            color: #fff;\n            font-weight: bold;\n            cursor: pointer;\n            transition: background-color 0.3s ease;\n        }\n        .form-group button:hover {\n            background-color: #0056b3;\n        }\n        .message {\n            display: none;\n            text-align: center;\n            margin-top: 20px;\n            color: #007bff;\n        }\n        .footer {\n            text-align: center;\n            margin-top: 20px;\n            color: #888;\n        }\n        .footer a {\n            color: #007bff;\n            text-decoration: none;\n        }\n        .footer a:hover {\n            text-decoration: underline;\n        }\n    "
      }} />
  </><div className="container">
      <h2>Forgot Password</h2>
      <form id="forgotPasswordForm" action="#" method="post">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required="" />
        </div>
        <div className="form-group">
          <button type="submit" id="submitButton">
            Send Reset Email
          </button>
        </div>
        <div className="footer">
          <p>
            Remember your password? <a href="login.html">Login here</a>
          </p>
        </div>
        <div id="error" />
      </form>
      <div id="message" className="message">
        Check your inbox to reset your password.
      </div>
    </div>
    <Script src="/js/forgot-password.js">

    </Script></>
);

export default Forget_password;
