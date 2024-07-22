const Tips = ({ data }) => {
    if (!data?.tips) {
        return null;
    }

    return (
        <div className="border-2 border-primary1 m-2 rounded-lg">
            <div className="font-medium bg-primary1 text-primary2 inline-block p-1 rounded-br-lg text-2xl">Tips</div>
            <div className="text-justify p-2 lg:text-2xl">
                <div dangerouslySetInnerHTML={{ __html: data?.tips?.item }} />
            </div>
        </div>
    );
}

export default Tips;
