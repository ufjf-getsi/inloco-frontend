interface ProjectProps {
  title: string;
  description: string;
}

export function Project(props: ProjectProps) {
  return (
    <a href="" className="relative rounded-lg">
      <div className="w-full pt-16 pb-4 px-4 absolute bottom-0 left-0 right-0">
        <strong className="font-bold block">{props.title}</strong>
        <span className="block mt-1">{props.description}</span>
      </div>
    </a>
  );
}
