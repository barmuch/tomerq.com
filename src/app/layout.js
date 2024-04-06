import { Kalam } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local"

const myFont = localFont({
  src: './Kalam-Regular.ttf',
  display: 'swap',
})

const kalam = Kalam({ 
  subsets: ["latin"],
  weight: "400", 
});

export const metadata = {
  title: "tomerQ.com",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${myFont.className} `}>        
          {children}   
      </body>
    </html>
  );
}
  