import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage"
import { storage } from "@/lib/utils/firebase" // Pastikan storage sudah diekspor dengan benar
import { prisma } from "@/lib/utils/connect" // Pastikan Prisma sudah dikonfigurasi

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { action, materiId, imageName, file } = req.body

        try {
            if (!materiId) return res.status(400).json({ error: "materiId diperlukan" })

            if (action === "upload") {
                if (!file) return res.status(400).json({ error: "File tidak ditemukan" })

                const fileName = `${Date.now()}-${file.name}`
                const fileRef = ref(storage, `images/${fileName}`)

                // Hapus gambar lama jika ada
                if (imageName) {
                    const oldImageRef = ref(storage, `images/${imageName}`)
                    await deleteObject(oldImageRef).catch(() => null)
                }

                // Upload gambar baru ke Firebase Storage
                await uploadBytes(fileRef, Buffer.from(file, "base64"))
                const downloadURL = await getDownloadURL(fileRef)

                // Update nama gambar di database dengan Prisma
                await prisma.pembahasan.updateMany({
                    where: { materiId: materiId },
                    data: { contoh: { update: { image: fileName } } }
                })

                return res.status(200).json({ success: true, imageUrl: downloadURL })
            }

            if (action === "delete") {
                if (!imageName) return res.status(400).json({ error: "Nama gambar tidak ditemukan" })

                const imageRef = ref(storage, `images/${imageName}`)
                await deleteObject(imageRef)

                // Hapus referensi gambar dari database
                await prisma.pembahasan.updateMany({
                    where: { materiId: materiId },
                    data: { contoh: { update: { image: null } } }
                })

                return res.status(200).json({ success: true, message: "Gambar berhasil dihapus" })
            }

            return res.status(400).json({ error: "Aksi tidak valid" })
        } catch (error) {
            console.error("API Error:", error)
            return res.status(500).json({ error: error.message })
        }
    }

    res.status(405).json({ error: "Method Not Allowed" })
}
