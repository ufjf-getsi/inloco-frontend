import { useState } from "react";
import { Equipment } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Equipment/TableConfig";
import GenericListPage from "../../components/Generic/GenericPages/GenericListPage";
import { breadcrumpGroupItems } from "../../components/Equipment/GenericEquipment";
import GenericBreadcrumbGroup from "../../components/Generic/GerenicBreadcrumbGroup";

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
      fetchRecordsLink={`${import.meta.env.VITE_SERVER_URL}/equipment`}
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
