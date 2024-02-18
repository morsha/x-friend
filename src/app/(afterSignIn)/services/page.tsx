'use client'
import CreateServiceModal from "@/components/CreateServiceModal";
import ServiceCard from "@/components/ServiceCard";
import isAuth from "@/components/isAuth";
import useAuthSwr from "@/hooks/useAuthSwr";
import usePost from "@/hooks/usePostRequest";
import { Stack, Button } from "@mui/material";
import { useState, useCallback } from "react";

function ServicesPage() {
  const { data, mutate } = useAuthSwr('/api/services');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { post } = usePost('/api/service')

  const handleCreateService = useCallback(async (serviceData: any) => {
    // 假設提交到 API 的邏輯
    console.log('Creating services:', serviceData);
    setIsModalOpen(false);
    mutate();
    // 更新 services 狀態以包含新服務
  }, [mutate, post]);

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
        {(data?.data.services || []).map((service: any) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </Stack>
    </div>
  );
}

export default isAuth(ServicesPage);