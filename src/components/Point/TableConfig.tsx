import { useHref } from "react-router-dom";
import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../../generic/GenericTable/CommonTableFunctions";

export interface Item {
  id: string;
  name: string;
  plannedCoordinates: string;
}

export const visibleContent = ["name", "coordinates"];

const recordViewPageLink = (item: Item) => useHref(`/points/${item.id}`);

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
    id: "name",
    header: "Nome",
    cell: (item: Item) => (
      <Link href={recordViewPageLink(item)}>
        <span className="font-bold">{item.name}</span>
      </Link>
    ),
    ariaLabel: createLabelFunction("Nome"),
    sortingField: "name",
  },
  {
    id: "plannedCoordinates",
    header: "Coordenadas",
    cell: (item: Item) => <span>{item.plannedCoordinates}</span>,
    ariaLabel: createLabelFunction("Coordenadas"),
    sortingField: "plannedCoordinates",
  },
];
