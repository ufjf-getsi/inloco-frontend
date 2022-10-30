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

  useEffect(() => {
    axios("http://localhost:3333/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-10">
      <h1 className="text-5xl text-red-800 font-bold mt-5">In Loco</h1>

      <ProjectsTable projects={projects} />

      <Dialog.Root>
        <CreateProjectButton />
        <CreateProjectModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
