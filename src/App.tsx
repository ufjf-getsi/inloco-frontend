import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProjectPage } from "./pages/ProjectPage";
import { CreateProject } from "./pages/CreateProject";

import "@cloudscape-design/global-styles/index.css";
import "./styles/main.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={"projects/:id"} element={<ProjectPage />} />
        <Route path={"projects/"} element={<CreateProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
