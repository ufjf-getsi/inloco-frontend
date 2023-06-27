import { AxiosResponse } from "axios";
import { useHref, useNavigate } from "react-router-dom";
import { PropsWithChildren, ReactNode, useEffect } from "react";

import { GenericRecordProps } from "../../clientTypes";
import { fetchRecordData } from "../../functions/controller";
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
import Navbar from "../../components/Navbar";
import GenericReturnMessageAlert from "../components/GenericReturnMessageAlert";

interface GenericBaseRecordFormProps {
  handleSubmit: Function;
  alertVisible: boolean;
  setAlertVisible: Function;
  alertType: AlertProps.Type;
}
interface GenericCreateRecordWithoutParentFormProps
  extends GenericBaseRecordFormProps {
  edit: false;
  hasParent: false;
}
interface GenericCreateRecordWithParentFormProps
  extends GenericBaseRecordFormProps {
  edit: false;
  hasParent: true;
  fetchRecordLink: string;
  setRecord: Function;
}
type GenericCreateRecordFormProps =
  | GenericCreateRecordWithoutParentFormProps
  | GenericCreateRecordWithParentFormProps;
type GenericEditRecordFormProps = GenericBaseRecordFormProps & {
  edit: true;
  fetchRecordLink: string;
  setRecord: Function;
};
export type GenericRecordFormProps =
  | GenericCreateRecordFormProps
  | GenericEditRecordFormProps;

type GenericCreateAndEditPageProps = GenericRecordProps &
  GenericRecordFormProps & {
    description: string;
    navbarActiveLink: string;
    breadcrumbs: ReactNode;
    cancelRedirectLink: string;
  };

export default function GenericCreateAndEditPage(
  props: PropsWithChildren<GenericCreateAndEditPageProps>
) {
  if (props.edit || props.hasParent) {
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
  }

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
                      href={useHref(props.cancelRedirectLink)}
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
            recordGenderFeminine={props.recordGenderFeminine}
            recordCategorySingular={props.recordCategorySingular}
            recordCategoryPlural={props.recordCategoryPlural}
            pageType={props.edit ? "edit" : "create"}
          />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={props.breadcrumbs}
    />
  );
}
