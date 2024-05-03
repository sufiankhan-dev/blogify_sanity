import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import "../globals.css";

export const metadata = {
  title: 'Blogify',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        </body>
    </html>
  )
}
