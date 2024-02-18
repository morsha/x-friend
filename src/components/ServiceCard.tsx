import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

function ServiceCard({ service }: {
  service: {
    id: string,
    imgUrl: string,
    title: string,
  },
}) {
  const router = useRouter();
  return (
    <Card sx={{ maxWidth: 160, m: 1 }}>
      <CardMedia
        component="img"
        height="160"
        image={service.imgUrl}
        alt={service.title}
      />
      <CardContent>
        <Typography variant="h6" component="span">
          {service.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => router.push(`/purchase/${service.id}`)}>Purchase</Button>
      </CardActions>
    </Card>
  );
}

export default ServiceCard;
