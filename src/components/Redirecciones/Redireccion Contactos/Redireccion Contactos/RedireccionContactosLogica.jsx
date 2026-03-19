import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

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
    
    // Si viene de un vehículo, construimos el mensaje especial para WP
    let finalMessage = formData.message;
    
    if (initialVehicle) {
      const vehicleUrl = `${window.location.origin}/details/${initialVehicle.id}`;
      finalMessage = `Hola estoy interesado en este modelo: ${vehicleUrl} y quiero saber sobre el vehiculo`;
    }

    if (!finalMessage && !initialVehicle) {
      Swal.fire({
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
