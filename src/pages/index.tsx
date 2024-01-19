import Head from "next/head";
import {useEffect, useState} from "react";
import {getApod} from "@/Axios/Apod";
import {ApodDetailed} from "@/Components/ApodDetailed/ApodDetailed";

export type DataType = {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
};

export default function Home() {
    const [data, setData] = useState<DataType | null>(null);

    useEffect(() => {
        getApod().then((res) => {
            setData(res.data);
        });
    }, []);

    return (
        <>
            <Head>
                <title>Astronomy Picture of the Day</title>
                <meta name="description" content="Astronomy Picture of the Day"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {!data ? (
                "Loading..."
            ) : (
                <ApodDetailed data={data}/>
            )}
        </>
    );
}
