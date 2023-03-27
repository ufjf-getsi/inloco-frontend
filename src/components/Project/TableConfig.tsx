import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../Generic/GenericTable/CommonTableFunctions";

interface Item {
  id: string;
  title: string;
  description: string;
}

export const visibleContent = ["title", "description"];

const recordViewPageLink = (item: Item) =>
  `${import.meta.env.VITE_BASE_URL_HASH}projects/${item.id}`;

export const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item: Item) => (
      <Link href={recordViewPageLink(item)}>
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
      <Link href={recordViewPageLink(item)}>
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
