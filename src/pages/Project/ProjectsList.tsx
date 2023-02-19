import { useState } from "react";
import { Project } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Project/TableConfig";
import GenericListPage from "../../components/Generic/GenericPages/GenericListPage";

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjects, setSelectedProjects] = useState([]);

  return (
    <GenericListPage
      title={`InLoco`}
      description={`InLoco é seu sistema de gerenciamento de informações sobre Limnologia.`}
      navbarActiveLink={`/projects`}
      allRecords={projects}
      setRecords={setProjects}
      fetchRecordsLink={`http://localhost:3333/projects`}
      columnDefinitions={columnDefinitions}
      recordNameSingular={`projeto`}
      recordNamePlural={`projetos`}
      addRecordLink={`projects/create`}
      visibleContent={visibleContent}
      setSelectedRecords={setSelectedProjects}
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
