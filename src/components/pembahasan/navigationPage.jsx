import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navigation = ({ data, materiId }) => {
    const router = useRouter();
    const [allMateri, setAllMateri] = useState([]);

    useEffect(() => {
        if (data) {
            const getAllMateri = async () => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kurikulums/${data.kurikulumSlug}`);
                    if (!res.ok) {
                        throw new Error("Failed to fetch all materi");
                    } else {
                        const kurikulumData = await res.json();
                        setAllMateri(kurikulumData.materi);
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            getAllMateri();
        }
    }, [data]);

    const handleNextClick = () => {
        const sortedMateri = allMateri.sort((a, b) => a.nomor - b.nomor);
        const currentIndex = sortedMateri.findIndex(materi => materi.id === materiId);
        const nextMateri = sortedMateri[currentIndex + 1];
        if (nextMateri) {
            router.push(`/kurikulum/${data.kurikulumSlug}/${nextMateri.id}/pembahasan`);
        }
    };

    return (
        <div className="justify-self-end flex flex-row gap-2 text-2xl">
            <button className="border-2 rounded-lg w-2/3 border-primary1 text-primary1 font-bold cursor-pointer hover:bg-hover1">
                Tanya Forum
            </button>
            <button
                className="bg-primary1 p-2 rounded-lg text-primary2 hover:bg-hover2 cursor-pointer w-1/2"
                onClick={handleNextClick}
            >
                lanjut
            </button>
        </div>
    );
};

export default Navigation;
