"use client"
import Navbar from "@/components/navbar"
import {useState, useEffect} from "react"

const Pembahasan = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)


return (
    <div className=" flex flex-col max-h-screen">
        {/* navbar */}
        <div className="h-1/12 bg-primary1 text-primary2"><Navbar/></div>
        {/* content */}
        <div className="max-w-full bg-primary1 py-5 border-t-2 border-primary2 flex flex-col gap-4 lg:flex-row lg:px-4 max-h-full">
            {/* teori dan contoh */}
            <div className="flex flex-col gap-4 py-5  w-11/12 bg-primary2 mx-auto rounded-lg lg:px-4 lg:w-3/5 flex-1 overflow-y-auto">
                {/* Teori */}
                <div className="flex flex-col border-b-2 border-black h-2/3">
                    <div className="items-start font-bold "> Judul Materi</div>
                    <div className="text-justify indent-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sunt doloribus ut, molestiae quidem corporis modi eum minus quibusdam inventore veniam vero nihil quasi ratione mollitia corrupti. Eius, amet inventore. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio, ipsam. Qui veniam neque atque dolor hic distinctio veritatis beatae, dicta possimus inventore ab vitae voluptates voluptatibus eaque quos accusantium mollitia, perspiciatis at recusandae, cupiditate quaerat? Recusandae vero aut adipisci aperiam ratione est maxime corrupti molestias, asperiores facilis dolorum veniam, fugit reiciendis! Eius dolore blanditiis impedit inventore voluptas consectetur numquam expedita repellat deserunt necessitatibus sint illo voluptatem cum voluptate reiciendis veniam est tempora eveniet pariatur facere ipsam, dignissimos ipsa ducimus. Quibusdam quisquam voluptatem officia fugit et a inventore culpa doloremque! In molestias id odit. Sint, rerum id ad ipsum quod officia voluptates voluptate alias dolore consequatur aliquam quis at deleniti tenetur! Repellendus quis voluptate blanditiis dolor eius illum, laboriosam labore sapiente nesciunt voluptatem illo, accusantium beatae rem! Earum officia architecto culpa fugit harum tenetur libero incidunt ducimus quos voluptatum asperiores recusandae nostrum debitis magnam assumenda molestiae ipsum at facere inventore ipsam adipisci, quo praesentium excepturi quisquam? Harum sed quod architecto, tenetur labore totam sequi exercitationem iste nobis neque, natus dignissimos quaerat ipsa aut odit impedit id suscipit consequuntur. Non eos expedita iure enim, tempora eveniet. Non sint perspiciatis pariatur dolor dignissimos expedita assumenda corrupti. Accusantium molestiae, impedit perspiciatis laborum rem facere.</div>
                </div>
                {/* contoh */}
                <div className="h-1/3">
                    <div className="items-start font-bold border-black">contoh</div>
                    <div className="text-justify indent-6"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque modi qui eum doloribus deserunt. Deserunt architecto recusandae quibusdam provident aspernatur!. Lorem ipsum dolor sit amet consectetur adipisicing elit. In alias doloremque officiis? Nobis pariatur amet quis ipsum illum expedita maiores earum, assumenda id accusamus perferendis quisquam natus nostrum saepe repudiandae inventore veniam corporis dolores mollitia asperiores accusantium vero sed iure? Veniam quod officia eligendi harum obcaecati numquam minima dignissimos repellendus! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam fugit nemo quisquam optio mollitia perferendis neque quae corrupti aut illo voluptates, minus non incidunt reprehenderit. Nobis ad consectetur delectus nulla, ullam molestias, omnis dolore numquam iusto atque veniam aut sit! Itaque quae officiis perspiciatis dolores praesentium debitis consequatur vero mollitia neque, ipsa sit iure, nobis officia? Dignissimos praesentium modi perspiciatis quae ad recusandae voluptate nam, sint iste facere adipisci eius quam ex. Sequi, alias tempore eum amet molestiae explicabo!</div>
                </div>
            </div>
            {/* latihan */}
            <div className="flex flex-col gap-4 py-5  w-11/12 bg-primary2 h-11/12 mx-auto rounded-lg px-4 items-start grid w-2/5">
                <div className="font-bold justify"> Judul Materi</div>
                
                <div className="text-justify indent-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sunt doloribus ut, molestiae quidem corporis modi eum minus quibusdam inventore veniam vero nihil quasi ratione mollitia corrupti. Eius, amet inventore.</div>
                
                <div className="justify-self-end flex flex-row gap-2">
                    <button className="border-2 rounded-lg w-2/3 border-primary1 text-primary1 font-bold">Tanya Forum</button>
                    <button className="bg-primary1 p-2 rounded-lg text-primary2 hover:bg-primary2 hover:text-primary1 w-1/2  ">cek</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pembahasan