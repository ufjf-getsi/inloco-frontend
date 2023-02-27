import { PropsWithChildren, ReactNode } from "react";

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
import Navbar from "../../Navbar";
import { toUpperCase } from "../GenericFunctions";
import { GenericRecordProps } from "../GenericInterfaces";

export interface GenericRecordFormProps {
  edit: boolean;
  handleSubmit: Function;
  alertVisible: boolean;
  setAlertVisible: Function;
  alertType: AlertProps.Type;
}

interface GenericCreateAndEditPageProps
  extends GenericRecordProps,
    GenericRecordFormProps {
  description: string;
  navbarActiveLink: string;
  breadcrumbs: ReactNode;
  cancelRedirectLink: string;
}

export default function GenericCreateAndEditPage(
  props: PropsWithChildren<GenericCreateAndEditPageProps>
) {
  const recordGenderArticle = props.recordGenderFeminine ? "a" : "o";

  const alertText =
    props.alertType === "success"
      ? `${toUpperCase(recordGenderArticle)} ${
          props.recordCategorySingular
        } foi ${
          props.edit ? "editad" : "criad"
        }${recordGenderArticle} com sucesso!`
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
