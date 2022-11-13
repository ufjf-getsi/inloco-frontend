import { ProjectRow } from "./ProjectRow";

import { Project } from "../types";

interface ProjectsTableProps {
  projects: Array<Project>;
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
