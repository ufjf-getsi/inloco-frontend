import axios from "axios";
import { Equipment } from "../../types";

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
} from "../../components/Equipment/FormEquipment";
import { Navbar } from "../../components/Navbar";

export function EditEquipment() {
  let { id } = useParams();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [alertText, setAlertText] = useState(
    "O equipamento foi editado com sucesso!"
  );
  const [equipment, setEquipment] = useState<Equipment>({
    id: "",
    name: "Carregando...",
  });

  function updateAlert(success: boolean) {
    if (success) {
      setAlertType("success");
      setAlertText(`O equipamento foi adicionado com sucesso!`);
    } else {
      setAlertType("error");
      setAlertText(
        `Não foi possível adicionar o equipamento! Tente novamente.`
      );
    }
  }

  useEffect(() => {
    fetchEquipmentData();
  }, []);

  function fetchEquipmentData() {
    axios(`http://localhost:3333/equipment/${id}`).then((response) => {
      setEquipment(response.data);
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
              equipment={equipment}
              setAlertVisible={setAlertVisible}
              updateAlert={updateAlert}
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
            { text: "Equipamentos", href: "/equipment" },
            { text: "Equipamentos", href: "./" },
            { text: "Editar equipamento", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
