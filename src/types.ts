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
  startDate: string;
  endDate: string;
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
export enum TaskType {
  commonTask = "commonTask",
  equipmentTask = "equipmentTask",
}
export type Task = CommonTask | EquipmentTask;
interface BaseTask {
  id: string;
  isPending: boolean;
  collectionId: string;
}
export interface CommonTask extends BaseTask {
  type: TaskType.commonTask;
  title: string;
}
export interface EquipmentTask extends BaseTask {
  type: TaskType.equipmentTask;
  equipmentId: string;
  isBringingBack: boolean;
}
