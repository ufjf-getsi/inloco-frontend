import { useHref, useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";

import {
  AppLayout,
  ContentLayout,
  Container,
  Header,
  Form,
  SpaceBetween,
  Button,
  AlertProps,
  Box,
} from "@cloudscape-design/components";
import Navbar from "../../components/Navbar";
import { GenericRecordProps } from "../GenericInterfaces";
import GenericReturnMessageAlert from "../GenericReturnMessageAlert";
import { fetchRecordData } from "../GenericFunctions";
import { AxiosResponse } from "axios";
import {
  Board,
  BoardItem,
  BoardProps,
} from "@cloudscape-design/board-components";
import { BoardItemDefinition } from "@cloudscape-design/board-components/internal/interfaces";

interface GenericBaseRecordFormProps {
  handleSubmit: Function;
  alertVisible: boolean;
  setAlertVisible: Function;
  alertType: AlertProps.Type;
}

export type GenericReorderPageProps = GenericRecordProps &
  GenericBaseRecordFormProps & {
    description: string;
    navbarActiveLink: string;
    breadcrumbs: ReactNode;
    cancelRedirectLink: string;
    fetchParentLink: string;
    setParent: Function;
    items: BoardProps.Item<{ title: string; content: string }>[];
    setItems: Function;
  };

export default function GenericReorderPage(props: GenericReorderPageProps) {
  const navigate = useNavigate();
  useEffect(() => {
    fetchRecordData(
      props.fetchParentLink,
      navigate,
      function (response: AxiosResponse<any, any>) {
        props.setParent(response.data);
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
            <Header variant="h2" description={props.description}>
              Reordenar {props.recordCategorySingular}
            </Header>
          }
        >
          <Container>
            <form onSubmit={(event) => props.handleSubmit(event)}>
              <Form
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button
                      formAction="none"
                      variant="link"
                      href={useHref(props.cancelRedirectLink)}
                    >
                      Cancelar
                    </Button>
                    <Button variant="primary">Confirmar</Button>
                  </SpaceBetween>
                }
                errorIconAriaLabel="Erro"
              >
                <SpaceBetween size="l">
                  <Board
                    renderItem={(item: BoardItemDefinition<any>) => (
                      <BoardItem
                        header={<Header>{item.data.title}</Header>}
                        i18nStrings={{
                          dragHandleAriaLabel: "Drag handle",
                          dragHandleAriaDescription:
                            "Use Space or Enter to activate drag, arrow keys to move, Space or Enter to submit, or Escape to discard.",
                          resizeHandleAriaLabel: "Resize handle",
                          resizeHandleAriaDescription:
                            "Use Space or Enter to activate resize, arrow keys to move, Space or Enter to submit, or Escape to discard.",
                        }}
                      >
                        {item.data.content}
                      </BoardItem>
                    )}
                    onItemsChange={(event: any) =>
                      props.setItems(event.detail.items)
                    }
                    items={props.items}
                    i18nStrings={((): any => {
                      function createAnnouncement(
                        operationAnnouncement: string,
                        conflicts: any[] | readonly BoardProps.Item<any>[],
                        disturbed:
                          | string
                          | any[]
                          | readonly BoardProps.Item<any>[]
                      ) {
                        const conflictsAnnouncement =
                          conflicts.length > 0
                            ? `Conflicts with ${conflicts
                                .map((c) => c.data.title)
                                .join(", ")}.`
                            : "";
                        const disturbedAnnouncement =
                          disturbed.length > 0
                            ? `Disturbed ${disturbed.length} items.`
                            : "";
                        return [
                          operationAnnouncement,
                          conflictsAnnouncement,
                          disturbedAnnouncement,
                        ]
                          .filter(Boolean)
                          .join(" ");
                      }
                      return {
                        liveAnnouncementDndStarted: (operationType: string) =>
                          operationType === "resize" ? "Resizing" : "Dragging",
                        liveAnnouncementDndItemReordered: (operation: {
                          placement: { x: number; y: number };
                          direction: string;
                          conflicts: any[] | readonly BoardProps.Item<any>[];
                          disturbed:
                            | string
                            | any[]
                            | readonly BoardProps.Item<any>[];
                        }) => {
                          const columns = `column ${operation.placement.x + 1}`;
                          const rows = `row ${operation.placement.y + 1}`;
                          return createAnnouncement(
                            `Item moved to ${
                              operation.direction === "horizontal"
                                ? columns
                                : rows
                            }.`,
                            operation.conflicts,
                            operation.disturbed
                          );
                        },
                        liveAnnouncementDndItemResized: (operation: {
                          isMinimalColumnsReached: any;
                          isMinimalRowsReached: any;
                          direction: string;
                          placement: { width: any; height: any };
                          conflicts: any[] | readonly BoardProps.Item<any>[];
                          disturbed:
                            | string
                            | any[]
                            | readonly BoardProps.Item<any>[];
                        }) => {
                          const columnsConstraint =
                            operation.isMinimalColumnsReached
                              ? " (minimal)"
                              : "";
                          const rowsConstraint = operation.isMinimalRowsReached
                            ? " (minimal)"
                            : "";
                          const sizeAnnouncement =
                            operation.direction === "horizontal"
                              ? `columns ${operation.placement.width}${columnsConstraint}`
                              : `rows ${operation.placement.height}${rowsConstraint}`;
                          return createAnnouncement(
                            `Item resized to ${sizeAnnouncement}.`,
                            operation.conflicts,
                            operation.disturbed
                          );
                        },
                        liveAnnouncementDndItemInserted: (operation: {
                          placement: { x: number; y: number };
                          conflicts: any[] | readonly BoardProps.Item<any>[];
                          disturbed:
                            | string
                            | any[]
                            | readonly BoardProps.Item<any>[];
                        }) => {
                          const columns = `column ${operation.placement.x + 1}`;
                          const rows = `row ${operation.placement.y + 1}`;
                          return createAnnouncement(
                            `Item inserted to ${columns}, ${rows}.`,
                            operation.conflicts,
                            operation.disturbed
                          );
                        },
                        liveAnnouncementDndCommitted: (operationType: any) =>
                          `${operationType} committed`,
                        liveAnnouncementDndDiscarded: (operationType: any) =>
                          `${operationType} discarded`,
                        liveAnnouncementItemRemoved: (op: any) =>
                          createAnnouncement(
                            `Removed item ${op.item.data.title}.`,
                            [],
                            op.disturbed
                          ),
                        navigationAriaLabel: "Board navigation",
                        navigationAriaDescription:
                          "Click on non-empty item to move focus over",
                        navigationItemAriaLabel: (item: BoardProps.Item<any>) =>
                          item ? item.data.title : "Empty",
                      };
                    })()}
                    empty={
                      <Box textAlign="center" color="inherit">
                        <SpaceBetween size="xxs">
                          <div>
                            <Box variant="strong" color="inherit">
                              Nenhum item.
                            </Box>
                            <Box variant="p" color="inherit">
                              Não há nenhum item neste painel.
                            </Box>
                          </div>
                        </SpaceBetween>
                      </Box>
                    }
                  />
                </SpaceBetween>
              </Form>
            </form>
          </Container>
          <GenericReturnMessageAlert
            alertVisible={props.alertVisible}
            setAlertVisible={props.setAlertVisible}
            alertType={props.alertType}
            recordGenderFeminine={props.recordGenderFeminine}
            recordCategorySingular={props.recordCategorySingular}
            recordCategoryPlural={props.recordCategoryPlural}
            pageType={`reorder`}
          />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={props.breadcrumbs}
    />
  );
}
