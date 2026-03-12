import React, { useState } from 'react'
import './DiseñoRegistro.css'
import Swal from 'sweetalert2'

function RegistroUsuarios() {

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validarFormulario = () => {

    const { nombre, correo, telefono, password } = formData

    // validar campos vacíos
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
      })
      return false
    }

    // validar correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!regexCorreo.test(correo)) {
      Swal.fire({
        icon: "error",
        title: "Correo inválido",
        text: "Debe ingresar un correo válido con @"
      })
      return false
    }

    // validar teléfono
    const regexTelefono = /^[0-9]+$/

    if (!regexTelefono.test(telefono)) {
      Swal.fire({
        icon: "error",
        title: "Teléfono inválido",
        text: "El teléfono solo debe contener números."
      })
      return false
    }

    // validar contraseña
    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Contraseña inválida",
        text: "La contraseña debe tener al menos 8 caracteres."
      })
      return false
    }

    return true
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    if (!validarFormulario()) return

    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "El usuario se ha registrado correctamente",
      confirmButtonColor: "#5b21b6"
    })

    setFormData({
      nombre: "",
      correo: "",
      telefono: "",
      password: ""
    })
  }

  return (

    <div className="contenedorRegistro">

      {/* LADO IZQUIERDO */}

      <div className="ladoImagen">

        <div className="overlay">

          <h1>El camino a tu nuevo vehículo comienza aquí</h1>

          <p>
            Únete a miles de personas que han confiado
            en nuestra gestión inteligente de créditos automotrices.
          </p>

        </div>

      </div>

      {/* LADO DERECHO */}

      <div className="ladoFormulario">

        <form className="formRegistro" onSubmit={handleSubmit}>

          <h2>Crear Cuenta</h2>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">
            Crear Cuenta
          </button>

          <p className="loginText">
            ¿Ya tienes cuenta? <span>Iniciar sesión</span>
          </p>

        </form>

      </div>

    </div>
  )
}

export default RegistroUsuarios