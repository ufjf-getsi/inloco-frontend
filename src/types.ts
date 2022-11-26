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
}

// Ponto
export interface Point {
  id: string;
  coordinates?: string;
  measurements: Measurement[];
}

// Medição (leitura)
export interface Measurement {
  id: string;
  pendency: boolean;
  result: string;
  parameter: Parameter;
}

// Parâmetro
export interface Parameter {
  id: string;
  name: string;
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
