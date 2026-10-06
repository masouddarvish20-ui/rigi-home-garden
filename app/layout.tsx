import './globals.css';
import { Manrope } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import GlobalMotion from '@/components/GlobalMotion';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

export const metadata={title:'RIGI Home & Garden Design',description:'Luxury construction and remodeling in Orange County, California.'};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body className={manrope.variable}>{children}<GlobalMotion /><CustomCursor /></body></html>;
}
