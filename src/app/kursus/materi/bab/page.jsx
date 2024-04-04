const bab  = () => {
  return (
    <div className="flex flex-col w-max-full"> 
        {/* topbar */}
        <div className="bg-primary2 text-primary1 text-4xl font-bold p-3 lg:px-3 lg:py-1">
            Bab 1
        </div>
        {/* content */}
        <div className="bg-primary1 flex flex-col gap-4 py-4 items-center">
            {/* teori & example */}
            <div className="flex flex-col bg-primary2 text-2xl p-3 w-4/5 rounded-lg">
                <div className="justify-items-start"> 
                    -lar -ler
                </div>
                <div className=" text-justify py-2 border-b-2 border-primary1 indent-8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 15. Lorem Ipsu is simply dummy text of the printing and typesetting industry.</div>
                <div className="justify-items-start py-2">Contoh :</div>
                <div className=" text-justify py-2 indent-8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 15</div>
            </div>
            {/* exercise */}
            <div></div>
        </div>
        {/* bottombar */}
        <div></div> 
    </div>
  )
}

export default bab 