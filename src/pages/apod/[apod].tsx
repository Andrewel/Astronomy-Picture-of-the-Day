import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {DataType} from "@/pages";
import {getApodByDay} from "@/Axios/Apod";
import {ApodDetailed} from "@/Components/ApodDetailed/ApodDetailed";

export default function Apod() {
    const [data, setData] = useState<null | DataType>(null)
    const router = useRouter();
    const apod = Array.isArray(router.query.apod) ? router.query.apod[0] : router.query.apod;

    const year = apod?.split('-')[0]!;
    const month = apod?.split('-')[1]!;
    const day = apod?.split('-')[2]!


    useEffect(() => {
        if (+day > new Date(+year, +month, 0).getDate()) router.push('/404')
        if (+year < 1995 || +year > new Date().getFullYear() || +month < 1 || +month > 12) router.push('/404')
        if (+year === 1995 && +month < 6) router.push('/404')
    }, [router])

    useEffect(() => {
        if (year && month && day) {
            getApodByDay(`${year}-${month}-${day}`).then(res => {
                setData(res.data)
            })
        }
    }, [router])


    return (
        <div>
            {
                data
                    ?
                    <ApodDetailed data={data}/>
                    :
                    <div>not found</div>
            }
        </div>
    )
}
