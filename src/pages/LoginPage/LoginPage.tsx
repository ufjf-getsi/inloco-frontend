import {
  AppLayout,
  ContentLayout,
  FormField,
  Form,
  SpaceBetween,
  Input,
  Button,
  Container,
  Header,
} from "@cloudscape-design/components";
import Navbar from "../../components/Navbar";

import React from "react";
import { useHref } from "react-router-dom";

export default function LoginPage({ edit }: { edit: boolean }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <AppLayout
      navigation={<Navbar />}
      toolsHide
      contentType="form"
      content={
        <ContentLayout>
          <form onSubmit={(e) => e.preventDefault()}>
            <Form
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button formAction="none" variant="link">
                    Recuperar senha
                  </Button>
                  <Button formAction="none" variant="link">
                    Cancelar
                  </Button>
                  <Button variant="primary" href={useHref("/projects")}>
                    Entrar
                  </Button>
                </SpaceBetween>
              }
              header={<Header variant="h1">InLoco</Header>}
            >
              <Container header={<Header variant="h2">Login</Header>}>
                <SpaceBetween direction="vertical" size="l">
                  <FormField label="Usuário">
                    <Input
                      onChange={({ detail }) => setUsername(detail.value)}
                      value={username}
                      placeholder="Nome de usuário"
                      type="text"
                    />
                  </FormField>
                  <FormField label="Senha">
                    <Input
                      onChange={({ detail }) => setPassword(detail.value)}
                      value={password}
                      placeholder="Senha"
                      type="password"
                    />
                  </FormField>
                </SpaceBetween>
              </Container>
            </Form>
          </form>
        </ContentLayout>
      }
      headerSelector="#header"
    />
  );
}
