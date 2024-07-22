const Teori = ({ data }) => {

return (
    <div className="flex flex-col border-b-2 border-black p-4">
        <div className="items-start font-bold lg:text-2xl">{data?.materiTitle}</div>
        <div className="mt-2 text-justify indent-6 md:text-2xl">
            <div dangerouslySetInnerHTML={{ __html: data?.teori }} />
        </div>
    </div>
)
}

export default Teori