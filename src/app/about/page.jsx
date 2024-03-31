import Link from "next/link"
import Image from "next/image"
const About = () => {
  return (
    <div className="h-screen w-screen bg-primary1 flex flex-col items-center p-3 gap-4 lg:gap-8 justify-center my-auto">
      
      <div className="text-4xl text-primary2 cursor-pointer font-bold lg:text-6xl "><Link href="/">tomerQ.com</Link></div>

      <div className="text-xl bg-primary2 p-2 rounded-lg text-justify indent-10 lg:max-w-3xl">tomerQ.com adalah platform pembelajaran grammar Bahasa Turki Online. Materi ini khusus dirancang untuk persiapan dan percepatan calon mahasiswa yang akan menempuh pendidikan di Turki. Materi telah disesuaikan dengan buku TOMER Universitas di Turki dan tersedia dalam beberapa level tingkatan. Mulai petualanganmu disini, yakin usaha sampai!  <button className="bg-primary1 p-2 rounded-lg text-primary2 hover:bg-primary2 hover:text-primary1">mulai</button>
      </div>
      
      <div className="text-2xl text-primary2 font-bold">contact me!
      </div>
      
      <div>
        <div className="flex gap-4 flex-row ">
        <Link href="/">
          <Image src="/github.png" alt="" width={24} height={24} />
        </Link>
        <Link href="/">
          <Image src="/instagram.png" alt="" width={24} height={24} />
        </Link>
        <Link href="/">
          <Image src="/whatsapp.png" alt="" width={24} height={24} />
        </Link>
        <Link href="/">
          <Image src="/gmail.png" alt="" width={24} height={24} />
        </Link>
        </div>
        </div>

    </div>    
  )
}

export default About