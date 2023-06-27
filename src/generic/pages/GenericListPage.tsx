import { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import { PropsWithChildren, ReactNode, useEffect } from "react";

import { fetchRecordData } from "../../functions/controller";

import Navbar from "../../components/Navbar";
import GenericTable, {
  GenericTableProps,
} from "../components/table/GenericTable";
import {
  AppLayout,
  ContentLayout,
  Container,
  Header,
} from "@cloudscape-design/components";

interface GenericListPageProps extends GenericTableProps {
  title: string;
  description: string;
  navbarActiveLink: string;
  breadcrumbs: ReactNode;
  setRecords: Function;
  fetchRecordsLink: string;
  navigate: NavigateFunction;
}

export default function GenericListPage(
  props: PropsWithChildren<GenericListPageProps>
) {
  useEffect(() => {
    fetchRecordData(
      props.fetchRecordsLink,
      props.navigate,
      (response: AxiosResponse) => {
        props.setRecords(response.data);
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
            <Header variant="h1" description={props.description}>
              {props.title}
            </Header>
          }
        >
          <Container>
            <GenericTable
              allRecords={props.allRecords}
              columnDefinitions={props.columnDefinitions}
              recordCategorySingular={props.recordCategorySingular}
              recordCategoryPlural={props.recordCategoryPlural}
              recordGenderFeminine={props.recordGenderFeminine}
              addRecordLink={props.addRecordLink}
              visibleContent={props.visibleContent}
              setSelectedRecords={props.setSelectedRecords}
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
