import { Project } from "../../types";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface ProjectsTableProps {
  projects: Array<Project>;
}

interface ProjectRowProps {
  project: Project;
}

function ProjectRow(props: ProjectRowProps) {
  const navigate = useNavigate();
  const handleClick = useCallback(
    (id: string) => navigate("/projects/" + id, { replace: true }),
    [navigate]
  );

  return (
    <tr onClick={() => handleClick(props.project.id)}>
      <td className="font-bold">{props.project.title}</td>
      <td>{props.project.description}</td>
    </tr>
  );
}

export function ProjectsTable(props: ProjectsTableProps) {
  const tableRowsList = props.projects.map((project) => {
    return <ProjectRow key={project.id} project={project} />;
  });

  return (
    <table className="w-11/12 my-10 text-center m-auto">
      <thead>
        <tr>
          <th className="text-xl" scope="col">
            Título
          </th>
          <th className="text-xl" scope="col">
            Descrição
          </th>
        </tr>
      </thead>
      <tbody>{tableRowsList}</tbody>
    </table>
  );
}
