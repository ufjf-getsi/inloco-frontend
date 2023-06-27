import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Equipment } from "../../types";

import {
  columnDefinitions,
  visibleContent,
} from "../../components/Equipment/TableConfig";
import GenericListPage from "../../generic/pages/GenericListPage";
import { breadcrumpGroupItems } from "../../components/Equipment/GenericEquipment";
import GenericBreadcrumbGroup from "../../generic/components/GerenicBreadcrumbGroup";

export default function EquipmentList() {
  const navigate = useNavigate();

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
      navigate={navigate}
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
