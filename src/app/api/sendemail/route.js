import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer');

export async function POST(request) {

  const formData = await request.formData();

  const emailConfig = {
    from: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
    to: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
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
    pool: true,
    host: process.env.NEXT_PUBLIC_EMAIL_HOST,
    port: Number(process.env.NEXT_PUBLIC_EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    }
  });

  try {
    const send = await transporter.sendMail({
      ...emailConfig,
    });

    console.log(send)

    return NextResponse.json({ message: "Éxito: el correo fue enviado" });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error: No se pudo enviar el mensaje" }, { status: 500 });
  }
}
