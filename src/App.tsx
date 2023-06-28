import { Routes, Route, Navigate } from "react-router-dom";
import "@cloudscape-design/global-styles/index.css";
import "./styles/main.css";
import ProjectsList from "./pages/Project/ProjectsList";
import ParametersList from "./pages/Parameter/ParametersList";
import EquipmentList from "./pages/Equipment/EquipmentList";
import SupplyList from "./pages/Supply/SupplyList";
import ViewProject from "./pages/Project/ViewProject";
import ViewPoint from "./pages/Point/ViewPoint";
import ViewCollection from "./pages/Collection/ViewCollection";
import ViewVisitPoint from "./pages/VisitPoint/ViewVisitPoint";
import ViewTask from "./pages/Task/ViewTask";
import ViewParameter from "./pages/Parameter/ViewParameter";
import ViewEquipment from "./pages/Equipment/ViewEquipment";
import ViewSupply from "./pages/Supply/ViewSupply";
import PageNotFound from "./pages/PageNotFound";
import CreateEditProject from "./pages/Project/CreateEditProject";
import CreateEditCollection from "./pages/Collection/CreateEditCollection";
import CreateEditPoint from "./pages/Point/CreateEditPoint";
import CreateEditVisitPoint from "./pages/VisitPoint/CreateEditVisitPoint";
import CreateEditTask from "./pages/Task/CreateEditTask";
import CreateEditParameter from "./pages/Parameter/CreateEditParameter";
import CreateEditEquipment from "./pages/Equipment/CreateEditEquipment";
import CreateEditSupply from "./pages/Supply/CreateEditSupply";
import ReorderPoints from "./pages/Point/ReorderPoints";
import ReorderTasks from "./pages/Task/ReorderTasks";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <Routes>
      {/* Project */}
      <Route index element={<Navigate to="/login" />} />
      <Route path={"/login"} element={<LoginPage edit={false} />} />

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
      {/* Project -> Point */}
      <Route
        path={"/projects/:projectId/create-point"}
        element={<CreateEditPoint edit={false} />}
      />
      <Route path={"/points/:id"} element={<ViewPoint />} />
      <Route
        path={"/points/:id/edit"}
        element={<CreateEditPoint edit={true} />}
      />
      {/* Project -> Collection */}
      <Route
        path={"/projects/:projectId/create-collection"}
        element={<CreateEditCollection edit={false} />}
      />
      <Route path={"/collections/:id"} element={<ViewCollection />} />
      <Route
        path={"/collections/:id/edit"}
        element={<CreateEditCollection edit={true} />}
      />
      {/* Project -> Collection -> VisitPoint */}
      <Route
        path={"/collections/:collectionId/create-visit-point"}
        element={<CreateEditVisitPoint edit={false} />}
      />
      <Route path={"/visit-point/:id"} element={<ViewVisitPoint />} />
      <Route
        path={"/visit-point/:id/edit"}
        element={<CreateEditVisitPoint edit={true} />}
      />
      <Route
        path={"/collections/:collectionId/reorder-points"}
        element={<ReorderPoints />}
      />
      {/* Project -> Collection -> Task */}
      <Route
        path={"/collections/:collectionId/create-task"}
        element={<CreateEditTask edit={false} />}
      />
      <Route path={"/tasks/:id"} element={<ViewTask />} />
      <Route
        path={"/tasks/:id/edit"}
        element={<CreateEditTask edit={true} />}
      />
      <Route
        path={"/collections/:collectionId/reorder-tasks"}
        element={<ReorderTasks />}
      />
      {/* Parameter */}
      <Route path={"/parameters"} element={<ParametersList />} />
      <Route
        path={"/parameters/create"}
        element={<CreateEditParameter edit={false} />}
      />
      <Route path={"/parameters/:id"} element={<ViewParameter />} />
      <Route
        path={"/parameters/:id/edit"}
        element={<CreateEditParameter edit={true} />}
      />
      {/* Equipment */}
      <Route path={"/equipment"} element={<EquipmentList />} />
      <Route
        path={"/equipment/create"}
        element={<CreateEditEquipment edit={false} />}
      />
      <Route path={"/equipment/:id"} element={<ViewEquipment />} />
      <Route
        path={"/equipment/:id/edit"}
        element={<CreateEditEquipment edit={true} />}
      />
      {/* Supply */}
      <Route path={"/supplies"} element={<SupplyList />} />
      <Route
        path={"/supplies/create"}
        element={<CreateEditSupply edit={false} />}
      />
      <Route path={"/supplies/:id"} element={<ViewSupply />} />
      <Route
        path={"/supplies/:id/edit"}
        element={<CreateEditSupply edit={true} />}
      />
      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
