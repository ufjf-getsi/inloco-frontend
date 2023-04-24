import { useHref } from "react-router-dom";
import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../../generic/GenericTable/CommonTableFunctions";

export interface Item {
  id: string;
  orderOnRoute: number;
  name: string;
  coordinates: string;
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
    id: "orderOnRoute",
    header: "Ordem",
    cell: (item: Item) => <span>{item.orderOnRoute}</span>,
    ariaLabel: createLabelFunction("Ordem"),
    sortingField: "orderOnRoute",
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
    id: "coordinates",
    header: "Coordenadas",
    cell: (item: Item) => <span>{item.coordinates}</span>,
    ariaLabel: createLabelFunction("Coordenadas"),
    sortingField: "coordinates",
  },
];
