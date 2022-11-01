import { Project, ProjectProps } from "./Project";

interface ProjectsTableProps {
  projects: Array<ProjectProps>;
}

export function ProjectsTable(props: ProjectsTableProps) {
  const tableRowsList = props.projects.map((project) => {
    return (
      <Project
        key={project.id}
        id={project.id}
        title={project.title}
        description={project.description}
      />
    );
  });

  return (
    <table className="w-11/12 my-10 text-center">
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
