import {
  AppLayout,
  ContentLayout,
  Container,
  BreadcrumbGroup,
  Header,
  SpaceBetween,
  Button,
  TextFilter,
  TextContent,
} from "@cloudscape-design/components";
import { useState } from "react";
import { Navbar } from "../../components/Navbar";

export function TaskPage() {
  const [filteringText, setFilteringText] = useState("");

  return (
    <AppLayout
      navigation={<Navbar activeLink="/tasks" />}
      toolsHide
      contentType="form"
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="InLoco é seu sistema de gerenciamento de informações sobre Limnologia."
            >
              InLoco
            </Header>
          }
        >
          <Container>
            <TextContent>
              <h1>Tarefas</h1>
            </TextContent>
            <SpaceBetween direction="horizontal" size="xs">
              <TextFilter
                filteringText={filteringText}
                filteringPlaceholder="Find instances"
                filteringAriaLabel="Filter instances"
                onChange={({ detail }) =>
                  setFilteringText(detail.filteringText)
                }
              />
              <Button>Nova tarefa</Button>
            </SpaceBetween>
          </Container>
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={
        <BreadcrumbGroup
          items={[{ text: "Tarefas", href: "#" }]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
