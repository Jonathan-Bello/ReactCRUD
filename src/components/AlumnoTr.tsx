import { Alumno } from "../models/Alumno"

interface trAlumnoProps {
    alumnoProps: Alumno
    Seleccionar(nc: string): void
    Eliminar(nc: string): void
}


const AlumnoTr = (props: trAlumnoProps) => {
    return (
        <tr>
            <td>{props.alumnoProps.NoControl}</td>
            <td>{props.alumnoProps.Nombre}</td>
            <td>{props.alumnoProps.Carrera}</td>
            <td>{props.alumnoProps.Semestre}</td>
            <td>{props.alumnoProps.Inscrito ?
                <span className="text-success">Inscrito</span> :
                <span className="text-danger">No inscrito</span>}
            </td>
            <td>
                <button className="btn btn-primary"
                    onClick={(e) => props.Seleccionar(props.alumnoProps.NoControl)}>
                    Selecionar
                </button>
            </td>
            <td>
                <button className="btn btn-danger"
                    onClick={e => props.Eliminar(props.alumnoProps.NoControl)}
                >Eliminar</button>
            </td>
        </tr>
    )
}

export default AlumnoTr
