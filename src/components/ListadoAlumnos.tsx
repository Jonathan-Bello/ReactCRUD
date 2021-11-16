import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Alumno } from '../models/Alumno'
import * as Yup from 'yup'
import { Carrera } from '../models/Carrera';
import { useState } from 'react';
import AlumnoTr from './AlumnoTr';

const ListadoAlumnos = () => {
    const valoresIniciales: Alumno = {
        NoControl: '',
        Nombre: '',
        Carrera: 'Sin Carrera',
        Semestre: 1,
        Inscrito: false
    }

    const carreras: Carrera[] = [
        { Id: 1, Nombre: "Sistemas Computacionales" },
        { Id: 2, Nombre: "Informática" },
        { Id: 3, Nombre: "Mecatrónica" },
        { Id: 4, Nombre: "Gestión" },
    ]

    const validaciones = Yup.object({
        Nombre: Yup.string().required("El nombre es necesario"),
        NoControl: Yup.string().required("El numero de controk es requerido")
            .min(8, "El NoControl requiere minimo 8 caracteres"),
        Semestre: Yup.number().typeError("Solo se aceptan numeros")
            .required("El semestre es requerido")
            .min(1, 'No seas baboso')
            .max(12, "El semestre maximo es 12")
    })

    const [alumno, setAlumno] = useState<Alumno>(valoresIniciales)
    const [alumnos, setAlumnos] = useState<Alumno[]>([])
    const [actualizar, setActualizar] = useState<boolean>(false)

    // carga los valores al form
    const handlerSelecionar = (nc: string) => {
        setAlumno(alumnos.find(a => a.NoControl === nc)!)
        setActualizar(true)
    }

    const handlerEliminar = (nc: string) => {
        // Usamos un filtro, creando un nuevo array sin el alumno que definamos
        setAlumnos(alumnos.filter(a => a.NoControl !== nc))
        setAlumno(valoresIniciales)
        setActualizar(false)
    }

    return (
        <>
            <Formik initialValues={alumno}
                enableReinitialize={true}
                onSubmit={(valores: Alumno, { resetForm }) => {
                    // relizamos una desestructuración para crear un array independiente al original
                    // const alumnosTemp : Alumno[] = [...alumnos]
                    // alumnosTemp.push(valores)
                    // setAlumnos(alumnosTemp)

                    // Buscamos y guardamos el alumno con el numero de control obtenido
                    // Agregamos el ! al final para TypeScript no asigne el posible undefiend

                    if (!actualizar) {
                        const alumnoTemp: Alumno = alumnos.find(a => a.NoControl === valores.NoControl)!
                        // Verificamos si el alumnoTemp se encuentra ya registrado
                        if (alumnos.includes(alumnoTemp)) {
                            alert("Este NoControl ya fue asignado")
                        } else {
                            setAlumnos([...alumnos, valores])
                            resetForm()
                        }
                    } else {
                        const index = alumnos.findIndex(a => a.NoControl === valores.NoControl)
                        const arrayTemp = [...alumnos]
                        arrayTemp[index] = valores
                        setAlumnos(arrayTemp)
                        resetForm()
                        setActualizar(false)
                    }
                }}
                validationSchema={validaciones}
            >
                {(formikProps) => (
                    <Form>
                        <div className="container cols-12">
                            <div className="row mb-3">
                                <div className="cols-4">
                                    <label htmlFor="txtNoControl">NoControl</label>
                                    <input id="txtNoControl"
                                        type="text"
                                        readOnly={!actualizar ? false : true}
                                        className="form-control"
                                        {...formikProps.getFieldProps("NoControl")}
                                    />
                                    <ErrorMessage name="NoControl">
                                        {mensaje => <span className="text-danger">{mensaje}</span>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="cols-4">
                                    <label htmlFor="txtNombre">Nombre</label>
                                    <input id="txtNombre" type="text" className="form-control"
                                        {...formikProps.getFieldProps("Nombre")}
                                    />
                                    <ErrorMessage name="Nombre">
                                        {mensaje => <span className="text-danger">{mensaje}</span>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="cols-4">
                                    <label htmlFor="txtSemestre">Semestre</label>
                                    <input id="txtSemestre" type="number" className="form-control"
                                        {...formikProps.getFieldProps("Semestre")}
                                    />
                                    <ErrorMessage name="Semestre">
                                        {mensaje => <span className="text-danger">{mensaje}</span>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="cols-4">
                                    <label htmlFor="txtCarrera">Carrera</label>
                                    <select id="cmbCarreras" className="form-select"
                                        {...formikProps.getFieldProps('Carrera')}>
                                        <option value="Sin carrera">-------------</option>
                                        {carreras.map(carrera => <option key={carrera.Id} value={carrera.Nombre}>{carrera.Nombre}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="cols-4">
                                    <Field className="form-check-input" type="checkbox" id="chkInscrito" name="Inscripto"></Field>
                                    <label className="form-check-label" htmlFor="Inscripto">¿Alumno inscrito?</label>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12 text-center">
                                    {
                                        !actualizar ?
                                            <button className="btn btn-lg btn-success"
                                                type="button"
                                                onClick={() => formikProps.submitForm()}
                                            >Guardar alumno</button>
                                            : <>
                                                <button className="btn btn-lg btn-warning"
                                                    type="button"
                                                    onClick={() => formikProps.submitForm()}>
                                                    Actualizar alumno
                                                </button>
                                                <button className="btn btn-lg btn-dark ms-3"
                                                    type="button"
                                                    onClick={() => {
                                                        setAlumno(valoresIniciales)
                                                        setActualizar(false)
                                                        // formikProps.submitForm()
                                                    }}>
                                                    Limpiar
                                                </button>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="container">
                <h3 className="text-success text-center">Contenido del arreglo</h3>
                {alumnos.length > 0 ?
                    <table className="table table-striped">
                        <thead>
                            <th>NoControl</th>
                            <th>Nombre</th>
                            <th>Carrera</th>
                            <th>Semestre</th>
                            <th>Inscrito</th>
                        </thead>
                        <tbody>
                            {alumnos.map((alumno, index) => (
                                // <CAlumno
                                // />
                                <AlumnoTr
                                    Eliminar={(nc: string) => handlerEliminar(nc)}
                                    Seleccionar={(nc: string) => handlerSelecionar(nc)}
                                    key={alumno.NoControl}
                                    alumnoProps={alumno}
                                />

                            ))}
                        </tbody>

                    </table>
                    : <div className="alert-danger"><h4 className="text-center">Sin contenido</h4></div>
                }
            </div>
        </>
    )
}

export default ListadoAlumnos
