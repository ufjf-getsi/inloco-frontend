import { useState } from "react";
import { Parameter } from "../../types";

import {
  columnDefinitions,
  visibleContent,
} from "../../components/Parameter/TableConfig";
import GenericListPage from "../../generic/GenericPages/GenericListPage";
import { breadcrumpGroupItems } from "../../components/Parameter/GenericParameter";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";

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
      fetchRecordsLink={`/parameters`}
      columnDefinitions={columnDefinitions}
      recordCategorySingular={`parâmetro`}
      recordCategoryPlural={`parâmetros`}
      recordGenderFeminine={false}
      addRecordLink={`/parameters/create`}
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
