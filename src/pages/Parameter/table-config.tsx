import { Link } from "@cloudscape-design/components";

export function getMatchesCountText(count:number) {
  return count === 1 ? `1 match` : `${count} matches`;
}

function formatDate(date: Date) {
  const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
    hour12: false,
  });
  return `${dateFormatter.format(date)}, ${timeFormatter.format(date)}`;
}

function createLabelFunction(columnName: string) {
  return ({ sorted, descending }:{sorted:boolean, descending:boolean}) => {
    const sortState = sorted
      ? `sorted ${descending ? "descending" : "ascending"}`
      : "not sorted";
    return `${columnName}, ${sortState}.`;
  };
}


interface Item {
  id: string;
  availabilityZone: string;
  state: string;
}

export const columnDefinitions = [
  {
    id: "id",
    header: "ID",
    cell: (item:Item) => <Link href={`#${item.id}`}>{item.id}</Link>,
    ariaLabel: createLabelFunction("id"),
    sortingField: "id",
  },
  {
    id: "availabilityZone",
    header: "Availability zone",
    cell: (item:Item) => item.availabilityZone,
    ariaLabel: createLabelFunction("Availability zone"),
    sortingField: "availabilityZone",
  },
  {
    id: "state",
    header: "State",
    cell: (item:Item) => item.state,
    ariaLabel: createLabelFunction("State"),
    sortingField: "state",
  }
];

export const paginationLabels = {
  nextPageLabel: "Next page",
  pageLabel: (pageNumber:number) => `Go to page ${pageNumber}`,
  previousPageLabel: "Previous page",
};

const pageSizePreference = {
  title: "Select page size",
  options: [
    { value: 10, label: "10 resources" },
    { value: 20, label: "20 resources" },
  ],
};

const visibleContentPreference = {
  title: "Select visible content",
  options: [
    {
      label: "Main properties",
      options: columnDefinitions.map(({ id, header }) => ({
        id,
        label: header,
        editable: id !== "id",
      })),
    },
  ],
};
export const collectionPreferencesProps = {
  pageSizePreference,
  visibleContentPreference,
  cancelLabel: "Cancel",
  confirmLabel: "Confirm",
  title: "Preferences",
};
