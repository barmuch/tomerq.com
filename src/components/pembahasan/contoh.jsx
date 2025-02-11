import Image from 'next/image'
import { useState, useEffect } from "react"
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage"
import { app } from "@/lib/utils/firebase"
import { useSession } from "next-auth/react"

const Contoh = ({ data, kurikulumSlug }) => {
    const { data: session } = useSession()
    const isAdmin = session?.user?.role === "admin" // Cek apakah user adalah admin
    const [imageUrl, setImageUrl] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (data?.contoh?.image) {
            fetchImage(data.contoh.image)
        }
    }, [data])

    const fetchImage = async (imageName) => {
        try {
            const storage = getStorage(app)
            const forestRef = ref(storage, `images/${imageName}.png`)
            const url = await getDownloadURL(forestRef)
            setImageUrl(url)
        } catch (error) {
            console.error("Error getting download URL:", error)
        }
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleUpload = async () => {
        if (!selectedFile) return
        setUploading(true)

        try {
            const storage = getStorage(app)
            const fileName = `${Date.now()}-${selectedFile.name}`
            const fileRef = ref(storage, `images/${fileName}`)

            // Jika ada gambar lama, hapus dulu
            if (data?.contoh?.image) {
                const oldImageRef = ref(storage, `images/${data.contoh.image}.png`)
                await deleteObject(oldImageRef).catch((error) => console.warn("Gagal menghapus gambar lama:", error))
            }

            // Upload gambar baru
            await uploadBytes(fileRef, selectedFile)
            const newUrl = await getDownloadURL(fileRef)
            setImageUrl(newUrl)

            // Update database dengan nama file baru (gantilah dengan API update yang sesuai)
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gambar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ kurikulumSlug, newImageName: fileName })
            })

            alert("Gambar berhasil diunggah!")
        } catch (error) {
            console.error("Error uploading image:", error)
            alert("Gagal mengunggah gambar!")
        } finally {
            setUploading(false)
            setSelectedFile(null)
        }
    }

    const handleDelete = async () => {
        if (!data?.contoh?.image) return

        const confirmDelete = confirm("Apakah Anda yakin ingin menghapus gambar ini?")
        if (!confirmDelete) return

        try {
            const storage = getStorage(app)
            const oldImageRef = ref(storage, `images/${data.contoh.image}.png`)

            await deleteObject(oldImageRef)
            setImageUrl("")

            // Update database untuk menghapus referensi gambar
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gambar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ kurikulumSlug })
            })

            alert("Gambar berhasil dihapus!")
        } catch (error) {
            console.error("Error deleting image:", error)
            alert("Gagal menghapus gambar!")
        }
    }

    return (
        <div className="flex flex-col">
            <div className="items-start font-bold border-black lg:text-2xl m-4">Contoh</div>

            {imageUrl && (
                <div className="relative">
                    <Image 
                        src={imageUrl}
                        alt="Contoh"
                        width={800}
                        height={800}
                        className="pointer-events-none"
                    />
                    {isAdmin && (
                        <button onClick={handleDelete} className="absolute top-2 right-2 bg-red-500 text-black p-2 rounded-md hover:bg-red-600">
                            Hapus Gambar
                        </button>
                    )}
                </div>
            )}

            {isAdmin && (
                <div className="mt-4">
                    <input type="file" onChange={handleFileChange} className="border p-2" />
                    <button 
                        onClick={handleUpload} 
                        className="ml-2 bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-600"
                        disabled={uploading}
                    >
                        {uploading ? "Mengunggah..." : "Upload Gambar"}
                    </button>
                </div>
            )}

            {data?.contoh?.item?.map((item) => (
                <div className="text-justify p-2 lg:text-2xl" key={item.id}>
                    <div dangerouslySetInnerHTML={{ __html: item?.poin }} />
                </div>
            ))}
        </div>
    )
}

export default Contoh
