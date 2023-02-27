import { useState } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  Box,
  Button,
  ButtonDropdown,
  CollectionPreferences,
  Header,
  Pagination,
  SpaceBetween,
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
import { toUpperCase } from "../GenericFunctions";
import { GenericRecordProps } from "../GenericInterfaces";

export interface GenericTableProps extends GenericRecordProps {
  allRecords: {}[];
  columnDefinitions: Array<ColumnDefinitionInterface>;
  addRecordLink: string;
  visibleContent: Array<string>;
  setSelectedRecords: Function;
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
  allRecords,
  columnDefinitions,
  recordCategorySingular,
  recordCategoryPlural,
  addRecordLink,
  visibleContent,
  setSelectedRecords,
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
  } = useCollection(allRecords, {
    filtering: {
      empty: (
        <EmptyState
          title={`Nenhum ${recordCategorySingular}`}
          subtitle={`Não há ${recordCategoryPlural} para mostrar.`}
          action={
            <Button iconName="add-plus" variant="normal" href={addRecordLink}>
              Adicionar {recordCategorySingular}
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
    sorting: { defaultState: { sortingColumn: columnDefinitions[1] } },
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
        setSelectedRecords(detail.selectedItems);
      }}
      header={
        <Header
          counter={
            selectedItems?.length
              ? `(${selectedItems.length}/${allRecords.length})`
              : `(${allRecords.length})`
          }
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                iconName="add-plus"
                variant="primary"
                href={addRecordLink}
              >
                Novo
              </Button>
            </SpaceBetween>
          }
        >
          {toUpperCase(recordCategoryPlural)}
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
