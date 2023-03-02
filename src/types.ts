// Projeto
export interface Project {
  id: string;
  title: string;
  description: string;
  collections: Collection[];
  notes: Note[];
}

// Coleta
export interface Collection {
  id: string;
  projectId: string;
  title: string;
  points: Point[];
  tasks: Task[];
}

// Ponto
export interface Point {
  id: string;
  collectionId: string;
  name: string;
  plannedCoordinates: string;
  actualCoordinates: string;
  measurements: Measurement[];
}

// Medição (leitura)
export interface Measurement {
  id: string;
  isPending: boolean;
  result: string;
  parameter: Parameter;
}

// Parâmetro
export interface Parameter {
  id: string;
  name: string;
  unit: string;
  dataType: string;
  equipmentList: Equipment[];
}

// Equipamento
export interface Equipment {
  id: string;
  name: string;
}

// Nota
export interface Note {
  id: string;
  date: Date;
  author: string;
  description: string;
}

// Tarefa
export interface Task {
  id: string;
  title: string;
  url: string;
  isPending: boolean;
  collectionId: string;
}
