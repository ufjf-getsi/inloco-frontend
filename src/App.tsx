import { Routes, Route, Navigate } from "react-router-dom";
import ProjectsList from "./pages/Project/ProjectsList";
import ViewProject from "./pages/Project/ViewProject";
import CreateProject from "./pages/Project/CreateProject";
import CreateCollection from "./pages/Collection/CreateCollection";
import EditProject from "./pages/Project/EditProject";
import ViewCollection from "./pages/Collection/ViewCollection";
import EditCollection from "./pages/Collection/EditCollection";
import ParametersList from "./pages/Parameter/ParametersList";
import CreateParameter from "./pages/Parameter/CreateParameter";
import EditParameter from "./pages/Parameter/EditParameter";
import ViewParameter from "./pages/Parameter/ViewParameter";
import EquipmentList from "./pages/Equipment/EquipmentList";
import CreateEquipment from "./pages/Equipment/CreateEquipment";
import EditEquipment from "./pages/Equipment/EditEquipment";
import ViewEquipment from "./pages/Equipment/ViewEquipment";
import CreateTask from "./pages/Task/CreateTask";
import EditTask from "./pages/Task/EditTask";
import ViewTask from "./pages/Task/ViewTask";
import ViewPoint from "./pages/Point/ViewPoint";
import CreatePoint from "./pages/Point/CreatePoint";
import EditPoint from "./pages/Point/EditPoint";
import PageNotFound from "./pages/PageNotFound";

import "@cloudscape-design/global-styles/index.css";
import "./styles/main.css";
import SuppliesList from "./pages/Supply/SuppliesList";
import CreateSupply from "./pages/Supply/CreateSupply";
import ViewSupply from "./pages/Supply/ViewSupply";
import EditSupply from "./pages/Supply/EditSupply";

function App() {
  return (
    <Routes>
      {/* Project */}
      <Route index element={<Navigate to="/projects" />} />
      <Route path={"/projects"} element={<ProjectsList />} />
      <Route path={"/projects/create"} element={<CreateProject />} />
      <Route path={"/projects/:id"} element={<ViewProject />} />
      <Route path={"/projects/:id/edit"} element={<EditProject />} />
      {/* Project -> Collection */}
      <Route
        path={"/projects/:projectId/createCollection"}
        element={<CreateCollection />}
      />
      <Route path={"/collections/:id"} element={<ViewCollection />} />
      <Route path={"/collections/:id/edit"} element={<EditCollection />} />
      {/* Project -> Collection -> Point */}
      <Route
        path={"/collections/:collectionId/createPoint"}
        element={<CreatePoint />}
      />
      <Route path={"/points/:id"} element={<ViewPoint />} />
      <Route path={"/points/:id/edit"} element={<EditPoint />} />
      {/* Project -> Collection -> Task */}
      <Route
        path={"/collections/:collectionId/createTask"}
        element={<CreateTask />}
      />
      <Route path={"/tasks/:id"} element={<ViewTask />} />
      <Route path={"/tasks/:id/edit"} element={<EditTask />} />
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
      {/* Supply */}
      <Route path={"/supplies"} element={<SuppliesList />} />
      <Route path={"/supplies/create"} element={<CreateSupply />} />
      <Route path={"/supplies/:id"} element={<ViewSupply />} />
      <Route path={"/supplies/:id/edit"} element={<EditSupply />} />

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
