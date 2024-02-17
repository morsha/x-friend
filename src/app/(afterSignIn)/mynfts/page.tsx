'use client'
import NftCard from "@/components/NftCard";
import isAuth from "@/components/isAuth";
import { useState } from "react";

const initialServices = [
  {
    id: 1,
    imgUrl: "https://via.placeholder.com/150",
    title: "Web Development",
  },
  {
    id: 2,
    imgUrl: "https://via.placeholder.com/150",
    title: "UI/UX Design",
  },
  {
    id: 3,
    imgUrl: "https://via.placeholder.com/150",
    title: "Cloud Services",
  },
  {
    id: 4,
    imgUrl: "https://via.placeholder.com/150",
    title: "SEO Optimization",
  },
  {
    id: 5,
    imgUrl: "https://via.placeholder.com/150",
    title: "Digital Marketing",
  }
];
function MyNftsPage() {
  const [services, setServices] = useState(initialServices);

  return (
    <div>
      <div className="nfts-list">
        {services.map((service: any) => (
          <NftCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

export default isAuth(MyNftsPage);