import { useHref } from "react-router-dom";
import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../../generic/components/table/tableFunctions";
import { formatDate } from "../../functions/util";

interface Item {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

export const visibleContent = ["title", "startDate", "endDate"];

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
      <span>{formatDate(new Date(item.startDate), { type: "date" })}</span>
    ),
    ariaLabel: createLabelFunction("Data de início"),
    sortingField: "startDate",
  },
  {
    id: "endDate",
    header: "Data de fim",
    cell: (item: Item) => (
      <span>{formatDate(new Date(item.endDate), { type: "date" })}</span>
    ),
    ariaLabel: createLabelFunction("Data de fim"),
    sortingField: "endDate",
  },
];
