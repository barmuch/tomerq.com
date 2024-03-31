import Navbar from "@/components/navbar";

export default function KursusLayout({ children }) {
    return (
    <div>
        <div className="bg-primary2 text-primary1"><Navbar/></div>
        <div className="max-w-full">{children}</div>
    </div>
    )
}