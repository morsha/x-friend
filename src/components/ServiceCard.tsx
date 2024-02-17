function ServiceCard({ service }: {
  service: {
    id: string
    imgUrl: string,
    title: string,
  },
}) {
  return (
    <div className="card">
      <img src={service.imgUrl} alt={service.title} />
      <div className="content">
        <span>{service.title}</span>
        <button onClick={() => window.location.href = `/purchase/${service.id}`}>Purchase</button>
      </div>
    </div>
  );
}

export default ServiceCard;
