import prisma from "@/lib/utils/connect";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json(); // Pastikan ini berhasil membaca body

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Semua field harus diisi" }), { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User sudah terdaftar!" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return new Response(JSON.stringify({ message: "User berhasil dibuat", user }), { status: 201 });
  } catch (error) {
    console.error("Error pada register API:", error); // Tambahkan logging
    return new Response(JSON.stringify({ error: "Terjadi kesalahan server" }), { status: 500 });
  }
}
