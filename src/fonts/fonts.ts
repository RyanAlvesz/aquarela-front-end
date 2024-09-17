import { Ubuntu, Gloria_Hallelujah } from "next/font/google";

export const ubuntu = Ubuntu ({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    variable: '--font-ubuntu'
})

export const gloriaHallelujah = Gloria_Hallelujah ({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-gloria'
})