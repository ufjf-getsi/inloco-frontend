import { useHref, useNavigate } from "react-router-dom";
import { PropsWithChildren, ReactNode, useEffect } from "react";

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
import { GenericRecordProps } from "../GenericInterfaces";
import GenericReturnMessageAlert from "../GenericReturnMessageAlert";
import { fetchRecordData } from "../GenericFunctions";
import { AxiosResponse } from "axios";

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
  };

export default function GenericReorderPage(
  props: PropsWithChildren<GenericReorderPageProps>
) {
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
            pageType={`reorder`}
          />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={props.breadcrumbs}
    />
  );
}
