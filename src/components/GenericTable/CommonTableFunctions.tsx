export interface ColumnDefinitionInterface {
  id: string;
  header: string;
  cell: Function;
  ariaLabel: Function;
  sortingField: string;
}

export function getMatchesCountText(count: number) {
  return count === 1 ? `1 corresponde` : `${count} correspondem`;
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
  nextPageLabel: "Próxima página",
  pageLabel: (pageNumber: number) => `Ir para a página ${pageNumber}`,
  previousPageLabel: "Página anterior",
};

const pageSizePreference = {
  title: "Selecione o tamanho da página",
  options: [
    { value: 10, label: "10 registros" },
    { value: 20, label: "20 registros" },
  ],
};

const visibleContentPreference = function (
  columnDefinitions: ReadonlyArray<ColumnDefinitionInterface>
) {
  return {
    title: "Selecione o conteúdo visível",
    options: [
      {
        label: "Propriedades principais",
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
  cancelLabel: "Cancelar",
  confirmLabel: "Confirmar",
  title: "Preferências",
};
