import { ErrorMessage, Form, Formik } from 'formik'
import { useState } from 'react'
import { Course, Student, Tag } from '../models/Course'
import * as Yup from 'yup'
import RowCourse from './rowCourse'

const CRUDCourse = () => {

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

    const initValuesForm: Course = {
        id: 0,
        name: '',
        level: 1,
        type: 1,
        description: '',
        thumbnail: '',
        tag: '0',
        teacherID: '0'
    }

    const [course, setCourse] = useState<Course>(initValuesForm)
    const [courses, setCourses] = useState<Course[]>([])
    const [updating, setUpdating] = useState<boolean>(false)

    const validations = Yup.object({
        id: Yup.number().required("Especificar el id es obligatorio").min(1, "El id debe ser mayor a 1"),
        name: Yup.string().required("Especificar el nombre es obligatorio"),
        level: Yup.number().required("Especificar el nivel es obligatorio")
            .min(1, "El nivel debe ser mayor a 1")
            .max(3, "El nivel maximo es 3"),
        description: Yup.string().max(200, "El numero maximo de caracteres es 200"),
        thumbnail: Yup.string().url(),
    })

    // carga los valores al form
    const handlerSelecionar = (id: number) => {
        setCourse(courses.find(c => c.id === id)!)
        setUpdating(true)
    }

    const handlerEliminar = (id: number) => {
        // Usamos un filtro, creando un nuevo array sin el alumno que definamos
        setCourses(courses.filter(c => c.id !== id))
        setCourse(initValuesForm)
        setUpdating(false)
    }


    return (
        <>
            <Formik initialValues={course}
                enableReinitialize={true}
                validationSchema={validations}
                onSubmit={(value: Course, { resetForm }) => {
                    if (!updating) {
                        const courseAux: Course = courses.find(c => c.id === value.id)!
                        if (courses.includes(courseAux)) {
                            alert("Este id ya fue asignado")
                        } else {
                            setCourses([...courses, value])
                            resetForm()
                        }
                    }
                    else {
                        const index = courses.findIndex(c => c.id === value.id)
                        const arrayTemp = [...courses]
                        arrayTemp[index] = value
                        setCourses(arrayTemp)
                        resetForm()
                        setUpdating(false)
                    }
                    console.log(courses);
                }
                }
            >
                {(formikProps) => (
                    <div className="ed-grid s-grid-12">
                        <div className="s-cols-4">
                            <Form className="">
                                <label className="label-input">Id
                                    <input className="input" type="number"
                                        readOnly={!updating ? false : true}
                                        {...formikProps.getFieldProps("id")}
                                    />
                                    <ErrorMessage name="id">
                                        {msg => <span className="text-danger">{msg}</span>}
                                    </ErrorMessage>
                                </label>
                                <label className="label-input">Nombre
                                    <input className="input" type="text"
                                        {...formikProps.getFieldProps("name")}
                                    />
                                    <ErrorMessage name="name">
                                        {msg => <span className="text-danger">{msg}</span>}
                                    </ErrorMessage>
                                </label>
                                <div className="ed-grid s-grid-2">
                                    <label className="label-input">Nivel
                                        <input className="input s-px-4" type="number"
                                            {...formikProps.getFieldProps("level")}
                                        />
                                        <ErrorMessage name="level">
                                            {msg => <span className="text-danger">{msg}</span>}
                                        </ErrorMessage>
                                    </label>
                                    <label className="label-input">Tipo
                                        <select className="input s-px-05"
                                            {...formikProps.getFieldProps("type")}
                                        >
                                            <option key={0} value={0}>-------------</option>
                                            <option key={1} value={1}>Curso</option>
                                            <option key={2} value={2}>Taller</option>
                                        </select>
                                    </label>
                                </div>
                                <label className="label-input" htmlFor="iptName">Descripción
                                    <textarea className="input input-text" placeholder="Mucho texto" cols={30} rows={5}
                                        {...formikProps.getFieldProps("description")}
                                    ></textarea>
                                    <ErrorMessage name="description">
                                        {msg => <span className="text-danger">{msg}</span>}
                                    </ErrorMessage>
                                </label>
                                <label className="label-input" htmlFor="iptName">Miniatura
                                    <input id="iptName" className="input" type="text"
                                        {...formikProps.getFieldProps("thumbnail")}
                                    />
                                    <ErrorMessage name="thumbnail">
                                        {msg => <span className="text-danger">{msg}</span>}
                                    </ErrorMessage>
                                </label>

                                <label className="label-input">Categoria
                                    <select className="input s-px-05"
                                        {...formikProps.getFieldProps("tag")}
                                    >
                                        {tags.map(tag => <option key={tag.id} value={(tag.id)}>{tag.name}</option>)}
                                    </select>
                                </label>

                                <label className="label-input s-mb-4">Asesor
                                    <select className="input s-px-05"
                                        {...formikProps.getFieldProps("teacherID")}
                                    >
                                        {students.map(student => <option key={student.id} value={student.id}>{student.name + ' ' + student.lastname}</option>)}
                                    </select>
                                </label>
                                <div className="s-main-center">
                                    {
                                        !updating
                                            ? <button type="submit" className="button green" onClick={() => formikProps.submitForm}>Registrar</button>
                                            : <>
                                                <button className="button"
                                                    type="button"
                                                    onClick={() => formikProps.submitForm()}>
                                                    Actualizar
                                                </button>
                                                <button className="button white ms-3"
                                                    type="button"
                                                    onClick={() => {
                                                        setCourse(initValuesForm)
                                                        setUpdating(false)
                                                    }}>
                                                    Limpiar
                                                </button>
                                            </>
                                    }
                                </div>
                            </Form>
                        </div>
                        <div className="s-cols-8 table-container">
                            <table className="">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Nivel</th>
                                        <th>Miniatura</th>
                                        <th>Categoría</th>
                                        <th>Profesor</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course) => (
                                        <RowCourse course={course}
                                            key={course.id}
                                            Eliminar={(id: number) => handlerEliminar(id)}
                                            Seleccionar={(id: number) => handlerSelecionar(id)}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </Formik>
        </>
    )
}

export default CRUDCourse
