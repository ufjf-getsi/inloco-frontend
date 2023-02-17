export function getMatchesCountText(count: number) {
  return count === 1 ? `1 match` : `${count} matches`;
}

export function formatDate(date: Date) {
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" });
  const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
    timeStyle: "short",
    hour12: false,
  });
  return `${dateFormatter.format(date)}, ${timeFormatter.format(date)}`;
}

export function createLabelFunction(columnName: string) {
  return ({ sorted, descending }: { sorted: boolean; descending: boolean }) => {
    const sortState = sorted
      ? `sorted ${descending ? "descending" : "ascending"}`
      : "not sorted";
    return `${columnName}, ${sortState}.`;
  };
}

export const paginationLabels = {
  nextPageLabel: "Next page",
  pageLabel: (pageNumber: number) => `Go to page ${pageNumber}`,
  previousPageLabel: "Previous page",
};

const pageSizePreference = {
  title: "Select page size",
  options: [
    { value: 10, label: "10 resources" },
    { value: 20, label: "20 resources" },
  ],
};

interface ColumnDefinitionsInterface {
  id: string;
  header: string;
  cell: Function;
  ariaLabel: Function;
  sortingField: string;
}

const visibleContentPreference = function (
  columnDefinitions: ColumnDefinitionsInterface[]
) {
  return {
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
};

export const collectionPreferencesProps = {
  pageSizePreference,
  visibleContentPreference,
  cancelLabel: "Cancel",
  confirmLabel: "Confirm",
  title: "Preferences",
};
