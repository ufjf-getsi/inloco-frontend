import * as Dialog from "@radix-ui/react-dialog";

export function CreateProjectButton() {
  return (
    <div className="py-3 px-4 bg-gray-400 rounded-lg hover:bg-gray-500 flex items-center gap-3">
      <Dialog.Trigger className="font-bold">Novo projeto</Dialog.Trigger>
    </div>
  );
}
