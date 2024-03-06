"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const ProtectedPage = ({ allowedRoles, children }) => {
  const userRole = Cookies.get("role"); // Assuming role is stored in cookies

  useEffect(() => {
    // Check if user's role is allowed to access the page
    if (!allowedRoles.includes(userRole)) {
      return <Link href="/unauthorized" />; // Redirect to unauthorized page
    }
  }, [userRole]);

  return children;
};

export default ProtectedPage;
