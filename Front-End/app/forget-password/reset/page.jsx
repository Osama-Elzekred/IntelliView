export default function ForgetPasswordResetPage() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Reset</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n        body {\n            font-family: Arial, sans-serif;\n            margin: 0;\n            padding: 0;\n            background-color: #f4f4f4;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            height: 100vh;\n        }\n        .container {\n            background-color: #fff;\n            padding: 20px;\n            border-radius: 8px;\n            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);\n        }\n        h2 {\n            text-align: center;\n            margin-bottom: 20px;\n        }\n        label {\n            display: block;\n            margin-bottom: 8px;\n        }\n        input[type="email"],\n        input[type="password"],\n        input[type="text"] {\n            width: 100%;\n            padding: 10px;\n            margin-bottom: 20px;\n            border: 1px solid #ccc;\n            border-radius: 4px;\n            box-sizing: border-box;\n        }\n        input[type="submit"] {\n            width: 100%;\n            padding: 10px;\n            background-color: #007bff;\n            color: #fff;\n            border: none;\n            border-radius: 4px;\n            cursor: pointer;\n            font-size: 16px;\n        }\n        input[type="submit"]:hover {\n            background-color: #0056b3;\n        }\n    ',
        }}
      />
      <div className="container">
        <h2>Password Reset</h2>
        <form action="#" method="post">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required="" />
          <label htmlFor="verification-code">Verification Code:</label>
          <input
            type="text"
            id="verification-code"
            name="verification-code"
            required=""
          />
          <label htmlFor="new-password">New Password:</label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            required=""
          />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            required=""
          />
          <input type="submit" defaultValue="Reset Password" />
        </form>
      </div>
    </>
  );
}