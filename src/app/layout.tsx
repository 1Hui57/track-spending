import Header from "../component/Header";
import "../style.css";


export const metadata = {
  title: 'React記帳程式',
  description: 'Next.js,React,Typescript練習',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
