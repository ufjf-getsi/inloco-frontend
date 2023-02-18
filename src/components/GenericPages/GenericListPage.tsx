import { PropsWithChildren, ReactNode } from "react";
import {
  AppLayout,
  ContentLayout,
  Container,
  Header,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
import { Navbar } from "../Navbar";
import GenericTable, { GenericTableProps } from "../GenericTable/GenericTable";

interface GenericListPageProps extends GenericTableProps {
  title: string;
  description: string;
  navbarActiveLink: string;
  breadcrumbs: ReactNode;
}

export default function GenericListPage(
  props: PropsWithChildren<GenericListPageProps>
) {
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
                    href={props.addRegistryLink}
                  >
                    Registrar {props.registryNameSingular}
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
              allItems={props.allItems}
              columnDefinitions={props.columnDefinitions}
              registryNameSingular={props.registryNameSingular}
              registryNamePlural={props.registryNamePlural}
              addRegistryLink={props.addRegistryLink}
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
