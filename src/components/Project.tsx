interface ProjectProps {
  title: string;
  description: string;
}

export function Project(props: ProjectProps) {
  return (
    <div>
      <a href="" className="font-bold block mt-5">
        {props.title}
      </a>
      <span className="block">{props.description}</span>
    </div>
  );
}
