import axios from "axios";
import useSWR from "swr";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
});

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export default fetcher;

const { data } = useSWR();
