import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { ProjectPage } from "./components/pages/ProjectPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={"projetos/:id"} element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
