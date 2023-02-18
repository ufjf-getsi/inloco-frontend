import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "./../GenericTable/CommonTableFunctions";

interface Item {
  id: string;
  name: string;
  coordinates: string;
}

export const visibleContent = ["name", "coordinates"];

export const columnDefinitions = (
  setSelectedPoint: Function,
  setPointModalVisible: Function
) => [
  {
    id: "id",
    header: "ID",
    cell: (item: Item) => (
      <Link href={`#point`}>
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
      <Link>
        <span
          onClick={() => {
            setSelectedPoint(item);
            setPointModalVisible(true);
          }}
          className="font-bold"
        >
          {item.name}
        </span>
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
