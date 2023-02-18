import { useState } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  Box,
  Button,
  CollectionPreferences,
  Header,
  Pagination,
  Table,
  TableProps,
  TextFilter,
} from "@cloudscape-design/components";
import {
  getMatchesCountText,
  paginationLabels,
  collectionPreferencesProps,
  ColumnDefinitionInterface,
} from "./CommonTableFunctions";

export interface GenericTableProps {
  allItems: {}[];
  columnDefinitions: Array<ColumnDefinitionInterface>;
  registryNameSingular: string;
  registryNamePlural: string;
  addRegistryLink: string;
  visibleContent: Array<string>;
  setSelectedRegistries: Function;
  selectionType?: TableProps.SelectionType;
}

function EmptyState({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action: JSX.Element;
}) {
  return (
    <Box textAlign="center" color="inherit">
      <Box variant="strong" textAlign="center" color="inherit">
        {title}
      </Box>
      <Box variant="p" padding={{ bottom: "s" }} color="inherit">
        {subtitle}
      </Box>
      {action}
    </Box>
  );
}

export default function GenericTable({
  allItems,
  columnDefinitions,
  registryNameSingular,
  registryNamePlural,
  addRegistryLink,
  visibleContent,
  setSelectedRegistries,
  selectionType,
}: GenericTableProps) {
  const [preferences, setPreferences] = useState({
    pageSize: 10,
    visibleContent: visibleContent,
  });
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    paginationProps,
    filterProps,
  } = useCollection(allItems, {
    filtering: {
      empty: (
        <EmptyState
          title={`Nenhum ${registryNameSingular}`}
          subtitle={`Não há ${registryNamePlural} para mostrar.`}
          action={
            <Button iconName="add-plus" variant="normal" href={addRegistryLink}>
              Adicionar {registryNameSingular}
            </Button>
          }
        />
      ),
      noMatch: (
        <EmptyState
          title="Sem correspondências"
          subtitle="Não pudemos encontrar um registro correspondente."
          action={
            <Button onClick={() => actions.setFiltering("")}>
              Limpar Filtro
            </Button>
          }
        />
      ),
    },
    pagination: { pageSize: preferences.pageSize },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: { trackBy: "id", keepSelection: true },
  });
  const { selectedItems } = collectionProps;

  return (
    <Table
      {...collectionProps}
      items={items}
      selectionType={selectionType}
      columnDefinitions={columnDefinitions}
      visibleColumns={preferences.visibleContent}
      stripedRows
      trackBy="id"
      wrapLines
      variant="embedded"
      pagination={
        <Pagination {...paginationProps} ariaLabels={paginationLabels} />
      }
      onSelectionChange={({ detail }) => {
        actions.setSelectedItems(detail.selectedItems);
        setSelectedRegistries(detail.selectedItems);
      }}
      header={
        <Header
          counter={
            selectedItems?.length
              ? `(${selectedItems.length}/${allItems.length})`
              : `(${allItems.length})`
          }
        >
          {registryNamePlural.charAt(0).toLocaleUpperCase() +
            registryNamePlural.slice(1)}
        </Header>
      }
      filter={
        <TextFilter
          {...filterProps}
          countText={getMatchesCountText(filteredItemsCount || 0)}
          filteringAriaLabel="Filter instances"
        />
      }
      preferences={
        <CollectionPreferences
          {...collectionPreferencesProps}
          visibleContentPreference={collectionPreferencesProps.visibleContentPreference(
            columnDefinitions
          )}
          preferences={preferences}
          onConfirm={({ detail }) => {
            return setPreferences(
              detail as { pageSize: number; visibleContent: string[] }
            );
          }}
        />
      }
    />
  );
}
