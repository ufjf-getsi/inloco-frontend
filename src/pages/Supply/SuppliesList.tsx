import { useState } from "react";
import { Supply } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Supply/TableConfig";
import GenericListPage from "../../components/Generic/GenericPages/GenericListPage";
import { breadcrumpGroupItems } from "../../components/Supply/GenericSupply";
import GenericBreadcrumbGroup from "../../components/Generic/GerenicBreadcrumbGroup";

export default function SuppliesList() {
  const [suppliesArray, setSuppliesArray] = useState<Supply[]>([]);
  const [selectedSupplies, setSelectedSupplies] = useState([]);

  return (
    <GenericListPage
      title={`InLoco`}
      description={`InLoco é seu sistema de gerenciamento de informações sobre Limnologia.`}
      navbarActiveLink={`/supplies`}
      allRecords={suppliesArray}
      setRecords={setSuppliesArray}
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
