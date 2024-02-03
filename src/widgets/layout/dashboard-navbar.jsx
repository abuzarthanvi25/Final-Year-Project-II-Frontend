import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  UserIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserRequest } from '../../store/reducers/auth-reducer'
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CustomModal from '@/components/modals';
import { useEffect, useState } from 'react';
import SearchUsers from '@/components/search-users';
import { addFriendRequest, getProfileDetailsRequest, searchUsersRequeast } from '@/store/reducers/user-reducer';
import { unwrapResult } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { showSuccessToast } from '@/utils/toast-helpers';
import { io } from "socket.io-client"
import CustomAvatar from "../../components/custom-avatar"
import useEffectOnce from "@/hooks/useEffectOnce";

export function DashboardNavbar({setCurrentUser}) {
  const [controller, dispatch] = useMaterialTailwindController();
  const textFieldStyles = {
    '& label.Mui-focused': {
      color: '#000',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#000',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#000',
      },
      '&:hover fieldset': {
        borderColor: '#000',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000',
      },
      },
}
  // change this state to profile details state ASAP BRO
  const { profileDetails } = useSelector(state => state.user)
  const { userDetails } = useSelector(state => state.auth)
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [open, setOpen] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketInstance, setSocketInstance] = useState(null)

  const token = get(userDetails, "token", null);
  const currentUser = get(userDetails, "user", null);
  const user_id = get(userDetails, "user._id", null);
  const currentFriends = get(profileDetails, "friends", []);
  const fullName = get(profileDetails, "full_name", '');
  const profile_picture = get(profileDetails, "profile_picture.url", '');

  useEffectOnce(() => {
    const socket = io(import.meta.env.VITE_FRONTEND_URL);

    socket.emit('set online', user_id)
    socket.emit('get online users')
    setSocketInstance(socket)

    const handleBeforeUnload = () => {
      socket.emit("disconnect room", user_id);
      socket.emit('get online users')
    };

    //NOTE - Handle logic for tab/window close event for online/offline status
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  })

  useEffect(() => {
    if(currentUser){
      setCurrentUser(currentUser)
    }
  }, [currentUser])

  const handleGetProfile = () => {
    try {
      if(token){
        setLoading(true);

        dispatcher(getProfileDetailsRequest({token}))
        .then(unwrapResult)
        .then(() => {
          setLoading(false)
        })
        .catch(err => {
          showFaliureToast(err?.response?.data?.message)
          setLoading(false)
        })

      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = () => {
    dispatcher(logoutUserRequest())
    .then(() => {
      if(socketInstance){
        socketInstance.emit("disconnect room", user_id)
        socketInstance.emit("get online users")
      }
      navigate("/")
    })
    .catch(err => console.log(err))
  }

  const handleSearchUsers = (searchQuery = '') => {
    try {
      if(!token) return

      setLoading(true)
      dispatcher(searchUsersRequeast({searchQuery, token}))
      .then(unwrapResult)
      .then((res) => {
        setLoading(false)
        setSearchedUsers(res?.data?.data?.users)
      })
      .catch(err => {
        setLoading(false);
        showFaliureToast(err?.response?.data?.message)
      })
    } catch (error) {
      console.log("error at handleSearchUsers",error)
    }
  }

  const handleAddFriend = (friend_id) => {
    try {
      if(!token) return

      setLoading(true)
      dispatcher(addFriendRequest({friend_id, token}))
      .then(unwrapResult)
      .then((res) => {
        setLoading(false);
        handleGetProfile();
        showSuccessToast(res?.data?.message)
      })
      .catch(err => {
        setLoading(false);
        showFaliureToast(err?.response?.data?.message)
      })
    } catch (error) {
      console.log("error at handleSearchUsers",error)
    }
  }

  const getIsAlreadyFriend = (id) => {
    if(!id || currentFriends.length == 0) return false;

    return currentFriends.some((friend) => friend?._id == id);
  }

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <CustomModal open={open} onClose={() => setOpen(!open)} heading={'Search Users'}>
          <SearchUsers isAlreadyFriend={getIsAlreadyFriend} handleAddFriend={handleAddFriend} loading={loading} handleSearch={handleSearchUsers} users={searchedUsers} />
        </CustomModal>
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}/home`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
        <div className="mr-auto md:mr-4 md:w-56">
            <TextField onClick={() => setOpen(true)} size='small' style={{cursor: 'pointer'}} 
            InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            }} sx={textFieldStyles} placeholder='Search Users' />
        </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          {/* <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu> */}
          <Menu animate={{mount: { y: 0 },unmount: { y: 25 }}} placement='right-start'>
            <MenuHandler>
              <button className="w-fit mx-3">
              <CustomAvatar
                  name={fullName}
                  isOnline={true}
                  src={profile_picture}
                  alt="userAvatar"
                  size="sm"
                  variant="circular"
                />
              </button>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src={profile_picture ?? "https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"}
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>{fullName ?? 'John Doe'}</strong>
                  </Typography>
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    Student
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem onClick={handleLogout} className='bg-black text-center font-bold text-white'>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
