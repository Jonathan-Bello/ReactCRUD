import React from 'react'
import { Course, Student, Tag } from '../models/Course'


interface propsRowCourse {
    course: Course
    Seleccionar(id: number): void
    Eliminar(id: number): void
}

const RowCourse = (props: propsRowCourse) => {


    const tags: Tag[] = [
        { id: 0, name: 'Sin categorizar' },
        { id: 1, name: 'Programación' },
        { id: 2, name: 'Diseño' },
        { id: 3, name: 'Emprendimiento' }
    ]

    const students: Student[] = [
        { id: 0, name: "Por asignar", lastname: "" },
        { id: 1, name: "Monika", lastname: "Montolla" },
        { id: 2, name: "Sofia", lastname: "Serafina" }
    ]

    const tagC = tags.find(c => c.id === parseInt(props.course.tag))
    const teacher = students.find(s => s.id === parseInt(props.course.teacherID))

    return (
        <tr >
            <td>{props.course.id}</td>
            <td>{props.course.name}</td>
            <td>{props.course.type === 2 ? 'Taller' : 'Curso'}</td>
            <td>{props.course.level}</td>
            <td>
                <div className="img-container s-ratio-16-9">
                    <img className="s-radius-1" src={props.course.thumbnail}
                        alt="card-carousel" />
                </div>
            </td>
            <td>{tagC !== undefined ? tagC.name : tags[0].name}</td>
            <td>{teacher !== undefined ? teacher.name + ' ' + teacher.lastname : students[0].name}</td>
            <td className="table-actions">
                <button className="button blue s-mb-1 lg-mb-0" onClick={c => props.Seleccionar(props.course.id)}>
                    <span className="fas fa-edit"></span>
                </button>
            </td>
            <td>
                <button className="button red" onClick={c => props.Eliminar(props.course.id)} >
                    <span className="fas fa-trash"></span>
                </button>
            </td>
        </tr>
    )
}

export default RowCourse

