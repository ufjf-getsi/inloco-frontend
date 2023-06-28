import { createLabelFunction } from "../../generic/components/table/tableFunctions";

export interface Item {
  id: string;
  name: string;
  quantity: number;
  stock: number;
}

export const visibleContent = ["name", "quantity", "stock"];

export const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item: Item) => <span className="font-bold">{item.id}</span>,
    ariaLabel: createLabelFunction("id"),
    sortingField: "id",
  },
  {
    id: "name",
    header: "Nome",
    cell: (item: Item) => <span className="font-bold">{item.name}</span>,
    ariaLabel: createLabelFunction("Nome"),
    sortingField: "name",
  },
  {
    id: "quantity",
    header: "Quant.",
    cell: (item: Item) => <span>{item.quantity}</span>,
    ariaLabel: createLabelFunction("Quant."),
    sortingField: "quantity",
  },
  {
    id: "stock",
    header: "Estoque",
    cell: (item: Item) => <span>{item.stock}</span>,
    ariaLabel: createLabelFunction("Estoque"),
    sortingField: "stock",
  },
];
