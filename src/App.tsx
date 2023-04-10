import { Routes, Route, Navigate } from "react-router-dom";
import ProjectsList from "./pages/Project/ProjectsList";
import ViewProject from "./pages/Project/ViewProject";
import ViewCollection from "./pages/Collection/ViewCollection";
import ParametersList from "./pages/Parameter/ParametersList";
import CreateParameter from "./pages/Parameter/CreateParameter";
import EditParameter from "./pages/Parameter/EditParameter";
import ViewParameter from "./pages/Parameter/ViewParameter";
import EquipmentList from "./pages/Equipment/EquipmentList";
import CreateEquipment from "./pages/Equipment/CreateEquipment";
import EditEquipment from "./pages/Equipment/EditEquipment";
import ViewEquipment from "./pages/Equipment/ViewEquipment";
import ViewTask from "./pages/Task/ViewTask";
import ViewPoint from "./pages/Point/ViewPoint";
import PageNotFound from "./pages/PageNotFound";
import CreateEditProject from "./pages/Project/CreateEditProject";
import CreateEditCollection from "./pages/Collection/CreateEditCollection";
import CreateEditPoint from "./pages/Point/CreateEditPoint";
import CreateEditTask from "./pages/Task/CreateEditTask";

import "@cloudscape-design/global-styles/index.css";
import "./styles/main.css";

function App() {
  return (
    <Routes>
      {/* Project */}
      <Route index element={<Navigate to="/projects" />} />
      <Route path={"/projects"} element={<ProjectsList />} />
      <Route
        path={"/projects/create"}
        element={<CreateEditProject edit={false} />}
      />
      <Route path={"/projects/:id"} element={<ViewProject />} />
      <Route
        path={"/projects/:id/edit"}
        element={<CreateEditProject edit={true} />}
      />
      {/* Project -> Collection */}
      <Route
        path={"/projects/:projectId/createCollection"}
        element={<CreateEditCollection edit={false} />}
      />
      <Route path={"/collections/:id"} element={<ViewCollection />} />
      <Route
        path={"/collections/:id/edit"}
        element={<CreateEditCollection edit={true} />}
      />
      {/* Project -> Collection -> Point */}
      <Route
        path={"/collections/:collectionId/createPoint"}
        element={<CreateEditPoint edit={false} />}
      />
      <Route path={"/points/:id"} element={<ViewPoint />} />
      <Route
        path={"/points/:id/edit"}
        element={<CreateEditPoint edit={true} />}
      />
      {/* Project -> Collection -> Task */}
      <Route
        path={"/collections/:collectionId/createTask"}
        element={<CreateEditTask edit={false} />}
      />
      <Route path={"/tasks/:id"} element={<ViewTask />} />
      <Route
        path={"/tasks/:id/edit"}
        element={<CreateEditTask edit={true} />}
      />
      {/* Parameter */}
      <Route path={"/parameters"} element={<ParametersList />} />
      <Route path={"/parameters/create"} element={<CreateParameter />} />
      <Route path={"/parameters/:id"} element={<ViewParameter />} />
      <Route path={"/parameters/:id/edit"} element={<EditParameter />} />
      {/* Equipment */}
      <Route path={"/equipment"} element={<EquipmentList />} />
      <Route path={"/equipment/create"} element={<CreateEquipment />} />
      <Route path={"/equipment/:id"} element={<ViewEquipment />} />
      <Route path={"/equipment/:id/edit"} element={<EditEquipment />} />
      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
