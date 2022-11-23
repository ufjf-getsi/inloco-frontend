//Projeto
export interface Project {
  id: string;
  title: string;
  description: string;
}

//Coleta
export interface Gathering {
  id: string;
  title: string;
  projectId: string;
}

//Ponto
export interface Point {
  id: string;
  //coordinates: String
  gatheringId: string;
}

//Parâmetro
export interface Parameter {
  id: string;
  title: string;
  pointId: string;
}

//Equipamento
export interface Equipment {
  id: string;
  title: string;
  parameterId: string;
}
