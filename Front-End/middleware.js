import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
export default function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;
  const url = request.url;
  if (
    !authToken &&
    (url.includes("/post") ||
      url.includes("/job") ||
      url.includes("/profile") ||
      url.includes("/Interview"))
  ) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  if(authToken  &&  url.includes("/login")){
    return NextResponse.redirect('http://localhost:3000/')
  }
  return NextResponse.next();
}
