import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCallback } from "react";

function NftCard({
  nft,
  category,
}: {
  nft: {
    id: string;
    imgUrl: string;
    title: string;
    status?: string;
  };
  category: "nft" | "poap";
}) {
  const useThisCard = useCallback(() => {
    fetch("/api/poap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ nftId: nft.id }),
    }).then((res) => {
      if (res.ok) {
        console.log("POAP claimed");
      }
    });
  }, [nft.id]);

  return (
    <Card sx={{ maxWidth: 160, m: 1 }}>
      {category === "nft" && (
        <CardMedia
          component="img"
          height="160"
          image={nft.imgUrl}
          alt={nft.title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h6" component="span">
          [{category}] {nft.title}
        </Typography>
      </CardContent>
      {category === "nft" && nft.status !== "COMPLETED" && (
        <CardActions>
          <Button variant="outlined" size="small" onClick={useThisCard}>
            Done
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default NftCard;
