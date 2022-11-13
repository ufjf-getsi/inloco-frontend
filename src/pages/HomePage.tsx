import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

import "../styles/main.css";

import { Project } from "../components/Project";
import { CreateProjectButton } from "../components/CreateProjectButton";
import { CreateProjectModal } from "../components/CreateProjectModal";
import { ProjectsTable } from "../components/ProjectsTable";
import { ResponseToast } from "../components/ResponseToast";
import { Navbar } from "../components/Navbar";
import { Article } from "../components/Article";

interface Project {
  id: string;
  title: string;
  description: string;
}

export function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    fetchTableData();
  }, []);

  function fetchTableData() {
    axios("http://localhost:3333/projects").then((response) => {
      setProjects(response.data);
    });
  }

  return (
    <Article>
      <Navbar>
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <CreateProjectButton />
          <CreateProjectModal
            fetchTableData={fetchTableData}
            setOpen={setDialogOpen}
            setToastOpen={setToastOpen}
          />
        </Dialog.Root>
      </Navbar>
      <ProjectsTable projects={projects} />
      {toastOpen && <ResponseToast />}
    </Article>
  );
}
