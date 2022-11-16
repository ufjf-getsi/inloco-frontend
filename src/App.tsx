import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ViewProject } from "./pages/Project/ViewProject";
import { CreateProject } from "./pages/Project/CreateProject";

import "@cloudscape-design/global-styles/index.css";
import "./styles/main.css";
import { EditProject } from "./pages/Project/EditProject";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={"projects/"} element={<CreateProject />} />
        <Route path={"projects/:id"} element={<ViewProject />} />
        <Route path={"projects/:id/edit"} element={<EditProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
