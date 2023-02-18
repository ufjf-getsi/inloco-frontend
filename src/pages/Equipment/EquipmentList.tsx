import axios from "axios";
import { useEffect, useState } from "react";
import { Equipment } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Equipment/TableConfig";
import GenericListPage from "../../components/GenericPages/GenericListPage";

export function EquipmentList() {
  const [equipmentArray, setEquipmentArray] = useState<Equipment[]>([]);
  const [selectedEquipmentList, setSelectedEquipmentList] = useState([]);

  function fetchTableData() {
    axios("http://localhost:3333/equipment").then((response) => {
      setEquipmentArray(response.data);
    });
  }
  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <GenericListPage
      title={`InLoco`}
      description={`InLoco é seu sistema de gerenciamento de informações sobre Limnologia.`}
      navbarActiveLink={`/equipment`}
      allItems={equipmentArray}
      columnDefinitions={columnDefinitions}
      registryNameSingular={`equipamento`}
      registryNamePlural={`equipamentos`}
      addRegistryLink={`equipment/create`}
      visibleContent={visibleContent}
      setSelectedRegistries={setSelectedEquipmentList}
      breadcrumbs={
        <BreadcrumbGroup
          items={[{ text: "Equipamentos", href: "#" }]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
