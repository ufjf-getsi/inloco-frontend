import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

import { Project } from "./components/Project";
import { CreateProjectButton } from "./components/CreateProjectButton";
import { CreateProjectModal } from "./components/CreateProjectModal";

import "./styles/main.css";
import { ProjectsTable } from "./components/ProjectsTable";

interface Project {
  id: string;
  title: string;
  description: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTableData();
  }, []);

  function fetchTableData() {
    axios("http://localhost:3333/projects").then((response) => {
      setProjects(response.data);
    });
  }

  return (
    <article className="max-w-[1344px] mx-auto flex flex-col items-center mb-10">
      <nav className="w-full flex pt-5 px-10 justify-between">
        <h1 className="text-5xl text-red-800 font-bold">In Loco</h1>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <CreateProjectButton />
          <CreateProjectModal
            fetchTableData={fetchTableData}
            setOpen={setOpen}
          />
        </Dialog.Root>
      </nav>

      <ProjectsTable projects={projects} />
    </article>
  );
}

export default App;
