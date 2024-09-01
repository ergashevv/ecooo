import * as React from "react";
import { UserPen } from "lucide-react";
import DogGirl from "@/components/donAndGirl";
import { useParams } from "react-router-dom";
import AddBanner from "../components/add-banner";
import parse from 'html-react-parser';
import { Image } from 'antd';
const Resource = () => {
  const { id } = useParams()
  const h3 = document.getElementsByTagName('h3')
  for(let i =0; i<h3.length; i++){
    const h3El = h3[i]
    h3El.style.color = 'black'
  }
  
  
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
      <div className="w-full h-[700px] relative">
          <img src={data?.image} alt="" className="w-full h-full object-cover"/>
          <div className="banner-ad absolute bottom-0 left-0 w-full">
              <AddBanner />
            </div>
          </div>
          
      <div className="container">
        <div className="flex justify-center items-center flex-col">
          
          {/* <UserPen width={100} height={100} color="#3598FF" /> */}
          <h1 className="text-slate-400 text-[60px]  font-mono mt-[70px]">{data?.title}</h1>
          <div className="service-page">
            {/* <h1>{data?.title}</h1> */}

           
          </div>
          <div className="description">
            {
              parse(`<div className="description-inner">${data?.descriptions}</div>`)
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
