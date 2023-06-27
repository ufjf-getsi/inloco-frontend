import { Parameter } from "../../types";
import { createLabelFunction } from "../../generic/components/table/tableFunctions";
import { formattedUnit } from "../Parameter/GenericParameter";

export interface Item {
  id: string;
  parameter: Parameter;
  isPending: boolean;
  result: string;
}

export const visibleContent = ["parameterName", "isPending", "result"];

export const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item: Item) => <span className="font-bold">{item.id}</span>,
    ariaLabel: createLabelFunction("id"),
    sortingField: "id",
  },
  {
    id: "parameterName",
    header: "Nome",
    cell: (item: Item) => (
      <span className="font-bold">
        {item.parameter.name + formattedUnit(item.parameter.unit)}
      </span>
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
    cell: (item: Item) =>
      item.result !== "" ? item.result + item.parameter.unit : "---",
    ariaLabel: createLabelFunction("Resultado"),
    sortingField: "result",
  },
];
