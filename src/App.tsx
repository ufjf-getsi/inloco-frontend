import { useEffect, useState } from "react";
import { Project } from "./components/Project";
import axios from "axios";

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

      <div className="grid grid-cols-6 gap-6 mt-16">
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
    </div>
  );
}

export default App;
