import { Link } from "react-router-dom";

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
}

export function Project(props: ProjectProps) {
  return (
        <tr>
          <td className="font-bold">
            <Link to={"/projetos/" + props.id}>{props.title}</Link>
          </td>
          <td>{props.description}</td>
        </tr>
  );
}
