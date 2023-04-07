import axios from "axios";
import { useHref, useNavigate } from "react-router-dom";
import { PropsWithChildren, ReactNode, useEffect } from "react";

import {
  AppLayout,
  ContentLayout,
  Container,
  Header,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
import Navbar from "../../Navbar";
import GenericTable, { GenericTableProps } from "../GenericTable/GenericTable";
import GenericDeleteModal, {
  GenericDeleteModalProps,
} from "../GenericDeleteModal";
import { cancelLoadAndRedirectBackwards } from "../GenericFunctions";

interface GenericViewPageProps {
  title: string;
  description: string;
  navbarActiveLink: string;
  breadcrumbs: ReactNode;
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

  function fetchRecordData() {
    axios(props.fetchRecordLink)
      .then((response) => {
        if (response.data) {
          props.setRecord(response.data);
        } else {
          cancelLoadAndRedirectBackwards({
            navigate: navigate,
            error: "404: Not Found",
            previousPageLink: props.previousPageLink,
          });
        }
      })
      .catch((error) =>
        cancelLoadAndRedirectBackwards({
          navigate: navigate,
          error: error,
          previousPageLink: props.previousPageLink,
        })
      );
  }
  useEffect(() => {
    fetchRecordData();
  }, []);

  return (
    <AppLayout
      navigation={
        <Navbar
          activeLink={props.navbarActiveLink}
        />
      }
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
                  {props.otherHeaderActions}
                  <Button
                    iconName="edit"
                    href={useHref(props.editRecordLink)}
                  >
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
          <GenericDeleteModal {...props.deleteModal} />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={props.breadcrumbs}
    />
  );
}
