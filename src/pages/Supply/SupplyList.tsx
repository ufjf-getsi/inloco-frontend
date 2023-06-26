import { useState } from "react";
import { Supply } from "../../types";

import {
  columnDefinitions,
  visibleContent,
} from "../../components/Supply/TableConfig";
import GenericListPage from "../../generic/GenericPages/GenericListPage";
import { breadcrumpGroupItems } from "../../components/Supply/GenericSupply";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";

export default function SupplyList() {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [selectedSupplies, setSelectedSupplies] = useState([]);

  return (
    <GenericListPage
      title={`InLoco`}
      description={`InLoco é seu sistema de gerenciamento de informações sobre Limnologia.`}
      navbarActiveLink={`/supplies`}
      allRecords={supplies}
      setRecords={setSupplies}
      fetchRecordsLink={`/supplies`}
      columnDefinitions={columnDefinitions}
      recordCategorySingular={`suprimento`}
      recordCategoryPlural={`suprimentos`}
      recordGenderFeminine={false}
      addRecordLink={`/supplies/create`}
      visibleContent={visibleContent}
      setSelectedRecords={setSelectedSupplies}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({ pageType: "list" })}
        />
      }
    />
  );
}
