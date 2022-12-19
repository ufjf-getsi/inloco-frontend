import * as React from "react";
import SideNavigation from "@cloudscape-design/components/side-navigation";

interface NavbarProps {
  activeLink: string;
}

Navbar.defaultProps = {
  activeLink: "",
};

export function Navbar(props: NavbarProps) {
  const [activeHref, setActiveHref] = React.useState(props.activeLink);
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
        { type: "link", text: "Projetos", href: "/projects" },
        { type: "link", text: "Medições", href: "/measurements" },
        { type: "link", text: "Parâmetros", href: "/parameters" },
        { type: "link", text: "Equipamento", href: "/equipment" },
        { type: "divider" },
      ]}
    />
  );
}
