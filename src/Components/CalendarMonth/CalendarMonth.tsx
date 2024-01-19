import styles from './calendarMonth.module.scss'
import {useEffect, useState} from "react";
import {DataType} from "@/pages";
import {useRouter} from "next/router";
import {getApodsByDates} from "@/Axios/Apod";
import Image from "next/image";
import Link from "next/link";

type PropType = {
    year: string;
    month: string
}

const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const emptyDay = null;
const dayUrlWithNoImage = process.env.NEXT_PUBLIC_EMPTY_IMAGE_URL || ''

type RestMonthType = {
    media_type: 'empty'
    date: Date
}
export const CalendarMonth = ({year, month}: PropType) => {
    const [state, setState] = useState<null | DataType[] | RestMonthType[]>(null);


    useEffect(() => {
        if (year && month) {
            let daysInMonth = new Date(+year, +month, 0).getDate();

            const date = new Date();
            const currentYear = date.getFullYear();
            const currentMonth = date.getMonth() + 1;

            let restMonth: RestMonthType[] = [];

            if (currentYear === +year && currentMonth === +month) {
                restMonth = [...Array(daysInMonth - date.getDate()).fill({media_type: 'empty'})]
                daysInMonth = date.getDate();

            }

            getApodsByDates(`${year}-${month}-1`, `${year}-${month}-${daysInMonth}`).then((res) => {

                const indexOfDay = week.findIndex(day => day === week[new Date(res.data[0].date).getDay()])


                if (indexOfDay === 0) {
                    setState([...res.data, ...restMonth]);
                } else {

                    setState([...Array(indexOfDay).fill(emptyDay), ...res.data, ...restMonth]);
                }
            });
        }

    }, [year, month]);

    return (
        <div className={styles.container}>
            <div className={styles.week}>{week.map((el, i) => {
                return <div key={i} className={styles.weekDay}>{el}</div>
            })}</div>
            <div className={styles.month}>
                {state && state.map((day, i) => {
                    return <div key={i} className={styles.day}>
                        {
                            day
                                ? day.media_type === 'empty'
                                    ? <Image src={dayUrlWithNoImage} alt='no image' fill/>
                                    : <Link href={`/apod/${day.date}`}>
                                        {day.media_type === 'image'
                                            ? <Image src={day.url} alt='' fill/>
                                            : <Image src={dayUrlWithNoImage} alt='no image' fill/>
                                        }
                                    </Link>
                                : <></>}
                    </div>
                })}
            </div>
        </div>
    )
}
