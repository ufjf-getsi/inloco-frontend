import { Link } from "react-router-dom";

interface NavbarProps {
  children?: React.ReactNode;
}

export function Navbar(props: NavbarProps) {
  return (
    <nav className="w-full flex pt-5 px-10 justify-between">
      <Link to="/">
        <h1 className="text-5xl text-red-800 font-bold">In Loco</h1>
      </Link>
      {props.children}
    </nav>
  );
}
