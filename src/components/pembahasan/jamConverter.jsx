import { useState } from "react";
import konversiJamKeTeks from "@/lib/utils/converterJam";
const JamConverter = ({ materiId }) => {
    const [jam, setJam] = useState('');
    const [menit, setMenit] = useState('');
    const [jamTeks, setJamTeks] = useState('');

    if (materiId !== '662cbabe9baf839692c266f7') {
        return null;
    }
    const handleJamChange = (event) => {
        setJam(event.target.value);
    };

    const handleMenitChange = (event) => {
        setMenit(event.target.value);
    };

    const handleKonversiJamKeTeks = () => {
        const hasil = konversiJamKeTeks(jam, menit); // Pastikan fungsi ini diimpor atau didefinisikan
        setJamTeks(hasil);
    };

    return (
        <div className="border-2 border-primary1 m-2 rounded-lg text-2xl">
            <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg">Cari tau!</div>
            <div className="p-2">
                <div className="mr-2">Masukkan Jam, dan lihat bagaimana cara bacanya</div>
                <div className="flex flex-row justify-center">
                    <div className="">
                        <input type="number" value={jam} onChange={handleJamChange} style={{ width: "65px" }} className="px-2 border-2 border-black rounded-lg" />
                        <div className="text-center text-lg">jam</div>
                    </div>
                    <div>.</div>
                    <div className="">
                        <input type="number" value={menit} onChange={handleMenitChange} style={{ width: "65px" }} className="px-2 border-2 border-black rounded-lg" />
                        <div className="text-center text-lg">menit</div>
                    </div>
                </div>
                <div className="justify-center flex mt-2">
                    <button onClick={handleKonversiJamKeTeks} className="bg-primary1 text-primary2 px-2 ml-2 py-1 rounded-lg hover:bg-hover2">konversi</button>
                </div>
                <div>hasil: {jamTeks}</div>
            </div>
        </div>
    );
};

export default JamConverter;
