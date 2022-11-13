interface ArticleProps {
  children?: React.ReactNode;
}

export function Article(props: ArticleProps) {
  return (
    <article className="max-w-[1344px] mx-auto flex flex-col items-center mb-10 font-inter">
      {props.children}
    </article>
  );
}
