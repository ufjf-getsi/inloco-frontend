import axios from "axios";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

import {
  AppLayout,
  ContentLayout,
  Container,
  Header,
  Form,
  SpaceBetween,
  Button,
  Alert,
  AlertProps,
} from "@cloudscape-design/components";
import { Navbar } from "../../Navbar";
import { ToUpperCase } from "../GenericFunctions";
import { GenericRecordProps } from "../GenericInterfaces";

interface GenericCreatePageProps extends GenericRecordProps {
  edit: false;
  description: string;
  navbarActiveLink: string;
  breadcrumbs: ReactNode;
  cancelRedirectLink: string;
  handleSubmit: Function;
  alertVisible: boolean;
  setAlertVisible: Function;
  alertType: AlertProps.Type;
}

interface GenericEditPageProps extends GenericRecordProps {
  edit: true;
  description: string;
  navbarActiveLink: string;
  breadcrumbs: ReactNode;
  cancelRedirectLink: string;
  handleSubmit: Function;
  alertVisible: boolean;
  setAlertVisible: Function;
  alertType: AlertProps.Type;
  setRecord: Function;
  fetchRecordLink: string;
}

type GenericCreateAndEditPageProps =
  | GenericCreatePageProps
  | GenericEditPageProps;

export default function GenericCreateAndEditPage(
  props: PropsWithChildren<GenericCreateAndEditPageProps>
) {
  if (props.edit) {
    const fetchRecordLink = props.fetchRecordLink;
    const setRecord = props.setRecord;
    function fetchRecordData() {
      axios(fetchRecordLink).then((response) => {
        setRecord(response.data);
      });
    }
    useEffect(() => {
      fetchRecordData();
    }, []);
  }

  const recordGenderArticle = props.recordGenderFeminine ? "a" : "o";

  const alertText =
    props.alertType === "success"
      ? `${ToUpperCase(recordGenderArticle)} ${
          props.recordCategorySingular
        } foi ${props.edit ? "editado" : "criado"} com sucesso!`
      : `Não foi possível ${
          props.edit ? "editar" : "criar"
        } ${recordGenderArticle} ${
          props.recordCategorySingular
        }! Tente novamente.`;

  return (
    <AppLayout
      navigation={<Navbar activeLink={props.navbarActiveLink} />}
      toolsHide
      contentType="form"
      content={
        <ContentLayout
          header={
            <Header variant="h2" description={props.description}>
              {props.edit ? `Editar` : `Criar`} {props.recordCategorySingular}
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
                      href={props.cancelRedirectLink}
                    >
                      Cancelar
                    </Button>
                    <Button variant="primary">
                      {props.edit ? `Editar` : `Criar`}{" "}
                      {props.recordCategorySingular}
                    </Button>
                  </SpaceBetween>
                }
                errorIconAriaLabel="Erro"
              >
                <SpaceBetween size="l">{props.children}</SpaceBetween>
              </Form>
            </form>
          </Container>
          {props.alertVisible && (
            <Alert
              onDismiss={() => props.setAlertVisible(false)}
              dismissAriaLabel="Fechar alerta"
              dismissible
              type={props.alertType}
              className="absolute right-0 w-fit mt-8 mr-8"
            >
              {alertText}
            </Alert>
          )}
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={props.breadcrumbs}
    />
  );
}
