import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  AppLayout,
  ContentLayout,
  Container,
  BreadcrumbGroup,
  Alert,
  AlertProps,
} from "@cloudscape-design/components";
import {
  FormHeader,
  FormConnection,
} from "../../components/Collection/FormCollection";
import { Collection } from "../../types";
import axios from "axios";

export function EditCollection() {
  let { id } = useParams();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [alertText, setAlertText] = useState(
    "A coleta foi editada com sucesso!"
  );

  const [collection, setCollection] = useState<Collection>({
    id: "",
    projectId: "",
    title: "404",
    points: [],
  });

  useEffect(() => {
    fetchCollectionData();
  }, []);

  function fetchCollectionData() {
    axios(`http://localhost:3333/collections/${id}`).then((response) => {
      setCollection(response.data);
    });
  }

  return (
    <AppLayout
      navigationHide
      toolsHide
      contentType="form"
      content={
        <ContentLayout header={<FormHeader edit />}>
          <Container>
            <FormConnection
              edit
              collection={collection}
              setAlertVisible={setAlertVisible}
              setAlertType={setAlertType}
              setAlertText={setAlertText}
            />
          </Container>
          <Alert
            onDismiss={() => setAlertVisible(false)}
            visible={alertVisible}
            dismissAriaLabel="Fechar alerta"
            dismissible
            type={alertType}
            className="absolute right-0 w-fit mt-8 mr-8"
          >
            {alertText}
          </Alert>
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Projetos", href: "/" },
            { text: "Projeto", href: "./" },
            { text: "Editar coleta", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
