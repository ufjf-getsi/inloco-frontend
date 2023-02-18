import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../Generic/GenericTable/CommonTableFunctions";

interface Item {
  id: string;
  name: string;
}

export const visibleContent = ["name"];

export const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item: Item) => (
      <Link href={`#${item.id}`}>
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
      <Link href={`equipment/${item.id}`}>
        <span className="font-bold">{item.name}</span>
      </Link>
    ),
    ariaLabel: createLabelFunction("Nome"),
    sortingField: "name",
  },
];
