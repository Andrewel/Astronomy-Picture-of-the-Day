import {usePathname} from "next/navigation";
import Link from "next/link";
import styles from './navigation.module.scss'

export const Navigation = () => {
    const pathname = usePathname()

    return (
        <div className={styles.container}>
            <Link href='/'
                  className={`${pathname === '/' ? styles.active : styles.notActive} ${styles.link}`}>
                Today`s picture
            </Link>
            <Link href='/calendar'
                  className={`${pathname === '/calendar' ? styles.active : styles.notActive} ${styles.link}`}>
                Calendar
            </Link>
        </div>)
}
