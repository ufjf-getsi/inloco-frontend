import { useState } from "react";
import SideNavigation from "@cloudscape-design/components/side-navigation";

interface NavbarProps {
  activeLink: string;
}

Navbar.defaultProps = {
  activeLink: "",
};

export default function Navbar(props: NavbarProps) {
  const [activeHref, setActiveHref] = useState(props.activeLink);
  return (
    <SideNavigation
      activeHref={activeHref}
      header={{ href: "/", text: "InLoco" }}
      onFollow={(event) => {
        if (!event.detail.external) {
          setActiveHref(event.detail.href);
        }
      }}
      items={[
        {
          type: "link",
          text: "Projetos",
          href: `${import.meta.env.VITE_BASE_URL_HASH}projects`,
        },
        {
          type: "link",
          text: "Parâmetros",
          href: `${import.meta.env.VITE_BASE_URL_HASH}parameters`,
        },
        {
          type: "link",
          text: "Equipamentos",
          href: `${import.meta.env.VITE_BASE_URL_HASH}equipment`,
        },
        {
          type: "link",
          text: "Tarefas",
          href: `${import.meta.env.VITE_BASE_URL_HASH}tasks`,
        },
        { type: "divider" },
      ]}
    />
  );
}
