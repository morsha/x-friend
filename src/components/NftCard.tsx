import { useCallback } from "react";

function NftCard({ service }: {
  service: {
    id: string
    imgUrl: string,
    title: string,
  },
}) {
  const useThisCard = useCallback(() => {
    // use something
  }, []);

  return (
    <div className="card">
      <img src={service.imgUrl} alt={service.title} />
      <div className="content">
        <span>{service.title}</span>
        <button onClick={useThisCard}>Done</button>
      </div>
    </div>
  );
}

export default NftCard;
