import axios from "axios";
import { useEffect, useState } from "react";
import { Parameter } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Parameter/TableConfig";
import GenericListPage from "../../components/GenericPages/GenericListPage";

export function ParametersList() {
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [selectedParameters, setSelectedParameters] = useState([]);

  function fetchTableData() {
    axios("http://localhost:3333/parameters").then((response) => {
      setParameters(response.data);
    });
  }
  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <GenericListPage
      title={`InLoco`}
      description={`InLoco é seu sistema de gerenciamento de informações sobre Limnologia.`}
      navbarActiveLink={`/parameters`}
      allItems={parameters}
      columnDefinitions={columnDefinitions}
      registryNameSingular={`parâmetro`}
      registryNamePlural={`parâmetros`}
      addRegistryLink={`parameters/create`}
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
