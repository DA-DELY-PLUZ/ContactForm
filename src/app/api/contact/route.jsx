import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer');

// Maneja solicitudes POST a /api

export async function POST(request) {

    const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
    const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;
    const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

    console.log("Procesando la solicitud");
    const formData = await request.formData();
    const name = formData.get('nombre');
    const email = formData.get('correo');
    const message = formData.get('descripcion');
    const title = formData.get('titulo');

    // Crear objeto transportador
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },

        auth: {
            user: username,
            pass: password
        }
    });

    try {

        const mail = await transporter.sendMail({
            from: username,
            to: myEmail,
            replyTo: email,
            subject: `${title}`,
            html: `
            <p>Nombre: ${name} </p>
            <p>Correo: ${email} </p>
            <p>Mensaje: ${message} </p>
            `,
        });

        return NextResponse.json({ message: "Éxito: el correo fue enviado" });

    } catch (error) {
        console.log(error);
        return NextResponse.status(500).json({ message: "Error: No se pudo enviar el mensaje" });
    }
}
