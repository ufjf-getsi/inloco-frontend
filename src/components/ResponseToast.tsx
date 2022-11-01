import * as Toast from "@radix-ui/react-toast";

export function ResponseToast() {
  return (
    <Toast.Provider>
      <Toast.Root className="toast grid grid-rows-2 grid-cols-[1fr_min-content] rounded-lg w-fit p-2 shadow-md shadow-neutral-300">
        <Toast.Title className="font-bold text-green-700">Sucesso!</Toast.Title>
        <Toast.Close asChild className="row-span-2 ml-2">
          <button className="focus:outline-none border-2 bg-red-400 border-red-400 hover:bg-red-500 hover:border-red-500 focus:ring-4 focus:ring-red-300 rounded-lg text-md px-3 py-1.5 w-min h-min self-center">
            &times;
          </button>
        </Toast.Close>
        <Toast.Description className="text-neutral-800">
          Projeto adicionado com sucesso.
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
}
