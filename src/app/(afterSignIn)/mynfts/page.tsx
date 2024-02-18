"use client";
import NftCard from "@/components/NftCard";
import isAuth from "@/components/isAuth";
import { Button, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const initialNFTs: {
  id: number;
  imgUrl: string;
  title: string;
}[] = [];
const initialPOAPs: {
  id: number;
  imgUrl: string;
  title: string;
}[] = [];
function MyNftsPage() {
  const [nfts, setNFTs] = useState(initialNFTs);
  const [poaps, setPOAPs] = useState(initialPOAPs);

  useEffect(() => {
    fetch("/api/nft/mine", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setNFTs(d.data.nfts);
      });

    // fetch my poaps
    fetch("/api/poap/mine", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setPOAPs(d.data.poaps);
      });
  }, []);

  return (
    <Paper sx={{ maxHeight: 500, overflow: "auto" }}>
      <Button>Add XNFT</Button>
      <Button>Add XPOAP</Button>
      <h2>On going services...</h2>
      <Stack flexWrap="wrap" direction="row">
        {nfts.length === 0
          ? "No NFT now."
          : nfts.map((nft: any) => (
              <NftCard key={nft.id} nft={nft} category="nft" />
            ))}
      </Stack>
      <hr></hr>
      <h2>Have provided services...</h2>
      <Stack flexWrap="wrap" direction="row">
        {poaps.length === 0
          ? "No POAP now."
          : poaps.map((poap: any) => (
              <NftCard key={poap.id} nft={poap} category="poap" />
            ))}
      </Stack>
    </Paper>
  );
}

export default isAuth(MyNftsPage);
