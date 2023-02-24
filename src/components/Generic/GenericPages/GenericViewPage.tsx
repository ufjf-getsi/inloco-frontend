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
  table?: GenericTableProps;
  modal: GenericDeleteModalProps;
}

export default function GenericViewPage(
  props: PropsWithChildren<GenericViewPageProps>
) {
  function fetchRecordData() {
    axios(props.fetchRecordLink).then((response) => {
      props.setRecord(response.data);
    });
  }
  useEffect(() => {
    fetchRecordData();
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
            {props.table && (
              <GenericTable
                allRecords={props.table.allRecords}
                columnDefinitions={props.table.columnDefinitions}
                recordCategorySingular={props.table.recordCategorySingular}
                recordCategoryPlural={props.table.recordCategoryPlural}
                recordGenderFeminine={props.table.recordGenderFeminine}
                addRecordLink={props.table.addRecordLink}
                visibleContent={props.table.visibleContent}
                setSelectedRecords={props.table.setSelectedRecords}
              />
            )}
            {props.children}
          </Container>
          <GenericDeleteModal {...props.modal} />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={props.breadcrumbs}
    />
  );
}
