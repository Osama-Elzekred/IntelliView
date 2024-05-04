'use client';
import Layout from '../../components/Layout';
import Phone from '../../components/Phone';
import Script from 'next/script';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { FileInput, Label } from 'flowbite-react';
import { Badge } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import Loading from '../../components/loading';

const DOMAIN_NAME = 'localhost:7049';
// const [loading, setLoading] = useState(true);
const User_profile = () => {
  const [click, setClick] = useState();
  const authToken = Cookies.get('authToken');
  const [cvName, setCvName] = useState(null);
  const role = Cookies.get('role');
  const userID = Cookies.get('user_id');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageURL, setPhotoUrl] = useState(null);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
    phoneNumber: '',
  });

  const handleInputChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    fetch(`https://${DOMAIN_NAME}/api/Profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch profile data');
        }
      })
      .then((data) => {
        setUserData({
          ...userData,
          firstName: data.firstName,
          lastName: data.lastName,
          title: data.title,
          phoneNumber: data.phoneNumber,
          // Add any other fields from the response here
        });
        setPhotoUrl(`${data.imageURl}`);
        setCvName(data.cvurl);
        console.log('Profile data:', data.firstName);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, []);
  useEffect(() => {
    // if (!authToken || (role != 'user' && role != 'User')) {
    //   redirect('/');
    // }
    if (typeof window != 'undefined') {
      const storedCvName = localStorage.getItem('cvName');
      if (storedCvName) {
        setCvName(storedCvName);
        setClick(true);
      }
    }
  }, []);
  const handleDisplay = async () => {
    setClick(false);
  };
  const handlePhotoChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Create a new FormData object
    const formData = new FormData();
    formData.append('file', file);

    // Send the POST request to the server
    try {
      const response = await fetch(
        'https://localhost:7049/api/Profile/updatePicture',
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('profilePhotoUrl', data.imageURl);
        setPhotoUrl(`${data.imageURl}`);
        console.log('Photo uploaded successfully');
      } else {
        console.error('Failed to upload photo');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };
  const handleFileChange = async (event) => {
    // setSelectedFiles(event.target.files);
    await handleUpload(event.target.files);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    if (
      userData.oldPassword &&
      userData.newPassword &&
      userData.newPasswordConfirm
    ) {
      if (userData.newPassword === userData.newPasswordConfirm) {
        fetch(`https://localhost:7049/api/Password/change-password`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            userID: userID,
            oldPassword: userData.oldPassword,
            newPassword: userData.newPassword,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.ok) {
              console.log('Password changed successfully');
            }
          });
      } else {
        console.log('Passwords do not match');
      }
    }
    fetch(`https://localhost:7049/api/Profile`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        firstname: userData.firstName,
        lastname: userData.lastName,
        title: userData.title,
        phoneNumber: userData.phoneNumber,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log('Data Changed');
        } else {
          console.log('Data Not Changed');
        }
      });
  };

  const handleUpload = async (files) => {
    if (!files) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }

    try {
      const response = await fetch(
        `https://${DOMAIN_NAME}/api/Profile/updateCV`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const fileName = files[0].name;
        localStorage.setItem('cvName', fileName);
        setCvName(fileName);
        setClick(true);
        console.log('Files uploaded successfully');
        // Handle success
      } else {
        console.error('Failed to upload files');
        // Handle failure
      }
      // setLoading(false);
    } catch (error) {
      console.error('Error occurred while uploading files:', error);
      // Handle error
    }
  };
  const profilePhotoUrl = imageURL;
  localStorage.setItem('profilePhotoUrl', profilePhotoUrl);

  // if (loading) {
  //   return <Loading />; // Display loading indicator while data is being fetched
  // }
  // if (loading) {
  //   return <Loading />; // Display loading indicator while data is being fetched
  // }

  return (
    <Layout>
      {/* <ProtectedPage allowedRoles={["user"]} /> */}
      <>
        <link rel="stylesheet" href="/css/edit-profile.css" />
        {/* <div id="overlayer" />
        <div className="loader">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div> */}
        <div className="site-wrap" id="top">
          <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
              <div className="site-mobile-menu-close mt-3">
                <span className="icon-close2 js-menu-toggle" />
              </div>
            </div>
            <div className="site-mobile-menu-body" />
          </div>{' '}
          {/* .site-mobile-menu */}
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
                    <Link href="/Home">Home</Link>{' '}
                    <span className="mx-2 slash">/</span>
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
                        <img
                          src={imageURL}
                          alt=""
                          className="d-block ui-w-80"
                        />
                        <div className="media-body ml-4">
                          <label className="btn btn-outline-primary">
                            Upload new photo
                            <input
                              type="file"
                              className="account-settings-fileinput"
                              onChange={handlePhotoChange}
                            />
                          </label>{' '}
                          &nbsp;
                          <button
                            type="button"
                            className="btn btn-default md-btn-flat"
                          >
                            Reset
                          </button>
                          <div className="text-light small mt-1">
                            Allowed JPG or PNG. Max size of 800K
                          </div>
                        </div>
                      </div>
                      <hr className="border-light m-0" />
                      <div className="container">
                        <form className="user" id="userForm">
                          <div className="container ">
                            <div className=" flex-row">
                              <div className="first_name">
                                <label htmlFor="first">First name</label>
                                <br />
                                <input
                                  id="firstName"
                                  type="text"
                                  name="firstName"
                                  value={userData.firstName}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="last_name">
                                <label htmlFor="last">last name</label>
                                <br />
                                <input
                                  id="lastName"
                                  type="text"
                                  name="lastName"
                                  value={userData.lastName}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="cv">
                              {cvName !== '' && click ? (
                                <div
                                  id="cvName"
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                  className="flex items-center"
                                >
                                  <Badge
                                    className="bg-blue-500 text-white mr-3"
                                    style={{
                                      backgroundColor: '#17a9c3',
                                      color: 'white',
                                    }}
                                    size=""
                                  >
                                    CV Name : {cvName}
                                  </Badge>
                                  <Button
                                    className="ml-2 hover:bg-green-100"
                                    style={{
                                      backgroundColor: '#17a9c3',
                                      color: 'white',
                                      fontFamily: 'arial',
                                      fontWeight: 'semibold',
                                    }}
                                    size="sm"
                                    onClick={handleDisplay}
                                  >
                                    Change Cv
                                  </Button>
                                </div>
                              ) : (
                                <div id="uploadCv" className="w-[100%]">
                                  <div className="mb-2 block">
                                    <Label
                                      htmlFor="file-upload"
                                      value="Upload file"
                                    />
                                  </div>
                                  <FileInput
                                    id="file-upload"
                                    onChange={handleFileChange}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="w-full">
                              <label htmlFor="title">title</label>
                              <br />
                              <input
                                type="text"
                                id="title"
                                name="title"
                                value={userData.title}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="">
                              <label htmlFor="phone">phone number</label>
                              <br />
                              <Phone
                                value={userData.phoneNumber}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="account-change-password">
                      <div className="card-body pb-2">
                        <div className="form-group-">
                          <label className="form-label-">
                            Current password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="oldPassword"
                            value={userData.oldPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group-">
                          <label className="form-label">New password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            value={userData.newPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group-">
                          <label className="form-label-">
                            Repeat new password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="newPasswordConfirm"
                          />
                        </div>
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
                              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus.'
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
                          <select>
                            <option>USA</option>
                            <option value="">Canada</option>
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
                            href="#"
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
                    <div id="message" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right mt-3">
              <button
                type="button"
                className="btn btn-primary"
                id="saveChanges"
                onClick={handleSaveChanges}
              >
                Save changes
              </button>
              &nbsp;
              <button type="button" className="btn btn-default">
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* <Script src="/js/profile.js"></Script> */}
      </>
    </Layout>
  );
};
export default User_profile;
