"use client"
import { decodeJwt } from "jose";
import { useEffect, useState } from "react";
import ExchangeModal from "./ExchangeModal";
import WithdrawModal from "./WithdrawModal";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";

export default function Header() {
  const [userUSDTBalance, setUserUSDTBalance] = useState("");
  const [userXTokenBalance, setUserXTokenBalance] = useState("");

  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const token = localStorage.getItem("accessToken")
  const userPayload = token && decodeJwt(token) as (UserPayload | null);

  useEffect(() => {
    // call api get user data
    setUserUSDTBalance("100");
    setUserXTokenBalance("200");
  }, []);

  return (
    <header>
      <Stack width="100%" direction="row" padding={2}>
        <Stack width="50%">
          <Typography component="span">
            {userPayload?.name} / {userPayload?.email}
          </Typography>
          <Typography component="span" style={{ wordWrap: "break-word" }}>Address: {userPayload?.address}</Typography>
          <Typography component="span">USDT Balance: {userUSDTBalance}</Typography>
          <Typography component="span">
            XToken Balance: {userXTokenBalance}
          </Typography>
        </Stack>
        <Stack alignSelf="flex-end" flexShrink={0} paddingLeft={2}>
          <Button onClick={() => setShowExchangeModal(true)}>Exchange</Button>
          <Button onClick={() => setShowWithdrawModal(true)}>Withdraw</Button>
        </Stack>
      </Stack>
      {showExchangeModal && (
        <ExchangeModal onClose={() => setShowExchangeModal(false)} />
      )}
      {showWithdrawModal && (
        <WithdrawModal onClose={() => setShowWithdrawModal(false)} />
      )}
    </header>
  );
}
