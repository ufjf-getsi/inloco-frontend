import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../Generic/GenericTable/CommonTableFunctions";

interface Item {
  id: string;
  title: string;
  status: string;
}

export const visibleContent = ["title", "status"];

const recordViewPageLink = (item: Item) => `/tasks/${item.id}`;

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
    id: "status",
    header: "Status",
    cell: (item: Item) => item.status,
    ariaLabel: createLabelFunction("Status"),
    sortingField: "status",
  },
];
