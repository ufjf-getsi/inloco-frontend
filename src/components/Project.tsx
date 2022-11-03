import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ProjectPage } from "./pages/ProjectPage";

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
}

export function Project(props: ProjectProps) {
  return (
    <BrowserRouter>
      <tr>
        <td className="font-bold">
          <Link to={"/projetos/" + props.id}>{props.title}</Link>
          <Routes>
            <Route path={"/projetos/" + props.id} element={<ProjectPage />} />
          </Routes>
        </td>
        <td>{props.description}</td>
      </tr>
    </BrowserRouter>
  );
}
