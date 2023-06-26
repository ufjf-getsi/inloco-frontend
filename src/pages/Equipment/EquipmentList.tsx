import { useState } from "react";
import { Equipment } from "../../types";

import {
  columnDefinitions,
  visibleContent,
} from "../../components/Equipment/TableConfig";
import GenericListPage from "../../generic/GenericPages/GenericListPage";
import { breadcrumpGroupItems } from "../../components/Equipment/GenericEquipment";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";

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
      fetchRecordsLink={`/equipment`}
      columnDefinitions={columnDefinitions}
      recordCategorySingular={`equipamento`}
      recordCategoryPlural={`equipamentos`}
      recordGenderFeminine={false}
      addRecordLink={`/equipment/create`}
      visibleContent={visibleContent}
      setSelectedRecords={setSelectedEquipmentList}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({ pageType: "list" })}
        />
      }
    />
  );
}
