import {useState} from "react";
import Link from "next/link";
import styles from './calendarTable.module.scss'


export const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]


const isValidMonth = (year: number, month: number, currentDate: Date) => {
    if (year === 1995) {
        if (month < 6) {
            return false
        }
    }
    if (year === currentDate.getFullYear()) {
        if (month > currentDate.getMonth() + 1) {
            return false
        }
    }
    return true
}
export const CalendarTable = () => {
    const date = new Date();
    const rows = date.getFullYear() - 1995 + 1;
    const rowsArr = Array.from(Array(rows).keys())
    let currentYear = date.getFullYear();

    return (
        <div className={styles.table}>
            {rowsArr.map(row => {
                return (
                    <div key={currentYear - row} className={styles.row}>
                        <div className={`${styles.yearCell} ${styles.cell}`}>{currentYear - row}</div>
                        <div className={styles.monthRow}>
                            {months.map((cell, i) => {
                                return (<div key={i}>
                                    {isValidMonth(currentYear - row, i + 1, date) ?
                                        <Link href={`/calendar/${currentYear - row}-${i + 1}`}
                                              className={styles.cell}>{cell}</Link>
                                        : <div className={styles.cell}></div>
                                    }
                                </div>)
                            })}
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
