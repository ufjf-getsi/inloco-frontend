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
import GenericTable, { GenericTableProps } from "../GenericTable/GenericTable";
import { Navbar } from "../../Navbar";

interface GenericListPageProps extends GenericTableProps {
  title: string;
  description: string;
  navbarActiveLink: string;
  breadcrumbs: ReactNode;
  setRecords: Function;
  fetchRecordsLink: string;
}

export default function GenericListPage(
  props: PropsWithChildren<GenericListPageProps>
) {
  function fetchTableData() {
    axios(props.fetchRecordsLink).then((response) => {
      props.setRecords(response.data);
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
              variant="h1"
              description={props.description}
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    iconName="add-plus"
                    variant="primary"
                    href={props.addRecordLink}
                  >
                    Registrar {props.recordNameSingular}
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
              allRecords={props.allRecords}
              columnDefinitions={props.columnDefinitions}
              recordNameSingular={props.recordNameSingular}
              recordNamePlural={props.recordNamePlural}
              addRecordLink={props.addRecordLink}
              visibleContent={props.visibleContent}
              setSelectedRegistries={props.setSelectedRegistries}
            />
            {props.children}
          </Container>
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={props.breadcrumbs}
    />
  );
}
