import { Point } from "../../types";
import { useHref } from "react-router-dom";
import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../../generic/components/table/tableFunctions";

export interface Item {
  id: string;
  orderOnRoute: number;
  actualCoordinates: string;
  point: Point;
}

export const visibleContent = [
  "name",
  "plannedCoordinates",
  "actualCoordinates",
];

const recordViewPageLink = (item: Item) => useHref(`/visit-point/${item.id}`);

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
        <span className="font-bold">{item.point.name}</span>
      </Link>
    ),
    ariaLabel: createLabelFunction("Nome"),
    sortingField: "name",
  },
  {
    id: "plannedCoordinates",
    header: "Coord. planejadas",
    cell: (item: Item) => <span>{item.point.plannedCoordinates}</span>,
    ariaLabel: createLabelFunction("Coord. planejadas"),
    sortingField: "plannedCoordinates",
  },
  {
    id: "actualCoordinates",
    header: "Coord. aferidas",
    cell: (item: Item) => <span>{item.actualCoordinates}</span>,
    ariaLabel: createLabelFunction("Coord. aferidas"),
    sortingField: "actualCoordinates",
  },
];
