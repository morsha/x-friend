'use client'
import NftCard from "@/components/NftCard";
import isAuth from "@/components/isAuth";
import { Title } from "@mui/icons-material";
import { Button, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const initialNFTs = [
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
    title: "Cloud NFTs",
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
const initialPOAPs = [
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

];
function MyNftsPage() {
  const [nfts, setNFTs] = useState(initialNFTs);
  const [poaps, setPOAPs] = useState(initialPOAPs);

  useEffect(() => {
    fetch('/api/nft/mine').then(res => res.json())
  }, [])

  return (
    <Paper sx={{ maxHeight: 500, overflow: 'auto' }}>
      <Button>Add XNFT</Button>
      <Button>Add XPOAP</Button>
      <h2>On going services...</h2>
      <Stack flexWrap="wrap" direction="row">
        {nfts.map((nft: any) => (
          <NftCard key={nft.id} nft={nft} category="nft" />
        ))}
      </Stack>
      <hr></hr>
      <h2>Have provided services...</h2>
      <Stack flexWrap="wrap" direction="row">
        {poaps.map((poap: any) => (
          <NftCard key={poap.id} nft={poap} category="poap" />
        ))}
      </Stack>
    </Paper>
  );
}

export default isAuth(MyNftsPage);