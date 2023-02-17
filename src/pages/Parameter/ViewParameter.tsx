import axios from "axios";
import { Parameter } from "../../types";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  AppLayout,
  ContentLayout,
  BreadcrumbGroup,
  Header,
  SpaceBetween,
  Button,
  Table,
  Box,
  TextFilter,
  Pagination,
  CollectionPreferences,
  CollectionPreferencesProps,
} from "@cloudscape-design/components";
import {
  useCollection,
  UseCollectionOptions,
} from "@cloudscape-design/collection-hooks";
import {
  getMatchesCountText,
  paginationLabels,
  collectionPreferencesProps,
} from "../../CommonTableFunctions";
import { columnDefinitions } from "../../components/Parameter/TableConfig";
import { DeleteParameterModal } from "../../components/Parameter/DeleteParameterModal";
import { Navbar } from "../../components/Navbar";
import { formatDataType } from "../../components/Parameter/FormParameter";
import EmptyState from "../../components/EmptyState";
import { TrackBy } from "@cloudscape-design/collection-hooks/dist/cjs/interfaces";

export function ViewParameter() {
  let { id } = useParams();

  const [parameter, setParameter] = useState<Parameter>({
    id: "",
    name: "Carregando...",
    unit: "",
    dataType: "",
    equipmentList: [],
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchParameterData();
  }, []);

  function fetchParameterData() {
    axios(`http://localhost:3333/parameters/${id}`).then((response) => {
      setParameter(response.data);
    });
  }

  const allItems: {}[] = [
    { id: "item1", availabilityZone: "Manaus", state: "Amazonas" },
    { id: "item2", availabilityZone: "Belo Horizonte", state: "Minas Gerais" },
    { id: "item3", availabilityZone: "São Paulo", state: "São Paulo" },
    {
      id: "item4",
      availabilityZone: "Rio de Janeiro",
      state: "Rio de Janeiro",
    },
    { id: "item5", availabilityZone: "Salvador", state: "Bahia" },
    { id: "item6", availabilityZone: "Fortaleza", state: "Ceará" },
  ];

  const [preferences, setPreferences] = useState({
    pageSize: 10,
    visibleContent: ["id", "availabilityZone", "state"],
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
          title="Nenhum equipamento"
          subtitle="Não há equipamentos para mostrar."
          action={
            <Button
              iconName="add-plus"
              variant="normal"
              href={`/parameters/${parameter.id}/collections`}
            >
              Adicionar equipamento
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
    <AppLayout
      navigation={<Navbar />}
      toolsHide
      contentType="form"
      content={
        <ContentLayout
          header={
            <Header
              variant="h2"
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    iconName="edit"
                    href={`/parameters/${parameter.id}/edit`}
                  >
                    Editar
                  </Button>
                  <Button iconName="close" onClick={() => setVisible(true)}>
                    Excluir
                  </Button>
                </SpaceBetween>
              }
            >
              {parameter.name + ` (${parameter.unit})`}
              <span className="ml-4 font-light">
                {`_ ` + formatDataType(parameter.dataType)}
              </span>
            </Header>
          }
        >
          <Table
            {...collectionProps}
            items={items}
            selectionType="multi"
            columnDefinitions={columnDefinitions}
            visibleColumns={preferences.visibleContent}
            pagination={
              <Pagination {...paginationProps} ariaLabels={paginationLabels} />
            }
            onSelectionChange={({ detail }) => {
              actions.setSelectedItems(detail.selectedItems);
            }}
            header={
              <Header
                counter={
                  selectedItems?.length
                    ? `(${selectedItems.length}/${allItems.length})`
                    : `(${allItems.length})`
                }
              >
                Equipamentos
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
          <DeleteParameterModal
            parameterId={parameter.id}
            visible={visible}
            setVisible={setVisible}
            parameterName={parameter.name}
          />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Parâmetros", href: "/parameters" },
            { text: "Visualizar parâmetro", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
