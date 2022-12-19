import axios from "axios";
import { Parameter } from "../../types";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  AppLayout,
  ContentLayout,
  Container,
  BreadcrumbGroup,
  Header,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";

import { DeleteParameterModal } from "../../components/Parameter/DeleteParameterModal";
// import { CollectionsTable } from "../../components/Collection/CollectionsTable";
import { Navbar } from "../../components/Navbar";

export function ViewParameter() {
  let { id } = useParams();

  const [parameter, setParameter] = useState<Parameter>({
    id: "",
    name: "404",
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
                    iconName="add-plus"
                    variant="primary"
                    href={`/parameters/${parameter.id}/collections`}
                  >
                    Adicionar equipamento
                  </Button>
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
              {parameter.name}
            </Header>
          }
        >
          {/* <Container>
            <TextContent>
              <h1>Coletas</h1>
              <CollectionsTable collections={parameter.collections} />
            </TextContent>
          </Container> */}
          <DeleteParameterModal
            parameterId={parameter.id}
            visible={visible}
            setVisible={setVisible}
            parameterTitle={parameter.name}
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
