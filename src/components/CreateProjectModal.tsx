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
  setToastOpen: Function;
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
      props.setOpen(false);
      props.setToastOpen(true);
    } catch (error) {
      console.log(error);
      alert("Erro ao criar projeto!");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="font-inter fixed bg-neutral-50 py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-3xl font-black text-red-800 mb-6 text-center">
            Novo projeto
          </Dialog.Title>
          <form className="flex flex-col gap-4" onSubmit={handleCreateProject}>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Nome do projeto"
              className="rounded mb-2 text-black bg-neutral-200 p-4 placeholder-neutral-500"
            />
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Descrição"
              className="rounded mb-2 text-black bg-neutral-200 p-4 placeholder-neutral-500"
            />
            <button
              type="submit"
              className="rounded text-3xl font-black text-neutral-700 bg-green-100 hover:bg-green-200 p-3"
            >
              Adicionar
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
