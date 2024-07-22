const Catatan = ({ data }) => {
    if (!data?.catatan?.item) {
        return null;
    }

    return (
        <div className="border-2 border-primary1 m-2 rounded-lg lg:text-2xl">
            <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg text-2xl">Catatan</div>
            {data?.catatan?.item?.map((item) => (
                <div className="text-justify p-2 lg:text-2xl" key={item.id}>
                    <div dangerouslySetInnerHTML={{ __html: item?.poin }} />
                </div>
            ))}
        </div>
    );
}

export default Catatan;
