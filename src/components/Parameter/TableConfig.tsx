import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../Generic/GenericTable/CommonTableFunctions";
import { formatDataType } from "./FormParameter";

interface Item {
  id: string;
  name: string;
  unit: string;
  dataType: string;
}

export const visibleContent = ["name", "unit", "dataType"];

export const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item: Item) => (
      <Link href={`parameters/${item.id}`}>
        <span className="font-bold">{item.id}</span>
      </Link>
    ),
    ariaLabel: createLabelFunction("id"),
    sortingField: "id",
  },
  {
    id: "name",
    header: "Nome",
    cell: (item: Item) => (
      <Link href={`parameters/${item.id}`}>
        <span className="font-bold">{item.name}</span>
      </Link>
    ),
    ariaLabel: createLabelFunction("Nome"),
    sortingField: "name",
  },
  {
    id: "unit",
    header: "Unidade",
    cell: (item: Item) => item.unit,
    ariaLabel: createLabelFunction("Unidade"),
    sortingField: "unit",
  },
  {
    id: "dataType",
    header: "Tipo",
    cell: (item: Item) => formatDataType(item.dataType),
    ariaLabel: createLabelFunction("Tipo"),
    sortingField: "dataType",
  },
];
