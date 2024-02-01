import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import {
  HomeIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import Details from "@/widgets/custom-widgets/profile/tabs/details";
import EditProfile from "@/widgets/custom-widgets/profile/tabs/edit-profile";
import CustomAvatar from "../../components/custom-avatar/index";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';
import { getProfileDetailsRequest, updateProfileRequet } from '@/store/reducers/user-reducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { showFaliureToast } from '@/utils/toast-helpers';
import { Skeleton } from '@mui/material';
import { logoutUserRequest } from '@/store/reducers/auth-reducer';
import { useNavigate } from 'react-router-dom';
import { objectToFormData } from "@/utils/helpers";

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [profileDetailsLocal, setProfileDetailsLocal] = useState(null)

  const { userDetails } = useSelector((state) => state.auth)
  const { profileDetails } = useSelector((state) => state.user)

  const token = get(userDetails, 'token', null);

  const full_name = get(profileDetailsLocal, "full_name", "");
  const email = get(profileDetailsLocal, "email", "");
  const phone_number = get(profileDetailsLocal, "phone_number", "");
  const bio = get(profileDetailsLocal, "bio", "");
  const profile_picture = get(profileDetailsLocal, "profile_picture.url", "");
  const friends = get(profileDetailsLocal, "friends", []);
  const courses = get(profileDetailsLocal, "courses", []);

  useEffect(() => {
    handleGetProfile()
  }, [])

  useEffect(() => {
    if (profileDetails) {
      setProfileDetailsLocal(profileDetails);
    }
  }, [profileDetails])

  const handleEditProfile = (payload) => {
    try {
      if (token) {
        const body = objectToFormData(payload)

        setLoading(true);

        dispatch(updateProfileRequet({ token, body }))
          .then(unwrapResult)
          .then(() => {
            handleGetProfile();
            setLoading(false)
          })
          .catch(err => {
            showFaliureToast(err?.response?.data?.message)
            if (err?.response?.data?.message === 'User not found') {
              handleLogout();
            }
            setLoading(false)
          })

      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = () => {
    try {
      dispatch(logoutUserRequest()).then(() => navigate("/sign-in"));
    } catch (error) {
      console.log(error);
    }
  }

  const handleGetProfile = () => {
    try {
      if (token) {
        setLoading(true);

        dispatch(getProfileDetailsRequest({ token }))
          .then(unwrapResult)
          .then(() => {
            setLoading(false)
          })
          .catch(err => {
            showFaliureToast(err?.response?.data?.message)
            if (err?.response?.data?.message === 'User not found') {
              handleLogout();
            }
            setLoading(false)
          })

      }
    } catch (error) {
      console.log(error);
    }
  }

  const tabs = [
    {
      label: "Details",
      value: "details",
      icon: <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />,
      component: <Details courses={courses} bio={bio} loading={loading} email={email} friends={friends} full_name={full_name} phone_number={phone_number} />
    },
    {
      label: "Edit Profile",
      value: "settings",
      icon: <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />,
      component: <EditProfile previousData={profileDetailsLocal} loading={loading} handleEditProfile={handleEditProfile} />
    },
  ];

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-contain	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/20" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <Tabs value="details">
            <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                {
                  loading ? (
                    <Skeleton variant="rectangular" className="rounded-md" animation='wave' height={'60px'} width={'60px'} />
                  ) : (
                    <CustomAvatar
                      sx={{ height: '74px', width: '74px', borderRadius: '8px' }}
                      src={profile_picture ?? "/img/bruce-mars.jpeg"}
                      variant="rounded"
                      name={full_name}
                      className={"rounded-lg shadow-lg shadow-blue-gray-500/40"}
                    />
                  )
                }
                <div>
                  {
                    !loading && full_name ?
                      <Typography variant="h5" color="blue-gray" className="mb-1">
                        {full_name}
                      </Typography> :
                      <Skeleton animation='wave' height={'50px'} width={'20ch'} />
                  }
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    Student
                  </Typography>
                </div>
              </div>
              <div className="w-96">
                <TabsHeader>
                  {tabs.map(({ label, value, icon }) => (
                    <Tab key={value} value={value}>
                      <div className="flex items-center gap-2">
                        {icon}
                        {label}
                      </div>
                    </Tab>
                  ))}
                </TabsHeader>
              </div>
            </div>
            <TabsBody>
              {tabs.map(({ value, component }) => (
                <TabPanel key={value} value={value}>
                  {component}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>

        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
