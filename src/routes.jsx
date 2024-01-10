import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "Home",
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      }
    ],
  },
  {
    title: 'Profile',
    layout: 'dashboard',
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ]
  },
  {
    title: 'Study Material',
    layout: 'dashboard',
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Notes",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Images",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Summaries",
        path: "/profile",
        element: <Profile />,
      },
    ]
  },
  {
    title: 'Collaboration',
    layout: 'dashboard',
    pages: [
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Group Projects",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Chats",
        path: "/notifications",
        element: <Notifications />,
      },
    ]
  },
];

export default routes;
