// Pesquisador
export interface Researcher {
  id: string;

  name: string;
  email: string;
  phone: string;
  password: string;
  education: string;
  institution: string;
  biography: string;

  researcher_ProjectList: Researcher_Project[];
}

// Coordenador <<herda de Pesquisador>>
export interface Coordinator extends Researcher {
  role: string;
}

// Pesquisador em um Projeto
export interface Researcher_Project {
  id: string;

  administrator: boolean;
  organizer: boolean;

  researcher: Researcher;
  project?: Project;
}

// Equipamento
export interface Equipment {
  id: string;

  name: string;
}

// Suprimento
export interface Supply {
  id: string;

  name: string;
  stock: number;
}

// Tipo de Dado
export enum DataType {
  real = "real",
  integer = "integer",
  text = "text",
}

// Parâmetro
export interface Parameter {
  id: string;

  name: string;
  unit: string;
  dataType: DataType;

  equipmentList: Equipment[];
  measurements: Measurement[];
}

// Medição (leitura)
export interface Measurement {
  id: string;

  isPending: boolean;
  result: string;
  date?: Date;

  parameter: Parameter;
  visitPoint?: VisitPoint;
}

// Projeto
export interface Project {
  id: string;

  title: string;
  description: string;
  startDate: Date;
  endDate: Date;

  collections: Collection[];
  points: Point[];
  researcher_ProjectList: Researcher_Project[];
}

// Ponto
export interface Point {
  id: string;

  name: string;
  plannedCoordinates: string;
  actualCoordinates: string;

  project?: Project;
}

// Coleta
export interface Collection {
  id: string;

  title: string;
  startDate: Date;
  endDate: Date;

  tasks: Task[];
  visitPointList: VisitPoint[];

  project?: Project;
}

// Visita a um Ponto em uma Coleta
export interface VisitPoint {
  id: string;

  orderOnRoute: number;

  measurements: Measurement[];
  supply_VisitPointList: Supply_VisitPoint[];

  point: Point;
  collection?: Collection;
}

// Suprimento em uma Visita a um Ponto
export interface Supply_VisitPoint {
  id: string;

  quantity: number;

  supply: Supply;
  visitPoint?: VisitPoint;
}

// Tipo de tarefa
export enum TaskType {
  commonTask = "commonTask",
  equipmentTask = "equipmentTask",
}

// Tarefa <<Abstract>>
interface BaseTask {
  id: string;

  isPending: boolean;
  // type: TaskType; Definido nas classes concretas (CommonTask e EquipmentTask)

  collection?: Collection;
}

// Tarefa <<Concrete>>
export type Task = CommonTask | EquipmentTask;

// Tarefa Comum
export interface CommonTask extends BaseTask {
  type: TaskType.commonTask;

  title: string;
  orderOnCollection: number;
}

// Tarefa de Equipamento
export interface EquipmentTask extends BaseTask {
  type: TaskType.equipmentTask;

  isBringingBack: boolean;

  equipment: Equipment;
}
