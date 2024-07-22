import Image from 'next/image'
import { useState, useEffect } from "react"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { app } from "@/lib/utils/firebase"

const Contoh = ({ data }) => {
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        if (data?.contoh?.image) {
            const storage = getStorage(app)
            const forestRef = ref(storage, `images/${data?.contoh?.image}.png`)
            
            getDownloadURL(forestRef)
                .then((url) => {
                    setImageUrl(url)
                })
                .catch((error) => {
                    console.error("Error getting download URL:", error)
                })
        }
    }, [data])

    if (!data?.contoh) {
        return null
    }

    return (
        <div className="flex flex-col">
            <div className="items-start font-bold border-black lg:text-2xl m-4">Contoh</div>
            {data?.contoh?.image && (
                <Image 
                    src={imageUrl}
                    alt=""
                    width={800}
                    height={800}
                    className="pointer-events-none" 
                />
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
