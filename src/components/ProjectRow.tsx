import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Project } from "../types";

interface ProjectRowProps {
  project: Project;
}

export function ProjectRow(props: ProjectRowProps) {
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
