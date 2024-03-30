import Link from "next/link"
const navbar = () => {
  return (
    <div className="bg-primary1 h-full flex items-center justify-between px-6 sm:px-8 md:px-12 lg:px-16 xl:px-32 text-xl">
      <div className="text-1xl md:text-2xl lg:text-3xl font-semibold italic text-primary2">
            <Link href="/">tomerQ.com</Link>        
      </div>
      <div>
        <ul className="flex gap-4 lg:gap-6 text-lg text-primary2 flex-wrap">
            <li><Link href="/register">daftar</Link></li>
            <li><Link href="/login">masuk</Link></li>
        </ul>
      </div>        
    </div>
  )
}

export default navbar