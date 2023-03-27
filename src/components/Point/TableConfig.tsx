import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../Generic/GenericTable/CommonTableFunctions";

interface Item {
  id: string;
  name: string;
  coordinates: string;
}

export const visibleContent = ["name", "coordinates"];

const recordViewPageLink = (item: Item) =>
  `${import.meta.env.BASE_URL}points/${item.id}`;

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
    id: "coordinates",
    header: "Coordenadas",
    cell: (item: Item) => item.coordinates,
    ariaLabel: createLabelFunction("Coordenadas"),
    sortingField: "coordinates",
  },
];
