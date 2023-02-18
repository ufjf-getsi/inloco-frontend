import axios from "axios";
import { useEffect, useState } from "react";
import { Project } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Project/TableConfig";
import GenericListPage from "../../components/GenericPages/GenericListPage";

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjects, setSelectedProjects] = useState([]);

  function fetchTableData() {
    axios("http://localhost:3333/projects").then((response) => {
      setProjects(response.data);
    });
  }
  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <GenericListPage
      title={`InLoco`}
      description={`InLoco é seu sistema de gerenciamento de informações sobre Limnologia.`}
      navbarActiveLink={`/projects`}
      allItems={projects}
      columnDefinitions={columnDefinitions}
      registryNameSingular={`projeto`}
      registryNamePlural={`projetos`}
      addRegistryLink={`projects/create`}
      visibleContent={visibleContent}
      setSelectedRegistries={setSelectedProjects}
      breadcrumbs={
        <BreadcrumbGroup
          items={[{ text: "Projetos", href: "#" }]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
