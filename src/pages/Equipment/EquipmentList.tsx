import { useState } from "react";
import { Equipment } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Equipment/TableConfig";
import GenericListPage from "../../components/Generic/GenericPages/GenericListPage";

export default function EquipmentList() {
  const [equipmentArray, setEquipmentArray] = useState<Equipment[]>([]);
  const [selectedEquipmentList, setSelectedEquipmentList] = useState([]);

  return (
    <GenericListPage
      title={`InLoco`}
      description={`InLoco é seu sistema de gerenciamento de informações sobre Limnologia.`}
      navbarActiveLink={`/equipment`}
      allRecords={equipmentArray}
      setRecords={setEquipmentArray}
      fetchRecordsLink={`http://localhost:3333/equipment`}
      columnDefinitions={columnDefinitions}
      recordCategorySingular={`equipamento`}
      recordCategoryPlural={`equipamentos`}
      recordGenderFeminine={false}
      addRecordLink={`equipment/create`}
      visibleContent={visibleContent}
      setSelectedRecords={setSelectedEquipmentList}
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
