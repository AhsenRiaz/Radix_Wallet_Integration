import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { accounts } from "../../src/data-request/builders/accounts";

import { free_token_manifest } from "../manifests/free_token";
import { rdt } from "../rdt/rdt";

export const HomePage = () => {
  const mint_nft = async () => {
    try {
      await rdt?.walletApi
        .sendOneTimeRequest(accounts().exactly(1))
        .andThen(({ accounts }) => {
          console.log("accounts", accounts);
          const transactionManifest = free_token_manifest(
            "1",
            accounts[0].address
          );
          return rdt.walletApi.sendTransaction({
            transactionManifest,
            version: 1,
          });
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Box sx={{ padding: "1rem 1rem" }}>
      <Box>
        <Typography variant="h4"> Create Non Fungible Resource</Typography>

        <Button
          variant="outlined"
          onClick={async () => {
            mint_nft();
          }}
        >
          Create NFR
        </Button>
      </Box>
    </Box>
  );
};
