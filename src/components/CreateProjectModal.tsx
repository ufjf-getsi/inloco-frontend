import { FormEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

interface Project {
  title: string;
  description: string;
}

interface CreateProjectModalInterface {
  fetchTableData: Function;
  setOpen: Function;
}

export function CreateProjectModal(props: CreateProjectModalInterface) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/projects").then((response) =>
      setProjects(response.data)
    );
  }, []);

  async function handleCreateProject(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.title || !data.description) {
      return;
    }

    try {
      await axios.post("http://localhost:3333/projects", {
        title: data.title,
        description: data.description,
      });

      props.fetchTableData();
      alert("Projeto criado com sucesso!");
      props.setOpen(false);
    } catch (error) {
      console.log(error);
      alert("Erro ao criar projeto!");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-3xl font-black text-white mb-6 text-center">
            Crie um novo projeto
          </Dialog.Title>
          <form className="flex flex-col gap-4" onSubmit={handleCreateProject}>
            <input
              name="title"
              id="title"
              type="text"
              placeholder="Nome do projeto"
              className="rounded mb-2 text-white bg-black/20 p-4"
            />
            <input
              name="description"
              id="description"
              type="text"
              placeholder="Descrição"
              className="rounded mb-2 text-white bg-black/20 p-4"
            />
            <button
              type="submit"
              className="rounded text-3xl font-black text-white hover:bg-black/20 p-4"
            >
              Submit
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
