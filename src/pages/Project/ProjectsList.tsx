import { useState } from "react";
import { Project } from "../../types";

import {
  columnDefinitions,
  visibleContent,
} from "../../components/Project/TableConfig";
import GenericListPage from "../../components/Generic/GenericPages/GenericListPage";
import { breadcrumpGroupItems } from "../../components/Project/GenericProject";
import GenericBreadcrumbGroup from "../../components/Generic/GerenicBreadcrumbGroup";

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjects, setSelectedProjects] = useState([]);

  return (
    <GenericListPage
      title={`InLoco`}
      description={`InLoco é seu sistema de gerenciamento de informações sobre Limnologia.`}
      navbarActiveLink={`/projects`}
      allRecords={projects}
      setRecords={setProjects}
      fetchRecordsLink={`${import.meta.env.VITE_SERVER_URL}/projects`}
      columnDefinitions={columnDefinitions}
      recordCategorySingular={`projeto`}
      recordCategoryPlural={`projetos`}
      recordGenderFeminine={false}
      addRecordLink={`projects/create`}
      visibleContent={visibleContent}
      setSelectedRecords={setSelectedProjects}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({ pageType: "list" })}
        />
      }
    />
  );
}
