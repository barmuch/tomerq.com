import Link from "next/link"
const navbar = () => {
  return (
    <div className="h-fit flex items-center justify-between p-1 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-32">
      <div className="text-2xl md:text-3xl lg:text-4xl font-semibold italic">
            <Link href="/">tomerQ.com</Link>        
      </div>
      <div>
        <ul className="flex gap-4 lg:gap-6 text-md  ">
            <li><Link href="/register">daftar</Link></li>
            <li><Link href="/login">masuk</Link></li>
        </ul>
      </div>        
    </div>
  )
}

export default navbar