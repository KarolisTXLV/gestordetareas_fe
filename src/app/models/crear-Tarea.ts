export interface CrearTarea {
    nombreTarea: string,
    descripcionTarea:string,
    fechaCreacionTarea: Date,
    estadosTarea?: number,
    estaEliminado?: boolean,
    tiposTarea?: number,
    idUsuarioDeLaTarea: number,
    idEspacioDeTrabajo: number
}
