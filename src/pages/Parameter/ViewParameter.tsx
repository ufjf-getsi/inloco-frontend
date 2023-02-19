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
} from "@cloudscape-design/components";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Parameter/TableConfig";
import { DeleteParameterModal } from "../../components/Parameter/DeleteParameterModal";
import { Navbar } from "../../components/Navbar";
import { formatDataType } from "../../components/Parameter/FormParameter";
import GenericTable from "../../components/Generic/GenericTable/GenericTable";

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

  const [selectedItems, setSelectedItems] = useState([]);

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
          <GenericTable
            allRecords={allItems}
            columnDefinitions={columnDefinitions}
            recordNameSingular={`equipamento`}
            recordNamePlural={`equipamentos`}
            addRecordLink={`/parameters/${parameter.id}/equipment`}
            visibleContent={visibleContent}
            setSelectedRecords={setSelectedItems}
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
