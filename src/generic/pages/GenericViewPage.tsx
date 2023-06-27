import { AxiosResponse } from "axios";
import { useHref, useNavigate } from "react-router-dom";
import { PropsWithChildren, ReactNode, useEffect } from "react";

import { fetchRecordData } from "../../functions/controller";

import Navbar from "../../components/Navbar";
import GenericInfoPanel, {
  GenericInfoPanelProps,
} from "../components/GenericInfoPanel";
import GenericTable, {
  GenericTableProps,
} from "../components/table/GenericTable";
import GenericDeleteModal, {
  GenericDeleteModalProps,
} from "../components/GenericDeleteModal";
import {
  AppLayout,
  ContentLayout,
  Container,
  Header,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";

interface GenericViewPageProps {
  title: string;
  description?: string;
  navbarActiveLink: string;
  breadcrumbs: ReactNode;
  displayedInfo?: GenericInfoPanelProps;
  setRecord: Function;
  fetchRecordLink: string;
  editRecordLink: string;
  previousPageLink?: string;
  table?: GenericTableProps;
  deleteModal: GenericDeleteModalProps;
  otherHeaderActions?: Array<ReactNode>;
}

export default function GenericViewPage(
  props: PropsWithChildren<GenericViewPageProps>
) {
  const navigate = useNavigate();
  useEffect(() => {
    fetchRecordData(
      props.fetchRecordLink,
      navigate,
      function (response: AxiosResponse) {
        props.setRecord(response.data);
      }
    );
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
              description={props.description ?? ""}
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  {props.otherHeaderActions}
                  <Button iconName="edit" href={useHref(props.editRecordLink)}>
                    Editar
                  </Button>
                  <Button
                    iconName="close"
                    onClick={() => props.deleteModal.setVisible(true)}
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
            <SpaceBetween size="xl">
              {props.displayedInfo && (
                <GenericInfoPanel {...props.displayedInfo} />
              )}
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
                  selectionType={props.table.selectionType}
                  otherHeaderActions={props.table.otherHeaderActions}
                />
              )}
              {props.children}
            </SpaceBetween>
          </Container>
          <GenericDeleteModal {...props.deleteModal} />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={props.breadcrumbs}
    />
  );
}
