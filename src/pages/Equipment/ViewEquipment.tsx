import axios from "axios";
import { Equipment } from "../../types";

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

import { DeleteEquipmentModal } from "../../components/Equipment/DeleteEquipmentModal";
import { Navbar } from "../../components/Navbar";

export function ViewEquipment() {
  let { id } = useParams();

  const [equipment, setEquipment] = useState<Equipment>({
    id: "",
    name: "Carregando...",
  });
  const [visible, setVisible] = useState(false);

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
        <ContentLayout
          header={
            <Header
              variant="h2"
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  {/* <Button
                    iconName="add-plus"
                    variant="primary"
                    href={`/equipment/${equipment.id}/collections`}
                  >
                    Adicionar equipamento
                  </Button> */}
                  <Button
                    iconName="edit"
                    href={`/equipment/${equipment.id}/edit`}
                  >
                    Editar
                  </Button>
                  <Button iconName="close" onClick={() => setVisible(true)}>
                    Excluir
                  </Button>
                </SpaceBetween>
              }
            >
              {equipment.name}
            </Header>
          }
        >
          <DeleteEquipmentModal
            equipmentId={equipment.id}
            visible={visible}
            setVisible={setVisible}
            equipmentName={equipment.name}
          />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Equipamentos", href: "/equipment" },
            { text: "Visualizar equipamento", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
