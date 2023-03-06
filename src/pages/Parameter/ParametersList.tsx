import { useState } from "react";
import { Parameter } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Parameter/TableConfig";
import GenericListPage from "../../components/Generic/GenericPages/GenericListPage";
import { breadcrumpGroupItems } from "../../components/Parameter/GenericParameter";
import GenericBreadcrumbGroup from "../../components/Generic/GerenicBreadcrumbGroup";

export default function ParametersList() {
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [selectedParameters, setSelectedParameters] = useState([]);

  return (
    <GenericListPage
      title={`InLoco`}
      description={`InLoco é seu sistema de gerenciamento de informações sobre Limnologia.`}
      navbarActiveLink={`/parameters`}
      allRecords={parameters}
      setRecords={setParameters}
      fetchRecordsLink={`${import.meta.env.VITE_SERVER_URL}/parameters`}
      columnDefinitions={columnDefinitions}
      recordCategorySingular={`parâmetro`}
      recordCategoryPlural={`parâmetros`}
      recordGenderFeminine={false}
      addRecordLink={`parameters/create`}
      visibleContent={visibleContent}
      setSelectedRecords={setSelectedParameters}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({ pageType: "list" })}
        />
      }
    />
  );
}
