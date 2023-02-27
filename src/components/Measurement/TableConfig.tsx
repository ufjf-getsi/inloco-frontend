import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../Generic/GenericTable/CommonTableFunctions";

export interface Item {
  id: string;
  parameterName: string;
  isPending: boolean;
  result: string;
  unit: string;
}

export const visibleContent = ["parameterName", "isPending", "result"];

export const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item: Item) => (
      <Link href={`#`}>
        <span className="font-bold">{item.id}</span>
      </Link>
    ),
    ariaLabel: createLabelFunction("id"),
    sortingField: "id",
  },
  {
    id: "parameterName",
    header: "Nome",
    cell: (item: Item) => (
      <Link href={`#`}>
        <span className="font-bold">
          {item.parameterName + ` (${item.unit})`}
        </span>
      </Link>
    ),
    ariaLabel: createLabelFunction("Nome"),
    sortingField: "parameterName",
  },
  {
    id: "isPending",
    header: "Feito",
    cell: (item: Item) => (item.isPending ? "Não" : "Sim"),
    ariaLabel: createLabelFunction("Feito"),
    sortingField: "isPending",
  },
  {
    id: "result",
    header: "Resultado",
    cell: (item: Item) => (item.result !== "" ? item.result : "---"),
    ariaLabel: createLabelFunction("Resultado"),
    sortingField: "result",
  },
];
