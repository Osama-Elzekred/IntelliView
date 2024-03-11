"use client";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import Phone from "../../components/Phone";
import Cookies from "js-cookie";
import Link from "next/link";
import { redirect } from "next/navigation";
export default function EditProfile() {
  let [message,setMessage] = useState(""); 
  let [color,setColor] = useState(""); 
  const [authToken, setAuthToken] = useState("");
  const role = Cookies.get("role"); 
  const authTokenCookie = Cookies.get("authToken");
  // const [userId ,setUserId] = useState("")

  if (!authTokenCookie || (role != "company")){
    redirect("/"); 
  }
  const [formData, setFormData] = useState({
    companyName: "",
    type: "",
    overview: "",
    website: "",
    size: "",
    founded: "",
    phoneNumber: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [imageURL, setPhotoUrl] = useState(null);
  const phoneInputGfgRef = useRef();

  // Function to retrieve the phone number value
  const getPhoneNumberValue = () => {
    if (phoneInputGfgRef.current) {
      return phoneInputGfgRef.current.getPhoneInputValue();
    }
    return "";
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authTokenCookie) {
          setAuthToken(authTokenCookie);
          const response = await fetch("https://localhost:7049/api/Profile", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokenCookie}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setFormData({
              companyName: data.companyName,
              type: data.type,
              overview: data.overview,
              website: data.website,
              phoneNumber: data.phoneNumber,
              size: data.size,
              founded: data.founded,
            });
            setPhotoUrl(
              `../../../Back-End/IntelliView/IntelliView.API/${data.imageURl}`
            );
          } else {
            console.error("Failed to fetch user data");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDataSubmit = async () => {
    // to make the post of form user data
    const phoneNumber = getPhoneNumberValue();
    setFormData((FormData) => ({
      ...FormData,
      phoneNumber: phoneNumber,
    }));

    try {
      const response = await fetch("https://localhost:7049/api/Profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Profile updated successfully");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  //change password here
  const handlePasswordChange = (field, value) => {
    setPasswordForm({ ...passwordForm, [field]: value });
  };
  const handlePasswordSubmit = async () => {
    console.log("password part here ");
    if (
      passwordForm.currentPassword === "" ||
      passwordForm.newPassword === "" ||
      passwordForm.newPasswordConfirm === ""
    ) {
      setColor("red");
      setMessage("Fill All Fields");
      
    } else if (passwordForm.newPassword != passwordForm.newPasswordConfirm) {
      setColor("blue");
      setMessage("Password not match"); 
      
    } else {
      const userId = Cookies.get("user_id");
      try {
        const response = await fetch(
          "https://localhost:7049/api/Password/change-password",
          {
            method: "POST",
            headers: {
              Authoriazation: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              oldPassword: passwordForm.currentPassword,
              newPassword: passwordForm.newPassword,
            }),
          }
        );
        if (response.ok) {
          setColor("green"); 
          setMessage( "Password Changed Successfully");
          
        } else {
          setColor("red");
          setMessage ("Password Not Change");
        }
      } catch (error) {
        setColor("red");
        setMessage (error);
        console.error("error", error);
      }
    }
  };
  const [file, setFile] = useState(null);
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Create a new FormData object
    const formData = new FormData();
    formData.append("file", file);

    // Send the POST request to the server
    try {
      const response = await fetch(
        "https://localhost:7049/api/Profile/updatePicture",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();

        setPhotoUrl(
          `../../../Back-End/IntelliView/IntelliView.API/${data.imageURl}`
        );
        console.log("Photo uploaded successfully");
      } else {
        console.error("Failed to upload photo");
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };
  return (
    <Layout>
      {/* <ProtectedPage allowedRoles={["company"]}/> */}
      <link rel="stylesheet" href="/css/edit-profile.css" />
      <div className="site-wrap">
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle" />
            </div>
          </div>
          <div className="site-mobile-menu-body" />
        </div>{" "}
        {/* .site-mobile-menu */}
        {/* NAVBAR */}

        {/* HOME */}
        <section
          className="section-hero overlay inner-page bg-image"
          style={{
            backgroundImage:
              'url("/images/ai-background-business-technology-digital-transformation.jpg")',
          }}
          id="home-section"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h1 className="text-white font-weight-bold">Edit Profile</h1>
                <div className="custom-breadcrumbs">
                  <Link href="#">Home</Link> <span className="mx-2 slash">/</span>
                  <span className="text-white">
                    <strong>Edit Peofile</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container light-style flex-grow-1 container-p-y">
          <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
              <div className="col-md-3 pt-0">
                <div className="list-group list-group-flush account-settings-links">
                  <Link
                    className="list-group-item list-group-item-action active"
                    data-toggle="list"
                    href="#account-general"
                  >
                    General
                  </Link>
                  <Link
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-change-password"
                  >
                    Change password
                  </Link>
                  <Link
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-info"
                  >
                    Info
                  </Link>
                  <Link
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-social-links"
                  >
                    Social links
                  </Link>
                  <Link
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-connections"
                  >
                    Connections
                  </Link>
                  <Link
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-notifications"
                  >
                    Notifications
                  </Link>
                </div>
              </div>
              <div className="col-md-9">
                <div className="tab-content">
                  <div
                    className="tab-pane fade active show"
                    id="account-general"
                  >
                    <div className="card-body media align-items-center">
                      <img src={imageURL} alt="" className="d-block ui-w-80" />
                      <div className="media-body ml-4">
                        <label className="btn btn-outline-primary">
                          Upload new photo
                          <input
                            type="file"
                            className="account-settings-fileinput"
                            onChange={handleFileChange}
                          />
                        </label>{" "}
                        &nbsp;
                        <button
                          type="button"
                          className="btn btn-default md-btn-flat"
                        >
                          Reset
                        </button>
                        <div className="text-light small mt-1">
                          Allowed JPG, GIF or PNG. Max size of 800K
                        </div>
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body">
                      <form className="Company">
                        <div className="form-company">
                          <div className="name-type">
                            <div className="company-name">
                              <label htmlFor="company-name">name</label>
                              <br />
                              <input
                                id="company-name"
                                type="text"
                                value={formData.companyName}
                                onChange={(e) =>
                                  handleChange("companyName", e.target.value)
                                }
                              />
                            </div>
                            <div className="type_">
                              <label htmlFor="type_">type</label>
                              <br />
                              <input
                                type="text"
                                id="type_"
                                value={formData.type}
                                onChange={(e) =>
                                  handleChange("type", e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="overview">
                            <label htmlFor="overview">overview</label>
                            <br />
                            <textarea
                              className="overview_"
                              defaultValue={""}
                              value={formData.overview}
                              onChange={(e) =>
                                handleChange("overview", e.target.value)
                              }
                            />
                          </div>
                          <div className="website_">
                            <label htmlFor="website_">Website</label>
                            <br />
                            <input
                              type="text"
                              id="website_"
                              value={formData.website}
                              onChange={(e) =>
                                handleChange("website", e.target.value)
                              }
                            />
                          </div>
                          {/* <div className="phone-company"> */}
                          <label htmlFor="phone">phone number</label>

                          <Phone
                            value={formData.phoneNumber}
                            // onChange={(e) =>
                            //   handleChange("phoneNumber", e.target.value)
                            // }
                          />
                          {/* </div> */}
                          <div className="size-founded">
                            <div className="size_">
                              <label htmlFor="size_">size</label>
                              <br />
                              <input
                                type="text"
                                id="size_"
                                value={formData.size}
                                onChange={(e) =>
                                  handleChange("size", e.target.value)
                                }
                              />
                            </div>
                            <div className="founded_">
                              <label htmlFor="founded_">founded</label>
                              <br />
                              <input
                                type="year"
                                id="founded_"
                                value={formData.founded}
                                onChange={(e) =>
                                  handleChange("founded", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text-right mt-3">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleDataSubmit}
                          >
                            Save Changes
                          </button>
                          &nbsp;
                          <button type="button" className="btn btn-default">
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="account-change-password">
                    <div className="card-body pb-2">
                      <form>
                        <div className="form-group-">
                          <label className="form-label-">
                            Current password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={(e) =>
                              handlePasswordChange(
                                "currentPassword",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="form-group-">
                          <label className="form-label">New password</label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={(e) =>
                              handlePasswordChange(
                                "newPassword",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="form-group-">
                          <label className="form-label-">
                            Repeat new password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={(e) =>
                              handlePasswordChange(
                                "newPasswordConfirm",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="text-right mt-3">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handlePasswordSubmit}
                          >
                            Change Password
                          </button>
                          &nbsp;
                          <button type="button" className="btn btn-default">
                            Cancel
                          </button>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: color,
                            fontWeight: "bold",
                          }}
                        >
                          {message}
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="account-info">
                    <div className="card-body pb-2">
                      <div className="form-group-">
                        <label className="form-label-">Bio</label>
                        <textarea
                          className="form-control"
                          rows={5}
                          defaultValue={
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus."
                          }
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">Birthday</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="May 3, 1995"
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">Country</label>
                        <select className="custom-select">
                          <option>USA</option>
                          <option selected="">Canada</option>
                          <option>UK</option>
                          <option>Germany</option>
                          <option>France</option>
                        </select>
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body pb-2">
                      <h6 className="mb-4">Contacts</h6>
                      <div className="form-group-">
                        <label className="form-label-">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="+0 (123) 456 7891"
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">Website</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="account-social-links">
                    <div className="card-body pb-2">
                      <div className="form-group-">
                        <label className="form-label-">Twitter</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="https://twitter.com/user"
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">Facebook</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="https://www.facebook.com/user"
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">Google+</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">LinkedIn</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                        />
                      </div>
                      <div className="form-group-">
                        <label className="form-label-">Instagram</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="https://www.instagram.com/user"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="account-connections">
                    <div className="card-body">
                      <button type="button" className="btn btn-twitter">
                        Connect to <strong>Twitter</strong>
                      </button>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body">
                      <h5 className="mb-2">
                        <Link
                          href="javascript:void(0)"
                          className="float-right text-muted text-tiny"
                        >
                          <i className="ion ion-md-close" /> Remove
                        </Link>
                        <i className="ion ion-logo-google text-google" />
                        You are connected to Google:
                      </h5>
                      <Link
                        href="/cdn-cgi/l/email-protection"
                        className="__cf_email__"
                        data-cfemail="523c3f332a25373e3e123f333b3e7c313d3f"
                      >
                        [email&nbsp;protected]
                      </Link>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body">
                      <button type="button" className="btn btn-facebook">
                        Connect to <strong>Facebook</strong>
                      </button>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body">
                      <button type="button" className="btn btn-instagram">
                        Connect to <strong>Instagram</strong>
                      </button>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="account-notifications">
                    <div className="card-body pb-2">
                      <h6 className="mb-4">Activity</h6>
                      <div className="form-group">
                        <label className="switcher">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            defaultChecked=""
                          />
                          <span className="switcher-indicator">
                            <span className="switcher-yes" />
                            <span className="switcher-no" />
                          </span>
                          <span className="switcher-label">
                            Email me when someone comments on my article
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            defaultChecked=""
                          />
                          <span className="switcher-indicator">
                            <span className="switcher-yes" />
                            <span className="switcher-no" />
                          </span>
                          <span className="switcher-label">
                            Email me when someone answers on my forum thread
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input type="checkbox" className="switcher-input" />
                          <span className="switcher-indicator">
                            <span className="switcher-yes" />
                            <span className="switcher-no" />
                          </span>
                          <span className="switcher-label">
                            Email me when someone follows me
                          </span>
                        </label>
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body pb-2">
                      <h6 className="mb-4">Application</h6>
                      <div className="form-group">
                        <label className="switcher">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            defaultChecked=""
                          />
                          <span className="switcher-indicator">
                            <span className="switcher-yes" />
                            <span className="switcher-no" />
                          </span>
                          <span className="switcher-label">
                            News and announcements
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input type="checkbox" className="switcher-input" />
                          <span className="switcher-indicator">
                            <span className="switcher-yes" />
                            <span className="switcher-no" />
                          </span>
                          <span className="switcher-label">
                            Weekly product updates
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="switcher">
                          <input
                            type="checkbox"
                            className="switcher-input"
                            defaultChecked=""
                          />
                          <span className="switcher-indicator">
                            <span className="switcher-yes" />
                            <span className="switcher-no" />
                          </span>
                          <span className="switcher-label">
                            Weekly blog digest
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </Layout>
  );
}
