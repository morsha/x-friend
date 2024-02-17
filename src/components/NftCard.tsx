import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';

function ServiceCard({ service }: {
  service: {
    id: string,
    imgUrl: string,
    title: string,
  },
}) {
  const useThisCard = useCallback(() => {
    // use something
  }, []);

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="345"
        image={service.imgUrl}
        alt={service.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {service.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={useThisCard}>Done</Button>
      </CardActions>
    </Card>
  );
}

export default ServiceCard;
