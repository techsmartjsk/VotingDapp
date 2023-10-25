import type { Metadata } from 'next'
import './globals.css'
import { Poppins } from 'next/font/google';
import { EthereumProvider } from './context/context.eth';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'Voting Decentralised App',
  description: 'This app is used to conduct voting amond different candidates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <EthereumProvider>
          {children}
        </EthereumProvider>
        <ToastContainer
          position="top-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          closeOnClick
          pauseOnHover
        />
      </body>
    </html>
  )
}
