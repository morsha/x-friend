'use client'
import CreateServiceModal from "@/components/CreateServiceModal";
import ServiceCard from "@/components/ServiceCard";
import isAuth from "@/components/isAuth";
import { Stack, Button } from "@mui/material";
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
function ServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateService = (serviceData: any) => {
    // 假設提交到 API 的邏輯
    console.log('Creating service:', serviceData);
    setIsModalOpen(false);
    // 更新 services 狀態以包含新服務
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => setIsModalOpen(true)}>Create Service</Button>
      {isModalOpen && (
        <CreateServiceModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateService}
        />
      )}
      <Stack flexWrap="wrap" direction="row">
        {services.map((service: any) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </Stack>
    </div>
  );
}

export default isAuth(ServicesPage);