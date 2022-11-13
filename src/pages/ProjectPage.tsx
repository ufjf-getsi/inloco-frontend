import { Navbar } from "../components/Navbar";
import { Article } from "../components/Article";

import { Project } from "../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function ProjectPage() {
  let { id } = useParams();

  const [project, setProject] = useState<Project>();

  useEffect(() => {
    fetchTableData();
  }, []);

  function fetchTableData() {
    axios(`http://localhost:3333/projects/${id}`).then((response) => {
      setProject(response.data);
    });
  }

  return (
    <Article>
      <Navbar />
      <h1 className="text-xl font-bold">{project?.title}</h1>
    </Article>
  );
}
