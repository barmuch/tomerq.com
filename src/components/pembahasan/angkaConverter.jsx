import { useState } from "react";
import converterAngka from "@/lib/utils/converterAngka";

const AngkaConverter = ({ materiId }) => {
    const [angkaInput, setAngkaInput] = useState('');
    const [teksOutput, setTeksOutput] = useState('');

    if (materiId !== '662cb0d79baf839692c266b4') {
        return null;
    }

    const handleInputChange = (event) => {
        setAngkaInput(event.target.value);
    };

    const konversiAngkaKeTeks = () => {
        const angka = parseInt(angkaInput, 10);
        if (!isNaN(angka)) {
            const teks = converterAngka(angka);
            setTeksOutput(teks);
        } else {
            setTeksOutput('Masukkan angka yang valid');
        }
    };

    return (
        <div className="border-2 border-primary1 m-2 rounded-lg text-2xl">
            <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg">Cari tau!</div>
            <div className="p-2">
                <div className="mr-2">Masukkan angka yang ingin kamu cari tau</div>
                <input type="number" value={angkaInput} onChange={handleInputChange} />
                <button onClick={konversiAngkaKeTeks} className="bg-primary1 text-primary2 px-2 ml-2 py-1 rounded-lg hover:bg-hover2">konversi</button>
                <div>hasil: {teksOutput}</div>
            </div>
        </div>
    );
};

export default AngkaConverter;
