import { Measurement } from "../../types";
import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../Generic/GenericTable/CommonTableFunctions";

export const visibleContent = ["parameterName", "pendency", "result"];

export const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item: Measurement) => (
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
    cell: (item: Measurement) => (
      <Link href={`#`}>
        <span className="font-bold">{item.parameter.name}</span>
      </Link>
    ),
    ariaLabel: createLabelFunction("Nome"),
    sortingField: "parameterName",
  },
  {
    id: "pendency",
    header: "Feito",
    cell: (item: Measurement) => (item.isPending ? "Não" : "Sim"),
    ariaLabel: createLabelFunction("Feito"),
    sortingField: "pendency",
  },
  {
    id: "result",
    header: "Resultado",
    cell: (item: Measurement) => (item.result !== "" ? item.result : "---"),
    ariaLabel: createLabelFunction("Resultado"),
    sortingField: "result",
  },
];
