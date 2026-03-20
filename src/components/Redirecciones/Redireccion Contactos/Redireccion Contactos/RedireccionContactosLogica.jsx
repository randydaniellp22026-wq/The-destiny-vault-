import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const darkSwal = {
  background: '#0a0a0a',
  color: '#fff',
  confirmButtonColor: '#eab308'
};

export const useRedireccionContactosLogica = () => {
  const location = useLocation();
  const initialVehicle = location.state?.vehicle;

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    subject: initialVehicle ? 'Cotización de vehículo' : 'Asesoría de crédito',
    message: ''
  });

  // No pre-llenamos el mensaje para que el formulario se vea limpio
  useEffect(() => {
    // Solo actualizamos el asunto si es necesario, pero mantenemos el mensaje vacío
  }, [initialVehicle]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const { user_name, user_email, user_phone, message } = formData;

    // Validación básica de campos obligatorios
    if (!user_name.trim() || !user_email.trim() || !user_phone.trim()) {
      Swal.fire({
        ...darkSwal,
        icon: 'error',
        title: 'Campos obligatorios',
        text: 'Por favor, ingresa tu nombre, correo y teléfono.',
        confirmButtonColor: '#eab308'
      });
      return;
    }

    // Validación de formato de correo
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(user_email)) {
      Swal.fire({
        ...darkSwal,
        icon: 'error',
        title: 'Correo inválido',
        text: 'Por favor, ingresa un formato de correo electrónico válido.',
        confirmButtonColor: '#eab308'
      });
      return;
    }

    // Validación de teléfono (solo números)
    const regexPhone = /^[0-9+]+$/;
    if (!regexPhone.test(user_phone)) {
      Swal.fire({
        ...darkSwal,
        icon: 'error',
        title: 'Teléfono inválido',
        text: 'El teléfono debe contener solo números (y opcionalmente el símbolo +).',
        confirmButtonColor: '#eab308'
      });
      return;
    }
    
    // Si viene de un vehículo, construimos el mensaje especial para WP
    let finalMessage = message;
    
    if (initialVehicle) {
      const vehicleUrl = `${window.location.origin}/details/${initialVehicle.id}`;
      finalMessage = `Hola mi nombre es ${user_name}, estoy interesado en este modelo: ${vehicleUrl}. Mi contacto es ${user_phone}.`;
    }

    if (!finalMessage && !initialVehicle) {
      Swal.fire({
        ...darkSwal,
        icon: 'warning',
        title: 'Mensaje vacío',
        text: 'Por favor escribe tu consulta.',
        confirmButtonColor: '#eab308'
      });
      return;
    }

    const companyPhone = "+50664769091";
    const token = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyNSJ9.eyJleHAiOjE3NzQwMjAzODQsInBob25lIjoiKzUwNjY0NzY5MDkxIiwiY29udGV4dCI6IkFmY04tRXNxR0QyMVpMbHkwdlhERFNndGlMamEyTzh1eW5oa3RWUkU2M0R1b2pWRDlVWGhDZE5HbDk2ZEJTN2tHbGdfcUpRellmVmhGUjFTREhRTVlzRnB1Y0VMZlRhZmVUTm5udVl3RHRFX1hGS0NRUUIxY2xPUWlBLUxBY25ZV05lQl9HT3N1UWhpLWl2LTFYRUhxMU1xcHciLCJzb3VyY2UiOiJGQl9QYWdlIiwiYXBwIjoiZmFjZWJvb2siLCJlbnRyeV9wb2ludCI6InBhZ2VfY3RhIn0.LgxgM9wEllIT7HL5PlDfvscTzkZOyLKfRnUvwDUQDvDUxFShoWWbHougyHjr0tFz3E38fX8e0bnTUpya-P0mXW&fbclid=IwY2xjawQo9ShleHRuA2FlbQIxMABicmlkETAxWW9KQlEwdFRtWjVsSmdhc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHm20Lw8hPwP0BkS0-kvrzhVm581fF10FntyC5-3LdNeVEap4xxg1AhF19mCe_aem_TYKjMTCG48V95ufM0NEiEA";
    
    // Usamos el formato codificado para asegurar que aparezca en la barra de texto
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(companyPhone)}&text=${encodedMessage}&token=${token}`;

    window.open(whatsappUrl, '_blank');
    
    Swal.fire({
      icon: 'success',
      title: 'Redirigiendo a WhatsApp',
      text: 'Se abrirá una ventana para completar el envío.',
      timer: 2000,
      showConfirmButton: false
    });
  };

  return {
    formData,
    loading,
    handleChange,
    sendEmail
  };
};
