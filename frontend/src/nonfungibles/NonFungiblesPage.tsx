import React, { useEffect, useState } from "react";
import {
  StateApi,
  StateNonFungibleDataResponse,
} from "@radixdlt/babylon-gateway-api-sdk";
import { Box, Button, Card, CardMedia, Container, Grid } from "@mui/material";
import { rdt } from "../rdt/rdt";

interface RawJsonField {
  kind: string;
  value: string;
}

interface RawJson {
  fields: RawJsonField[];
}

interface ScryptoSborValue {
  raw_hex: string;
  raw_json: RawJson;
}

export const NonFungiblesPage = () => {
  const [nonFungibles, setNonFungibles] = useState<
    StateNonFungibleDataResponse[]
  >([]);

  const [personaAddress, setPersonaAddress] = useState<string>();

  useEffect(() => {
    getAccountBalance();
  }, []);

  useEffect(() => {
    let wallet_data = rdt.walletApi.getWalletData().persona;
    setPersonaAddress(wallet_data.identityAddress);
  }, [personaAddress]);

  const getAccountBalance = async () => {
    const stateApi = new StateApi();
    const address =
      "account_tdx_d_12x64mlmgaa4hsmn7jkyanclfhwpmnt9y0j8uggltlxra8d54g7n7ht";

    try {
      const entityDetails = await stateApi.stateEntityDetails({
        stateEntityDetailsRequest: {
          addresses: [address],
          aggregation_level: "Vault",
        },
      });

      const results: StateNonFungibleDataResponse[] = [];

      for (const eDetails of entityDetails.items) {
        for (const eDetails_nfr of eDetails.non_fungible_resources.items) {
          const vaultDetails =
            await stateApi.entityNonFungibleResourceVaultPage({
              stateEntityNonFungibleResourceVaultsPageRequest: {
                address,
                resource_address: eDetails_nfr.resource_address,
              },
            });

          for (const vDetails of vaultDetails.items) {
            const nfrsDetails = await stateApi.entityNonFungibleIdsPage({
              stateEntityNonFungibleIdsPageRequest: {
                address,
                resource_address: vaultDetails.resource_address,
                vault_address: vDetails.vault_address,
              },
            });

            const nfr_metadata = await stateApi.nonFungibleData({
              stateNonFungibleDataRequest: {
                non_fungible_ids: nfrsDetails.items,
                resource_address: nfrsDetails.resource_address,
              },
            });

            results.push(nfr_metadata);
            console.log("results", results);
          }
        }
      }
      setNonFungibles(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Container>
        <Grid container>
          {nonFungibles.map((nf, id) => (
            <Grid item xs={12} lg={4}>
              {nf.non_fungible_ids.map((nfr: any, nfrIndex) => {
                let metadata = nfr.data.raw_json;
                metadata = JSON.parse(JSON.stringify(metadata));

                return (
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <div style={{ flexDirection: "column" }}>
                      <img
                        src={
                          metadata &&
                          metadata.fields[1] &&
                          metadata.fields[1].value
                        }
                        height={"400"}
                        width={400}
                        alt=""
                        style={{ margin: "1rem 1rem" }}
                      />
                    </div>
                  </div>
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
