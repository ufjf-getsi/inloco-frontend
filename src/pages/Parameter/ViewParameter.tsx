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
} from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  columnDefinitions,
  getMatchesCountText,
  paginationLabels,
  collectionPreferencesProps,
} from "./table-config";

import { DeleteParameterModal } from "../../components/Parameter/DeleteParameterModal";
import { Navbar } from "../../components/Navbar";
import { formatDataType } from "../../components/Parameter/FormParameter";
import EmptyState from "../../components/EmptyState";

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
    { id: "abcd", availabilityZone: "Manaus", state: "Amazonas" },
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
    filterProps,
    paginationProps,
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
          title="No matches"
          subtitle="We can't find a match."
          action={
            <Button onClick={() => actions.setFiltering("")}>
              Clear filter
            </Button>
          }
        />
      ),
    },
    pagination: { pageSize: preferences.pageSize },
    sorting: {},
    selection: {},
  });
  const { selectedItems } = collectionProps;
  // const [selectedItems, setSelectedItems] = useState<{}[]>([allItems[0]]);

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
            // {...collectionProps}
            selectionType="multi"
            // onSelectionChange={({ detail }) =>
            //   setSelectedItems(detail.selectedItems)
            // }
            // selectedItems={selectedItems}
            header={
              <Header
                counter={
                  selectedItems.length
                    ? `(${selectedItems.length}/${allItems.length})`
                    : `(${allItems.length})`
                }
              >
                Equipamentos
              </Header>
            }
            columnDefinitions={columnDefinitions}
            visibleColumns={preferences.visibleContent}
            items={items}
            pagination={
              <Pagination {...paginationProps} ariaLabels={paginationLabels} />
            }
            filter={
              <TextFilter
                {...filterProps}
                countText={getMatchesCountText(filteredItemsCount)}
                filteringAriaLabel="Filter instances"
              />
            }
            preferences={
              <CollectionPreferences
                {...collectionPreferencesProps}
                preferences={preferences}
                onConfirm={({ detail }) => setPreferences(detail)}
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
