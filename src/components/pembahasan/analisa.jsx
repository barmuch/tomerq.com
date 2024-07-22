import Link from 'next/link';

const Analisa = ({ data }) => {
    if (!data?.analisa) {
        return null;
    }

    return (
        <div className="border-2 border-primary1 rounded-lg">
            <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg text-2xl">Mari Menganalisa!</div>
            <div className="text-justify p-2 lg:text-2xl">
                Pelajari perubahan imbuhan grammar disini =&gt; 
                <Link href={`/analisa/${data.analisa}`} className="underline text-blue hover:text-hover3">Analisa Grammar</Link>
            </div>
        </div>
    );
};

export default Analisa;
