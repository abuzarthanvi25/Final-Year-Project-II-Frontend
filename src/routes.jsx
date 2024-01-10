import {
  HomeIcon,
  UserCircleIcon,
  FolderIcon,
  UserGroupIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Courses, GroupProjects, Chats } from "@/pages/dashboard";

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
    ]
  },
  {
    title: 'Study Material',
    layout: 'dashboard',
    pages: [
      {
        icon: <FolderIcon {...icon} />,
        name: "Courses",
        path: "/courses",
        element: <Courses />,
      },
    ]
  },
  {
    title: 'Collaboration',
    layout: 'dashboard',
    pages: [
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Group Projects",
        path: "/group-projects",
        element: <GroupProjects />,
      },
      {
        icon: <ChatBubbleLeftEllipsisIcon {...icon} />,
        name: "Chats",
        path: "/chats",
        element: <Chats />,
      },
    ]
  },
];

export default routes;
