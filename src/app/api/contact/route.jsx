import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer');

export async function POST(request) {

  const formData = await request.formData();

  console.log(formData)
  const emailConfig = {
    from: formData.get('correo'),
    to: username,
    replyTo: formData.get('correo'),
    subject: formData.get('titulo'),
    html: `
            <p>Nombre: ${formData.get('nombre')} </p>
            <p>Correo: ${formData.get('correo')} </p>
            <p>Mensaje: ${formData.get('descripcion')} </p>
            `,
    text: `
            Nombre: ${formData.get('nombre')}
            Correo: ${formData.get('correo')}
            Mensaje: ${formData.get('descripcion')}
            `
  }

  // Crear objeto transportador
  const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_EMAIL_HOST,
    port: process.env.NEXT_PUBLIC_EMAIL_PORT,
    requireTLS: false,
    secure: false,
    ignoreTLS: true,
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD
    }
  });

  try {
    await transporter.sendMail({
      ...emailConfig,
    });

    return NextResponse.json({ message: "Éxito: el correo fue enviado" });

  } catch (error) {
    console.log(error);
    return NextResponse.status(500).json({ message: "Error: No se pudo enviar el mensaje" });
  }
}
