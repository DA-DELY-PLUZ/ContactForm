"use client";

export default function ContactForm() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    
    const name = formData.get("nombre");
    const email = formData.get("correo");
    const title = formData.get("titulo");
    const message = formData.get("descripcion");

   
    if (!name || name.trim().length === 0) {
      alert("Por favor, ingresa un nombre válido.");
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

   
    if (!title || title.trim().length === 0) {
      alert("Por favor, ingresa un título para el problema.");
      return;
    }

    
    if (!message || message.trim().length < 10) {
      alert("La descripción debe tener al menos 10 caracteres.");
      return;
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_URL, {
        method: 'post',
        body: formData,
      });

      if (!response.ok) {
        console.log("Error al enviar el mensaje");
        throw new Error(`Estado de respuesta: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData.message);

      alert('Mensaje enviado exitosamente');
    } catch (err) {
      console.error(err);
      alert("Error, por favor intenta enviar el formulario nuevamente");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col w-500">
          <label htmlFor="form-name">Nombre:</label>
          <input
            id="form-name"
            autoComplete="nombre"
            maxLength={50}
            size="lg"
            name="nombre"
            className="text-black"
          />

          <label htmlFor="form-email">Correo electrónico:</label>
          <input
            id="form-email"
            required
            autoComplete="correo"
            maxLength={80}
            name="correo"
            type="email"
            className="text-black"
          />

          <label htmlFor="form-title">Título del problema:</label>
          <input
            id="form-tittle"
            required
            autoComplete="titulo"
            maxLength={50}
            size="lg"
            name="titulo"
            className="text-black"
          />

          <label htmlFor="form-message">Descripción del problema:</label>
          <textarea
            id="form-message"
            required
            name="descripcion"
            rows={5}
            className="text-black"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button className="rounded bg-sky-400 px-4 py-2" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </main>
  );
}
