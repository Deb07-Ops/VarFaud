
import { Inter } from 'next/font/google'
import '/styles/globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VarFAud | Variable Use and Function Audit Tool',
  description: 'A library that spots and prevents common vulnerabilities like double frees, unsafe variable transfer.',
}

export default function RootLayout({ children }) {
  return (
   
    <html lang='en'>
    <body>
            <div className="main">
           
              
                <div className="gradient" />
            </div>
            <main className="app">
                {children}
            </main>
    </body>

</html>
  )
}
