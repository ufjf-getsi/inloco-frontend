import { PropsWithChildren, ReactNode } from "react";

import {
  AppLayout,
  ContentLayout,
  Container,
  Header,
  Form,
  SpaceBetween,
  Button,
  AlertProps,
} from "@cloudscape-design/components";
import Navbar from "../../Navbar";
import { GenericRecordProps } from "../GenericInterfaces";
import GenericReturnMessageAlert, {
  GenericReturnMessageAlertProps,
} from "../GenericReturnMessageAlert";

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
          <GenericReturnMessageAlert
            alertVisible={props.alertVisible}
            setAlertVisible={props.setAlertVisible}
            alertType={props.alertType}
            recordGenderArticle={recordGenderArticle}
            recordCategorySingular={props.recordCategorySingular}
            edit={props.edit}
          />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={props.breadcrumbs}
    />
  );
}
