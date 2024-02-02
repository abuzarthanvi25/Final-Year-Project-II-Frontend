import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import Notes from "@/pages/dashboard/courses/id";
import NoteEditor from "@/pages/dashboard/notes/note-editor";
import CreateNote from "@/components/notes/create-note";
import NoteDetails from "../pages/dashboard/notes/id";
import { useSelector } from "react-redux";
import { useState } from "react";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar setCurrentUser={setCurrentUser} />
        <Configurator />
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}

          <Route exact path={'/courses/:id'} element={<Notes/>} />
          <Route exact path={'/group-courses/:id'} element={<Notes/>} />
          <Route path={'/notes/edit/:id'} element={<NoteEditor currentUser={currentUser} courseType={"Personal"}/>} />
          <Route path={'/group-notes/edit/:id'} element={<NoteEditor currentUser={currentUser} courseType={"Group"}/>} />
          <Route path={'/notes/create-note'} element={<CreateNote/>} />
        </Routes>
        {/* <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
