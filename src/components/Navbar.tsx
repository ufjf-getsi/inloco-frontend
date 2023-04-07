import { useHref } from "react-router-dom";
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
      activeHref={useHref(activeHref)}
      header={{ href: useHref("/"), text: "InLoco" }}
      onFollow={(event) => {
        if (!event.detail.external) {
          setActiveHref(event.detail.href);
        }
      }}
      items={[
        {
          type: "link",
          text: "Projetos",
          href: useHref(`/projects`),
        },
        {
          type: "link",
          text: "Parâmetros",
          href: useHref(`/parameters`),
        },
        {
          type: "link",
          text: "Equipamentos",
          href: useHref(`/equipment`),
        },
        {
          type: "link",
          text: "Tarefas",
          href: useHref(`/tasks`),
        },
        { type: "divider" },
      ]}
    />
  );
}
