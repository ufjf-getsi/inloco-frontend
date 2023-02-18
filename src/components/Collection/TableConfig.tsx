import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "./../GenericTable/CommonTableFunctions";

interface Item {
  id: string;
  title: string;
}

export const visibleContent = ["title"];

export const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item: Item) => (
      <Link href={`/collections/${item.id}`}>
        {" "}
        <span className="font-bold">{item.id}</span>
      </Link>
    ),
    ariaLabel: createLabelFunction("id"),
    sortingField: "id",
  },
  {
    id: "title",
    header: "Título",
    cell: (item: Item) => (
      <Link href={`/collections/${item.id}`}>
        <span className="font-bold">{item.title}</span>
      </Link>
    ),
    ariaLabel: createLabelFunction("Título"),
    sortingField: "title",
  },
];
