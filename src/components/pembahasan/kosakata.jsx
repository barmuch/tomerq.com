const Kosakata = ({ data }) => {
    if (!data?.kosakata?.item) {
        return null;
    }

    return (
        <div className="border-2 border-primary1 m-2 rounded-lg lg:text-2xl">
            <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg">Kosakata</div>
            <div className="text-justify p-2 flex flex-col lg:flex-row flex-wrap lg:pl-10">
                {data.kosakata.item.map((item) => (
                    <div className="w-1/2 mb-2 text-start" key={item.id}>
                        <li>{item.poin}</li>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Kosakata;
