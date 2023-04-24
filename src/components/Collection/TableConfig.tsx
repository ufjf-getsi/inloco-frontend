import { useHref } from "react-router-dom";
import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../../generic/GenericTable/CommonTableFunctions";

interface Item {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
}

export const visibleContent = ["title", "startDate"];

const recordViewPageLink = (item: Item) => useHref(`/collections/${item.id}`);

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
    id: "startDate",
    header: "Data de início",
    cell: (item: Item) => (
      <Link href={recordViewPageLink(item)}>
        <span className="font-bold">{item.startDate}</span>
      </Link>
    ),
    ariaLabel: createLabelFunction("Data de início"),
    sortingField: "startDate",
  },
];
