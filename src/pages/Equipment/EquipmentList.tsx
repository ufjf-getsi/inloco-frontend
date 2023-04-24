import { useEffect, useState } from "react";
import { Equipment, Supply } from "../../types";

import {
  columnDefinitions as columnDefinitionsEquipment,
  visibleContent as visibleContentEquipment,
} from "../../components/Equipment/TableConfig";
import GenericListPage from "../../generic/GenericPages/GenericListPage";
import { breadcrumpGroupItems } from "../../components/Equipment/GenericEquipment";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";
import GenericTable, {
  GenericTableProps,
} from "../../generic/GenericTable/GenericTable";
import {
  columnDefinitions as columnDefinitionsSupplies,
  visibleContent as visibleContentSupplies,
} from "../../components/Supply/TableConfig";
import axios from "axios";

export default function EquipmentList() {
  const [equipmentArray, setEquipmentArray] = useState<Equipment[]>([]);
  const [selectedEquipmentList, setSelectedEquipmentList] = useState([]);

  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [selectedSupplies, setSelectedSupplies] = useState([]);

  useEffect(() => {
    fetchTableData();
  }, []);

  function fetchTableData() {
    axios(`${import.meta.env.VITE_SERVER_URL}/supplies`).then((response) => {
      setSupplies(response.data);
    });
  }

  const tableConfigSupplies: GenericTableProps = {
    allRecords: supplies,
    columnDefinitions: columnDefinitionsSupplies,
    recordCategorySingular: `suprimento`,
    recordCategoryPlural: `suprimentos`,
    recordGenderFeminine: false,
    addRecordLink: `/equipment/createSupply`,
    visibleContent: visibleContentSupplies,
    setSelectedRecords: setSelectedSupplies,
  };

  return (
    <GenericListPage
      title={`InLoco`}
      description={`InLoco é seu sistema de gerenciamento de informações sobre Limnologia.`}
      navbarActiveLink={`/equipment`}
      allRecords={equipmentArray}
      setRecords={setEquipmentArray}
      fetchRecordsLink={`/equipment`}
      columnDefinitions={columnDefinitionsEquipment}
      recordCategorySingular={`equipamento`}
      recordCategoryPlural={`equipamentos`}
      recordGenderFeminine={false}
      addRecordLink={`/equipment/create`}
      visibleContent={visibleContentEquipment}
      setSelectedRecords={setSelectedEquipmentList}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({ pageType: "list" })}
        />
      }
    >
      <div style={{ marginTop: "15vh" }}>
        <GenericTable {...tableConfigSupplies} />
      </div>{" "}
    </GenericListPage>
  );
}
