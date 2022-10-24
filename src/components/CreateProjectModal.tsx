import * as Dialog from "@radix-ui/react-dialog";

export function CreateProjectModal() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed">
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-3xl font-black text-white mb-6 text-center">
            Crie um novo projeto{" "}
          </Dialog.Title>
          <form className="flex flex-col gap-4" method="POST" action="/projects">
            <input type="text" placeholder="Nome do projeto" className="rounded mb-2 text-white bg-black/20 p-4" />
            <input type="text" placeholder="Descrição" className="rounded mb-2 text-white bg-black/20 p-4" />
            <button type="submit" className="rounded text-3xl font-black text-white hover:bg-black/20 p-4">Submit</button>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
