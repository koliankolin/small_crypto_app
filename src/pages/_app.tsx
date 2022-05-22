import '../styles/globals.css'
import {AppProps} from "next/app";
import Head from "next/head";
import {LoadContract} from "../utils/load_contract";
import {useEffect, useState} from "react";
import {AppContextProvider} from "../context/App.context";
import {apiProvider} from "../types";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const [provider, setProvider] = useState<apiProvider>()
    const [contract, setContract] = useState()

    useEffect(() => {
        setProvider(window.ethereum)
    }, [])

    useEffect(() => {
        const getContract = async () => {
            const _contract = await LoadContract("Faucet", provider as apiProvider)
            setContract(_contract)
        }

        provider && getContract()
    }, [provider])

    return (
        <>
            <AppContextProvider
                contract={contract}
                provider={provider as apiProvider}
            >
              <Head>
                <title>The best top</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;200;300;400;500;600;700&display=swap"
                        rel="stylesheet"/>
              </Head>
              <Component {...pageProps} />
            </AppContextProvider>
        </>
    )
}

export default MyApp
