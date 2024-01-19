import axios from "axios";

const apikey = process.env.NEXT_PUBLIC_API_KEY;

const axiosInstance = axios.create({
    baseURL: `https://api.nasa.gov/planetary/apod?api_key=${apikey}`,
});

export const getApod = async () => {
    return await axiosInstance.get("");
};

export const getApodsByDates = async (start_date: string, end_date: string) => {
    return await axiosInstance.get("", {
        params: {
            start_date,
            end_date
        }
    })
}

export const getApodByDay = async (date: string) => {
    return await axiosInstance.get("", {
            params: {
                date,
            }
        }
    );
};
