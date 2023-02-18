import axios from "axios";
import { useEffect, useState } from "react";
import { Parameter } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Parameter/TableConfig";
import GenericListPage from "../../components/Generic/GenericPages/GenericListPage";

export function ParametersList() {
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [selectedParameters, setSelectedParameters] = useState([]);

  return (
    <GenericListPage
      title={`InLoco`}
      description={`InLoco é seu sistema de gerenciamento de informações sobre Limnologia.`}
      navbarActiveLink={`/parameters`}
      allRecords={parameters}
      setRecords={setParameters}
      fetchRecordsLink={`http://localhost:3333/parameters`}
      columnDefinitions={columnDefinitions}
      recordNameSingular={`parâmetro`}
      recordNamePlural={`parâmetros`}
      addRecordLink={`parameters/create`}
      visibleContent={visibleContent}
      setSelectedRegistries={setSelectedParameters}
      breadcrumbs={
        <BreadcrumbGroup
          items={[{ text: "Parâmetros", href: "#" }]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
