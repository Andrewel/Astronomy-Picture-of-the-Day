import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Navigation} from "@/Components/Navigation/Navigation";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Navigation/>
            <Component {...pageProps}/>
        </>)
}
