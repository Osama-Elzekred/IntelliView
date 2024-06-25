'use client';
import React, { useState, useEffect, useRef } from 'react';
import Phone from '../../components/Phone';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Loading, Breadcrumb, Layout } from '../../components/components';
import { redirect } from 'next/navigation';
import config from '../../../config';

import { useToast } from '../../components/Toast/ToastContext';
export default function EditProfile() {
  let [message, setMessage] = useState('');
  let [color, setColor] = useState('');
  const [authToken, setAuthToken] = useState('');
  const role = Cookies.get('role');
  const authTokenCookie = Cookies.get('authToken');
  const { DOMAIN_NAME } = config;
  const [pagenum, setPagenum] = useState(1);
  const { open } = useToast();

  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    companyOverview: '',
    companyWebsite: '',
    companySize: '',
    companyFounded: '',
    phoneNumber: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [imageURL, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const phoneInputGfgRef = useRef();

  // Function to retrieve the phone number value
  const getPhoneNumberValue = () => {
    if (phoneInputGfgRef.current) {
      return phoneInputGfgRef.current.getPhoneInputValue();
    }
    return '';
  };
  useEffect(() => {
    if (!authTokenCookie || role != 'company') {
      redirect('/');
    }
    const fetchData = async () => {
      try {
        if (authTokenCookie) {
          setAuthToken(authTokenCookie);
          const response = await fetch(`https://${DOMAIN_NAME}/api/Profile`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authTokenCookie}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setFormData({
              companyName: data.companyName,
              companyType: data.companyType,
              companyOverview: data.companyOverview,
              companyWebsite: data.companyWebsite,
              phoneNumber: data.phoneNumber,
              companySize: data.companySize,
              companyFounded: data.companyFounded,
            });
            setPhotoUrl(`${data.imageURl}`);
          } else {
            console.error('Failed to fetch user data');
          }
        }
        setLoading(false);
      } catch (error) {
        open(' Error while saving Company Data ', false);
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDataSubmit = async () => {
    // to make the post of form user data
    // // const phoneNumber = getPhoneNumberValue();
    // setFormData((FormData) => ({
    //   ...FormData,
    //   phoneNumber: phoneNumber,
    // }));

    try {
      const response = await fetch(`https://${DOMAIN_NAME}/api/Profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        open(' Profile updated successfully', true);
        //console.log('Profile updated successfully');
      } else {
        open(' Failed to update profile', false);
        console.error('Failed to update profile');
      }
      setLoading(false);
    } catch (error) {
      open(' Failed to update profile', false);
      console.error('Error updating profile:', error);
    }
  };

  //change password here
  const handlePasswordChange = (field, value) => {
    setPasswordForm({ ...passwordForm, [field]: value });
  };
  const handlePasswordSubmit = async () => {
    //console.log('password part here ');
    if (
      passwordForm.currentPassword === '' ||
      passwordForm.newPassword === '' ||
      passwordForm.newPasswordConfirm === ''
    ) {
      setColor('red');
      setMessage('Fill All Fields');
    } else if (passwordForm.newPassword != passwordForm.newPasswordConfirm) {
      setColor('blue');
      setMessage('Password not match');
    } else {
      const userId = Cookies.get('user_id');
      try {
        const response = await fetch(
          `https://${DOMAIN_NAME}/api/Password/change-password`,
          {
            method: 'POST',
            headers: {
              Authoriazation: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userId,
              oldPassword: passwordForm.currentPassword,
              newPassword: passwordForm.newPassword,
            }),
          }
        );
        if (response.ok) {
          setColor('green');
          setMessage('Password Changed Successfully');
          open(' Password updated successfully', true);
        } else {
          setColor('red');
          setMessage('Password Not Change');
          open(' Failed to update Password', false);
        }
      } catch (error) {
        setColor('red');
        setMessage(error);
        open(' Failed to update Password', false);
        console.error('error', error);
      }
    }
  };
  const handleUploadPhoto = async (event) => {
    const selectedFile = event.target.files[0];
    //console.log(selectedFile);
    // Create a new FormData object
    const formData = new FormData();
    formData.append('file', selectedFile);
    // Send the POST request to the server
    //console.log(formData);

    try {
      const response = await fetch(
        `https://${DOMAIN_NAME}/api/Profile/updatePicture`,
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

        setPhotoUrl(`${data.imageURl}`);
        open(' Photo uploaded successfully ', true);
        // //console.log('Photo uploaded successfully');
      } else {
        open(' Failed to upload photo ', false);
        //console.error('Failed to upload photo');
      }
      setLoading(false);
    } catch (error) {
      open(' Failed to upload photo ', false);
      //console.error('Error uploading photo:', error);
    }
  };
  const profilePhotoUrl = imageURL;
  localStorage.setItem('profilePhotoUrl', profilePhotoUrl);
  if (loading) {
    return <Loading />; // Display loading indicator while data is being fetched
  }

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
        </div>{' '}
        <Breadcrumb links={[{ name: 'Profile', link: '#' }]} />
        <div className="container light-style flex-grow-1 container-p-y">
          <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
              <div className="col-md-3 pt-0">
                <div className="list-group list-group-flush account-settings-links">
                  <Link
                    className="list-group-item list-group-item-action active"
                    data-toggle="list"
                    href="#account-general"
                    onClick={() => setPagenum(1)}
                  >
                    General
                  </Link>
                  <Link
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-change-password"
                    onClick={() => setPagenum(2)}
                  >
                    Change password
                  </Link>
                  <Link
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-info"
                    onClick={() => setPagenum(3)}
                  >
                    Info
                  </Link>
                  <Link
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-social-links"
                    onClick={() => setPagenum(4)}
                  >
                    Social links
                  </Link>
                  <Link
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-connections"
                    onClick={() => setPagenum(5)}
                  >
                    Connections
                  </Link>
                  <Link
                    className="list-group-item list-group-item-action"
                    data-toggle="list"
                    href="#account-notifications"
                    onClick={() => setPagenum(6)}
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
                    {pagenum === 1 && (
                      <>
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
                                onChange={(e) => handleUploadPhoto(e)}
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

                        <div className="card-body">
                          <form className="Company">
                            <div className="form-company flex flex-col space-y-5">
                              <div className="flex space-x-5">
                                <div className="flex-1">
                                  <label htmlFor="company-name">name</label>
                                  <br />
                                  <input
                                    id="company-name"
                                    type="text"
                                    className="form-control"
                                    value={formData.companyName}
                                    onChange={(e) =>
                                      handleChange(
                                        'companyName',
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex-1">
                                  <label htmlFor="companyType">type</label>
                                  <br />
                                  <input
                                    type="text"
                                    id="companyType"
                                    className="form-control"
                                    value={formData.companyType}
                                    onChange={(e) =>
                                      handleChange(
                                        'companyType',
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="flex-1">
                                <label htmlFor="companyOverview">
                                  overview
                                </label>
                                <br />
                                <textarea
                                  className="w-full h-full rounded-sm"
                                  value={formData.companyOverview}
                                  onChange={(e) =>
                                    handleChange(
                                      'companyOverview',
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="flex-1">
                                <br />
                                <label htmlFor="companyWebsite">Website</label>
                                <input
                                  type="text"
                                  id="companyWebsite"
                                  className="form-control"
                                  value={formData.companyWebsite}
                                  onChange={(e) =>
                                    handleChange(
                                      'companyWebsite',
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="flex-1">
                                {/* <div className="phone-company"> */}
                                <label htmlFor="phone">phone number</label>

                                <Phone
                                  className="w-full h-full "
                                  value={formData.phoneNumber}
                                  handlePhoneChange={(phone) =>
                                    handleChange('phoneNumber', phone)
                                  }
                                />
                              </div>
                              {/* </div> */}
                              <div className="flex flex-row space-x-2">
                                <div className="flex-1">
                                  <label htmlFor="companySize">
                                    companySize
                                  </label>
                                  <br />
                                  <input
                                    type="text"
                                    id="companySize"
                                    className="form-control"
                                    value={formData.companySize}
                                    onChange={(e) =>
                                      handleChange(
                                        'companySize',
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex-1">
                                  <label htmlFor="companyFounded">
                                    founded
                                  </label>
                                  <br />
                                  <input
                                    type="year"
                                    id="companyFounded"
                                    className="form-control"
                                    value={formData.companyFounded}
                                    onChange={(e) =>
                                      handleChange(
                                        'companyFounded',
                                        e.target.value
                                      )
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
                      </>
                    )}
                    {pagenum === 2 && (
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
                                  'currentPassword',
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
                                  'newPassword',
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
                                  'newPasswordConfirm',
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
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              color: color,
                              fontWeight: 'bold',
                            }}
                          >
                            {message}
                          </div>
                        </form>
                      </div>
                    )}
                    {pagenum === 3 && (
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
                          <select className="custom-select">
                            <option>USA</option>
                            <option value="">Canada</option>
                            <option>UK</option>
                            <option>Germany</option>
                            <option>France</option>
                          </select>
                        </div>
                      </div>
                    )}
                    {pagenum === 4 && (
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
                    )}
                    {pagenum === 5 && (
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
                    )}
                    {pagenum === 6 && (
                      <div>
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
                    )}
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
