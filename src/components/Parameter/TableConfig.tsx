import { Link } from "@cloudscape-design/components";
import { createLabelFunction } from "../../CommonTableFunctions";

interface Item {
  id: string;
  availabilityZone: string;
  state: string;
}

export const visibleContent = ["id", "availabilityZone", "state"];

export const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item: Item) => <Link href={`#${item.id}`}>{item.id}</Link>,
    ariaLabel: createLabelFunction("id"),
    sortingField: "id",
  },
  {
    id: "availabilityZone",
    header: "Availability zone",
    cell: (item: Item) => item.availabilityZone,
    ariaLabel: createLabelFunction("Availability zone"),
    sortingField: "availabilityZone",
  },
  {
    id: "state",
    header: "State",
    cell: (item: Item) => item.state,
    ariaLabel: createLabelFunction("State"),
    sortingField: "state",
  },
];
