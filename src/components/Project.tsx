export interface ProjectProps {
  id: string;
  title: string;
  description: string;
}

export function Project(props: ProjectProps) {
  return (
    <tr>
      <td className="font-bold">
        <a href="">{props.title}</a>
      </td>
      <td>{props.description}</td>
    </tr>
  );
}
