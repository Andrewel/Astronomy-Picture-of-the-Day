import styles from "./apodDetailed.module.scss";
import Image from "next/image";
import {DataType} from "@/pages";
import Link from "next/link";


type PropType = {
    data: DataType
}
export const ApodDetailed = ({data}: PropType) => {
    return (
        <div className={styles.container}>
            <h1>Astronomy Picture of the Day</h1>
            <p>
                Discover the cosmos! Each day a different image or photograph of our
                fascinating universe is featured, along with a brief explanation
                written by a professional astronomer.
            </p>
            <p>{data.date}</p>
            {data.media_type === "image" && (
                <Link className={styles.imageContainer} href={data.hdurl}>
                    <Image
                        src={data.url}
                        alt={data.title}
                        fill
                    />
                </Link>
            )}
            {data.media_type === 'video' &&
                <iframe width="720" height="450" src={data.url}
                        title={data.title} frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>

            }
            <h2>{data.title}</h2>
            <h3>Image Credit & Copyright: {data.copyright}</h3>
            <p className={styles.explanation}>
                <b>Explanation:</b> {data.explanation}
            </p>
        </div>
    )
}
