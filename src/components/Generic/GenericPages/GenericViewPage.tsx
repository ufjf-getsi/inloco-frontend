import axios from "axios";
import { PropsWithChildren, ReactNode, useEffect } from "react";

import {
  AppLayout,
  ContentLayout,
  Container,
  Header,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
import { Navbar } from "../../Navbar";
import GenericTable, { GenericTableProps } from "../GenericTable/GenericTable";
import GenericDeleteModal, {
  GenericDeleteModalProps,
} from "../GenericDeleteModal";

interface GenericViewPageProps {
  title: string;
  description: string;
  navbarActiveLink: string;
  breadcrumbs: ReactNode;
  setRecord: Function;
  fetchRecordLink: string;
  editRecordLink: string;
  deleteModalVisible: boolean;
  setDeleteModalVisible: Function;
  table: GenericTableProps;
  modal: GenericDeleteModalProps;
}

export default function GenericViewPage(
  props: PropsWithChildren<GenericViewPageProps>
) {
  function fetchTableData() {
    axios(props.fetchRecordLink).then((response) => {
      props.setRecord(response.data);
    });
  }
  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <AppLayout
      navigation={<Navbar activeLink={props.navbarActiveLink} />}
      toolsHide
      contentType="form"
      content={
        <ContentLayout
          header={
            <Header
              variant="h2"
              description={props.description}
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  {/* <Button
                    iconName="add-plus"
                    variant="primary"
                    href={`/projects/${project.id}/collections`}
                  >
                    Nova Coleta
                  </Button> */}
                  <Button iconName="edit" href={props.editRecordLink}>
                    Editar
                  </Button>
                  <Button
                    iconName="close"
                    onClick={() => props.setDeleteModalVisible(true)}
                  >
                    Excluir
                  </Button>
                </SpaceBetween>
              }
            >
              {props.title}
            </Header>
          }
        >
          <Container>
            <GenericTable
              allRecords={props.table.allRecords}
              columnDefinitions={props.table.columnDefinitions}
              recordNameSingular={props.table.recordNameSingular}
              recordNamePlural={props.table.recordNamePlural}
              addRecordLink={props.table.addRecordLink}
              visibleContent={props.table.visibleContent}
              setSelectedRecords={props.table.setSelectedRecords}
            />
            {props.children}
          </Container>
          <GenericDeleteModal
            {...props.modal}
            alertText={`Proceder com esta ação deletará o projeto com todo o seu conteúdo,
        incluindo todas as coletas e registros associados a si.`}
          />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={props.breadcrumbs}
    />
  );
}
