export interface IPregunta{
    id?: string;
    pregunta: string;
    rnull: string;
    respuesta: string;
  }

  export interface Icurso {
    idCurso?: string;
    idAsig?: string;
    nombre: string;
    descripcion: string;
    nivel: string;
  }

  export interface IAsignatura {
    idAsig?: string;
    idCurso?: string;
    idTema?:string;
    nombre: string;
    descripcion: string;
  }

  export interface Itema {
    idTema?: string;
    idDatosE?:string;
    nombre: string; 
    descripcion: string;
  }
  export interface IDatosExamen{
    idDatosE?:string;
    uid?: string;
    nombre:string;
    calificacion:string;
    nB:string;
    nM:string;
    nP:string;
    nombreTema:string;
  }

  export interface Iexamen {
    idExamen?: string;
    idDatosE?:string;
    uid?:string;
    pregunta: string;
    r1: string;
    r2: string; 
    r3: string;
    o1: boolean;
    o2: boolean; 
    o3: boolean;
    rcorrecta: string;

  }
