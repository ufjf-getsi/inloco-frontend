import { useHref } from "react-router-dom";
import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../../generic/GenericTable/CommonTableFunctions";

export interface Item {
  id: string;
  orderOnCollection: number;
  title: string;
  status: string;
}

export const visibleContent = ["title", "status"];

const recordViewPageLink = (item: Item) => useHref(`/tasks/${item.id}`);

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
    id: "orderOnCollection",
    header: "Ordem",
    cell: (item: Item) => <span>{item.orderOnCollection}</span>,
    ariaLabel: createLabelFunction("Ordem"),
    sortingField: "orderOnCollection",
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
