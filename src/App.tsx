import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

import { Project } from "./components/Project";
import { CreateProjectButton } from "./components/CreateProjectButton";
import { CreateProjectModal } from "./components/CreateProjectModal";

import "./styles/main.css";

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

      <div className="flex flex-col items-center mt-10 mb-10">
        {projects.map((project) => {
          return (
            <Project
              key={project.id}
              title={project.title}
              description={project.description}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateProjectButton />
        <CreateProjectModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
