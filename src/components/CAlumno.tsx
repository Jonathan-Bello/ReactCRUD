import { Alumno } from '../models/Alumno'

interface cAlumnoProps {
    alumnoProps: Alumno
    Seleccionar(noControl: string): void
    Eliminar(noControl: string): void
}

const CAlumno = (props: cAlumnoProps) => {
    return (
        <div className="alert alert-secondary">
            <div className="d-flex bd-highlight">
                <div className="p-2 flex-grow-1 bd-highlight">
                    {props.alumnoProps.Nombre} - NoControl: {props.alumnoProps.NoControl}
                </div>
                <div className="p-2 bd-highlight">
                    <button className="btn btn-primary"
                        onClick={(e) => props.Seleccionar(props.alumnoProps.NoControl)}>
                        Selecionar
                    </button>
                </div>
                <div className="p-2 bd-highlight">
                    <button className="btn btn-danger"
                        onClick={e => props.Eliminar(props.alumnoProps.NoControl)}
                    >Eliminar</button>
                </div>
            </div>
        </div>
    )
}

export default CAlumno
