import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

import { Project } from "../Project";
import { CreateProjectButton } from "../CreateProjectButton";
import { CreateProjectModal } from "../CreateProjectModal";

import "../../styles/main.css";
import { ProjectsTable } from "../ProjectsTable";
import { ResponseToast } from "../ResponseToast";

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
    <article className="max-w-[1344px] mx-auto flex flex-col items-center mb-10 font-inter">
      <nav className="w-full flex pt-5 px-10 justify-between">
        <h1 className="text-5xl text-red-800 font-bold">In Loco</h1>
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <CreateProjectButton />
          <CreateProjectModal
            fetchTableData={fetchTableData}
            setOpen={setDialogOpen}
            setToastOpen={setToastOpen}
          />
        </Dialog.Root>
      </nav>
      <ProjectsTable projects={projects} />
      {toastOpen && <ResponseToast />}
    </article>
  );
}
