import * as React from "react";
import { UserPen } from "lucide-react";
import DogGirl from "@/components/donAndGirl";
import { useParams } from "react-router-dom";
import AddBanner from "../components/add-banner";
import parse from 'html-react-parser';
import { Image } from 'antd';
const Resource = () => {
  const { id } = useParams()

  const [data, setData] = React.useState(null);
  const url = `http://185.105.90.191:83/resource/${id}`
  React.useEffect(() => {
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
    <div>
      <div className="container pt-[110px]">
        <div className="flex justify-center items-center flex-col">
          <img src={data?.image} alt="" />
          {/* <UserPen width={100} height={100} color="#3598FF" /> */}
          <h1 className="text-slate-400 text-[60px]  font-mono">{data?.title}</h1>
          <div className="service-page">
            {/* <h1>{data?.title}</h1> */}

            <div className="banner-ad">
              <AddBanner />
            </div>
          </div>
          <div className="description">
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
        </div>
        <DogGirl />
      </div>
    </div>
  );
};

export default Resource;
