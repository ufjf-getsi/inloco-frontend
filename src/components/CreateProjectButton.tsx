import * as Dialog from "@radix-ui/react-dialog";

export function CreateProjectButton() {
  return (
    <Dialog.Trigger className="font-bold py-3 px-4 bg-gray-400 rounded-lg hover:bg-gray-500 flex items-center gap-3">
      Novo projeto
    </Dialog.Trigger>
  );
}
