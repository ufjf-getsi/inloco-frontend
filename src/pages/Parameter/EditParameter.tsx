import axios from "axios";
import { Parameter } from "../../types";

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
} from "../../components/Parameter/FormParameter";
import { Navbar } from "../../components/Navbar";

export function EditParameter() {
  let { id } = useParams();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [alertText, setAlertText] = useState(
    "O parâmetro foi editado com sucesso!"
  );
  const [parameter, setParameter] = useState<Parameter>({
    id: "",
    name: "404",
    dataType: "",
    equipmentList: [],
  });

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
        <ContentLayout header={<FormHeader edit={true} />}>
          <Container>
            <FormConnection
              edit={true}
              parameter={parameter}
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
            { text: "Parâmetros", href: "/parameters" },
            { text: "Parâmetro", href: "./" },
            { text: "Editar parâmetro", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
