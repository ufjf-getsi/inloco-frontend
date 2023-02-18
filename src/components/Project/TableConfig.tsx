import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "./../GenericTable/CommonTableFunctions";

interface Item {
  id: string;
  title: string;
  description: string;
}

export const visibleContent = ["title", "description"];

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
    id: "title",
    header: "Título",
    cell: (item: Item) => (
      <Link href={`projects/${item.id}`}>
        <span className="font-bold">{item.title}</span>
      </Link>
    ),
    ariaLabel: createLabelFunction("Título"),
    sortingField: "title",
  },
  {
    id: "description",
    header: "Descrição",
    cell: (item: Item) => item.description,
    ariaLabel: createLabelFunction("Descrição"),
    sortingField: "description",
  },
];
