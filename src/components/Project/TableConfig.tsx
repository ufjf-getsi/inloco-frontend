import { useHref } from "react-router-dom";
import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../../generic/GenericTable/CommonTableFunctions";

interface Item {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export const visibleContent = ["title", "startDate", "description"];

const recordViewPageLink = (item: Item) => useHref(`/projects/${item.id}`);

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
      <span>{new Date(item.startDate).toLocaleDateString("pt-BR")}</span>
    ),
    ariaLabel: createLabelFunction("Data de início"),
    sortingField: "startDate",
  },
  {
    id: "endDate",
    header: "Data de fim",
    cell: (item: Item) => (
      <span>{new Date(item.endDate).toLocaleDateString("pt-BR")}</span>
    ),
    ariaLabel: createLabelFunction("Data de fim"),
    sortingField: "endDate",
  },
  {
    id: "description",
    header: "Descrição",
    cell: (item: Item) => item.description,
    ariaLabel: createLabelFunction("Descrição"),
    sortingField: "description",
  },
];
