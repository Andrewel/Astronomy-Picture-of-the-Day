import {useRouter} from "next/router";
import {CalendarMonth} from "@/Components/CalendarMonth/CalendarMonth";
import styles from '../../../styles/Calendar/calendar.module.scss'
import {months} from "@/Components/CalendarTable/CalendarTable";
import Link from "next/link";
import {useEffect} from "react";


const calculatePreviousMonth = (year: string, month: string) => {
    if (month === '1') return `/calendar/${+year - 1}-12`
    return `/calendar/${year}-${+month - 1}`
}
const calculateNextMonth = (year: string, month: string) => {
    if (month === '12') return `/calendar/${+year + 1}-1`
    return `/calendar/${year}-${+month + 1}`
}


export default function MonthCalendar() {
    const router = useRouter();
    const slug = Array.isArray(router.query.slug) ? router.query.slug[0] : router.query.slug;

    const year = slug?.split('-')[0]!;
    const month = slug?.split('-')[1]!;

    useEffect(() => {
        if (+year < 1995 || +year > new Date().getFullYear() || +month < 1 || +month > 12) router.push('/404')
        if (+year === 1995 && +month < 6) router.push('/404')
        if (+year === new Date().getFullYear() && +month > new Date().getMonth() + 1) router.push('/404')
    }, [router])

    return (
        <div>
            {
                !slug ? 'Loading...' :
                    <div>
                        <div className={styles.monthDate}>
                            <Link href={calculatePreviousMonth(year, month)}>Previous month</Link>
                            <div>{`${months[+month - 1]} ${year}`}</div>
                            <Link href={calculateNextMonth(year, month)}>Next month</Link>
                        </div>

                        <CalendarMonth year={year} month={month}/>
                    </div>

            }
        </div>)
}
