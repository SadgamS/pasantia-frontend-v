import * as yup from "yup";
import moment from "moment";

const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$/g;

export const schema = yup.object({
    nombres: yup.string().required("Ingresa un nombre").matches(regex,"Solo puede introducir letras"),
    apellidos: yup.string().required("Ingresa un apellido").matches(regex,"Solo puede introducir letras"),
    ci: yup.string().required("Ingresa un carnet de identidad").min(5,"Minimo 5 caracteres"),
    expedicion: yup.string().required("Selecciona un departamento"),
    fecha_nacimiento: yup.date().nullable().typeError("Ingresa una fecha valida (dia/mes/año)").min(new Date("1990-01-01"), "Ingresa una fecha valida"),
    genero: yup.string().optional(),
    domicilio: yup.string(),
    ciudad: yup.string().matches(regex,"Solo puede introducir letras"),
    correo: yup.string().email("Ingrese un correo valido"),
    celular: yup.string().matches(/^[0-9 ]*$/, "Ingrese solo numeros"),
    nombre_referencia: yup.string().matches(regex, "Solo puede introducir letras"),
    celular_referencia: yup.string().nullable().matches(/^[0-9 ]*$/, "Ingrese solo numeros"),
  }).required()