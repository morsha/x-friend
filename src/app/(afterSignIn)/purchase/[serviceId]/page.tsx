'use client'
import isAuth from '@/components/isAuth';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface Service {
  id: number,
  imgUrl: string,
  title: string,
  price: string,
}

// 假設的服務數據，實際應用中可能需要從 API 獲取
const servicesData: Service[] = [
  { id: 1, imgUrl: "https://via.placeholder.com/150", title: "Service 1", price: '100' },
  { id: 2, imgUrl: "https://via.placeholder.com/150", title: "Service 2", price: '200' },
  // 添加更多服務
];

function PurchasePage({ params }: { params: { serviceId: string } }) {
  const [service, setService] = useState<Service | undefined>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // 在實際應用中，您可能需要在這裡發送 API 請求來獲取服務數據
    const serviceData = servicesData.find(service => service.id === parseInt(params.serviceId));

    setService(serviceData);
  }, [params.serviceId]);

  const submitPurchase = useCallback(() => {
    // 模擬 API 調用
    try {
      // await simulateApiCall(); // 假設這是你的 API 調用函數
      setShowSuccessModal(true); // 調用成功，顯示成功 Modal
    } catch (error) {
      console.error('Purchase failed:', error);
      // 處理錯誤情況
    }
  }, [])

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // 在 App Router 中，使用 navigate 函數導航
    router.push('/mynfts');
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Purchase Service</h1>
      <img src={service.imgUrl} alt={service.title} style={{ width: '100%', maxWidth: '400px' }} />
      <h2>{service.title}</h2>
      <p>Price: ${service.price}</p>
      <button onClick={submitPurchase}>Submit Purchase</button>
      {showSuccessModal && (
        <div className="modal">
          <p>✅ Purchase Successful!</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
}

export default isAuth(PurchasePage);
