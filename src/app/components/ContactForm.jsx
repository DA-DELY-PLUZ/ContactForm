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
        throw new Error(`Estado de respuesta: ${response.status}`);
      }
      alert('Mensaje enviado exitosamente');
    } catch (err) {
      alert("Error, por favor intenta enviar el formulario nuevamente");
    }
  }

  return (
    <main className="form-container">
      {/* Imagen del sobre */}
      <img
        src="/images/envelope-icon.png" 
        alt="Envelope Icon"
        className="form-image"
      />
      
      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <h2>HAVE SOME QUESTIONS?</h2>
        <div>
          <label htmlFor="form-name">Nombre:</label>
          <input id="form-name" autoComplete="nombre" maxLength={50} name="nombre" />
        </div>
        <div>
          <label htmlFor="form-email">Correo electrónico:</label>
          <input id="form-email" type="email" autoComplete="correo" maxLength={80} name="correo" />
        </div>
        <div>
          <label htmlFor="form-title">Título del problema:</label>
          <input id="form-title" autoComplete="titulo" maxLength={50} name="titulo" />
        </div>
        <div>
          <label htmlFor="form-message">Descripción del problema:</label>
          <textarea id="form-message" name="descripcion" rows={5}></textarea>
        </div>
        <div>
          <label htmlFor="form-phone">Teléfono (opcional):</label>
          <input id="form-phone" type="tel" name="telefono" maxLength={15} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}
