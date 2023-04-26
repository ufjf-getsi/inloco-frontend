import { useHref } from "react-router-dom";
import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../../generic/GenericTable/CommonTableFunctions";

interface Item {
  id: string;
  name: string;
  quantity: string;
}

export const visibleContent = ["name", "quantity"];

const recordViewPageLink = (item: Item) => useHref(`/supplies/${item.id}`);

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
    sortingField: "nome",
  },
  {
    id: "quantity",
    header: "Quantidade",
    cell: (item: Item) => item.quantity,
    ariaLabel: createLabelFunction("Quantidade"),
    sortingField: "quantity",
  },
];
