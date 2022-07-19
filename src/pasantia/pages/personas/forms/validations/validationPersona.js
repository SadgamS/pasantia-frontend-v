import * as yup from "yup";
import moment from "moment";

const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$/g;

export const schema = yup.object({
    nombres: yup.string().required("Ingresa un nombre").matches(regex,"Solo puede introducir letras"),
    primer_apellido: yup.string().required("Ingresa un apellido").matches(regex,"Solo puede introducir letras"),
    segundo_apellido: yup.string().matches(regex,"Solo puede introducir letras"),
    ci: yup.string().required("Ingresa un carnet de identidad").min(5,"Minimo 5 caracteres"),
    expedicion: yup.string().required("Selecciona un departamento"),
    fecha_nacimiento: yup.date().nullable().required("Ingrese una fecha de nacimiento").typeError("Ingresa una fecha valida (dia/mes/año)").min(new Date("1990-01-01"), "Ingresa una fecha valida").test("fecha_nacimiento", "Tine que ser una persona mayor de 18 años", function (value) {
      return moment().diff(moment(value, "YYYY-MM-DD"), "years") >= 18;
    }),
    genero: yup.string().required("Seleccione un genero"),
    domicilio: yup.string().required("Ingrese su domicilio"),
    ciudad: yup.string().required("Ingrese ciudad de residencia").matches(regex,"Solo puede introducir letras"),
    correo: yup.string().email("Ingrese un correo valido"),
    celular: yup.string().required("Ingrese un celular").matches(/^[0-9 ]*$/, "Ingrese solo numeros"),
    nombre_referencia: yup.string().required("Ingresa un nombre de refrencia").matches(regex, "Solo puede introducir letras"),
    celular_referencia: yup.string().nullable().required("Ingrese un celular").matches(/^[0-9 ]*$/, "Ingrese solo numeros"),
  }).required()