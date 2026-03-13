import { useState } from 'react';
import Swal from 'sweetalert2';

export const useRegistroUsuariosLogica = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validarFormulario = () => {
    const { nombre, correo, telefono, password } = formData;

    if (
      nombre.trim() === "" ||
      correo.trim() === "" ||
      telefono.trim() === "" ||
      password.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "No se permiten campos vacíos o con espacios."
      });
      return false;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      Swal.fire({
        icon: "error",
        title: "Correo inválido",
        text: "Debe ingresar un correo válido con @"
      });
      return false;
    }

    const regexTelefono = /^[0-9]+$/;
    if (!regexTelefono.test(telefono)) {
      Swal.fire({
        icon: "error",
        title: "Teléfono inválido",
        text: "El teléfono solo debe contener números."
      });
      return false;
    }

    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Contraseña inválida",
        text: "La contraseña debe tener al menos 8 caracteres."
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "El usuario se ha registrado correctamente",
      confirmButtonColor: "#5b21b6"
    });

    setFormData({
      nombre: "",
      correo: "",
      telefono: "",
      password: ""
    });
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
};
