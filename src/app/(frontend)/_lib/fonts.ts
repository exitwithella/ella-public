import { DM_Sans, Instrument_Serif } from 'next/font/google'
import localFont from 'next/font/local'

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const termina = localFont({
  src: [
    {
      path: '../../../../public/fonts/termina/Termina-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    { path: '../../../../public/fonts/termina/Termina-Demi.woff2', weight: '600', style: 'normal' },
    { path: '../../../../public/fonts/termina/Termina-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-termina',
  display: 'swap',
})
