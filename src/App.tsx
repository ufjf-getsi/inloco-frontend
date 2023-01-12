import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProjectsList } from "./pages/Project/ProjectsList";
import { ViewProject } from "./pages/Project/ViewProject";
import { CreateProject } from "./pages/Project/CreateProject";
import { CreateCollection } from "./pages/Collection/CreateCollection";
import { EditProject } from "./pages/Project/EditProject";
import { ViewCollection } from "./pages/Collection/ViewCollection";
import { EditCollection } from "./pages/Collection/EditCollection";
import { ParametersList } from "./pages/Parameter/ParametersList";
import { CreateParameter } from "./pages/Parameter/CreateParameter";
import { EditParameter } from "./pages/Parameter/EditParameter";

import "@cloudscape-design/global-styles/index.css";
import "./styles/main.css";
import { ViewParameter } from "./pages/Parameter/ViewParameter";
import { EquipmentList } from "./pages/Equipment/EquipmentList";
import { CreateEquipment } from "./pages/Equipment/CreateEquipment";
import { EditEquipment } from "./pages/Equipment/EditEquipment";
import { ViewEquipment } from "./pages/Equipment/ViewEquipment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="projects" />} />
        <Route path={"projects"} element={<ProjectsList />} />
        <Route path={"projects/create"} element={<CreateProject />} />
        <Route path={"projects/:id"} element={<ViewProject />} />
        <Route path={"projects/:id/edit"} element={<EditProject />} />
        <Route
          path={"projects/:projectId/collections"}
          element={<CreateCollection />}
        />
        <Route path={"/collections/:id"} element={<ViewCollection />} />
        <Route path={"/collections/:id/edit"} element={<EditCollection />} />

        <Route path={"/parameters"} element={<ParametersList />} />
        <Route path={"parameters/create"} element={<CreateParameter />} />
        <Route path={"parameters/:id"} element={<ViewParameter />} />
        <Route path={"parameters/:id/edit"} element={<EditParameter />} />

        <Route path={"/equipment"} element={<EquipmentList />} />
        <Route path={"equipment/create"} element={<CreateEquipment />} />
        <Route path={"equipment/:id"} element={<ViewEquipment />} />
        <Route path={"equipment/:id/edit"} element={<EditEquipment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
