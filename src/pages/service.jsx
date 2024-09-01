import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Header from '../containers/header'
import './main.scss'
import AddBanner from "../components/add-banner";
import parse from 'html-react-parser';
import { Image } from 'antd';
const ServicePage = () => {
    const { id } = useParams()

    const [data, setData] = useState(null);
    const url = `http://185.105.90.191:83/service/${id}`
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.log(err);

            } finally {
                console.log("hi");

            }
        };

        fetchData();
    }, [url]);
    return (
        <>
            <Header />
            <div className="service-page">
                {/* <h1>{data?.title}</h1> */}
                <img clas src={data?.image} alt="" />
                <div className="banner-ad">
                    <AddBanner />
                </div>
            </div>
            <div className="description container">
                {
                    parse(`<div>${data?.descriptions}</div>`)
                }
            </div>
            <div className="service-images ">
                {
                    data?.service_images?.map((item, key) => (
                        <Image
                            style={{
                                objectFit: "cover"
                            }}
                            width={300}
                            height={300}
                            src={item.image}
                        />
                    ))
                }
            </div>
        </>
    )
}
export default ServicePage