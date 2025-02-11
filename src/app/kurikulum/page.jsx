"use client"
import Navbar from "@/components/navbar"
import Link from "next/link";
import { useState, useEffect } from 'react';
import Loading from "@/components/loading/page";
import { useSession } from "next-auth/react";

const Kurikulum = () => {
    const { data: session } = useSession();
    const userRole = session?.user?.role || "user"; 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentKurikulum, setCurrentKurikulum] = useState({ title: "", slug: "" });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kurikulums`);
            if (!res.ok) throw new Error("Failed to fetch data");
            const jsonData = await res.json();
            setData(jsonData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const handleDelete = async (slug) => {
        if (!confirm("Apakah Anda yakin ingin menghapus kurikulum ini?")) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kurikulums/${slug}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Gagal menghapus kurikulum");

            setData(data.filter((item) => item.slug !== slug));
            alert("Kurikulum berhasil dihapus!");
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    const handleSave = async () => {
        if (!currentKurikulum.title) {
            alert("Judul tidak boleh kosong!");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kurikulums${isEditing ? `/${currentKurikulum.slug}` : ""}`, {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: currentKurikulum.title }),
            });

            if (!res.ok) throw new Error("Gagal menyimpan data");

            setIsModalOpen(false);
            fetchData();
            alert(`Kurikulum ${isEditing ? "diperbarui" : "ditambahkan"}!`);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="h-screen flex flex-col">
            <div className="md:h-12 bg-primary1 text-primary2"><Navbar /></div>

            <div className="flex-1 flex max-w-full bg-primary1 py-5 border-t-2 border-primary2 overflow-hidden">
                <div className="flex flex-col gap-4 py-5 w-11/12 bg-primary2 mx-auto rounded-lg px-4 overflow-y-auto">
                    
                    <div className="text-2xl text-black font-bold lg:text-4xl justify-center flex text-center">
                        Welcome to tomerQ.com
                    </div>

                    <div className="flex flex-col bg-primary2 text-black p-2 rounded-lg w-11/12 lg:w-3/5 text-justify indent-4 gap-2 mx-auto justify-center lg:text-2xl">
                        <div>“Salah satu pengerdilan dalam hidup adalah membiarkan pikiran yang cemerlang menjadi budak bagi tubuh yang malas, yang mendahulukan istirahat sebelum lelah.”</div>
                        <div className="text-center">- H A M K A -</div>
                    </div>

                    <div className="text-xl lg:text-3xl text-black font-bold w-11/12 lg:w-3/5 mx-auto flex justify-between items-center">
                        <div>Kurikulum</div>
                        {userRole === "admin" && (
                            <button onClick={() => { setIsEditing(false); setCurrentKurikulum({ title: "" }); setIsModalOpen(true); }} 
                                    className="bg-green text-white px-4 py-2 rounded-lg hover:bg-greenHover text-xl lg:text-2xl">
                                + Add New
                            </button>
                        )}
                    </div>

                    {data?.map((kurikulum) => (
                        <div key={kurikulum.slug} className="flex flex-row items-center justify-between bg-primary2 text-black p-4 rounded-lg mx-auto w-11/12 lg:w-3/5 cursor-pointer border-2 border-black">
                            <Link href={`/kurikulum/${kurikulum.slug}`} className="text-lg font-medium hover:bg-hover1 flex-grow">
                                {kurikulum.title}
                            </Link>

                            {userRole === "admin" && (
                                <div className="flex gap-2">
                                    <button onClick={() => { setIsEditing(true); setCurrentKurikulum(kurikulum); setIsModalOpen(true); }} 
                                            className="bg-yellow text-white px-2 py-1 rounded hover:bg-yellow-600">
                                        ✏️ Edit
                                    </button>
                                    <button onClick={() => handleDelete(kurikulum.slug)} 
                                            className="bg-primary1 text-white px-2 py-1 rounded hover:bg-red-600">
                                        🗑 Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>  
            </div>

            {/* Modal Create / Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Kurikulum" : "Tambah Kurikulum"}</h2>
                        <input 
                            type="text"
                            value={currentKurikulum.title}
                            onChange={(e) => setCurrentKurikulum({ ...currentKurikulum, title: e.target.value })}
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Masukkan Judul"
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Batal</button>
                            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-black rounded">{isEditing ? "Simpan" : "Tambah"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Kurikulum;
