import { RadixDappToolkit } from "@radixdlt/radix-dapp-toolkit";
import { GatewayApiClient as BabylonGatewayApiClient } from "@radixdlt/babylon-gateway-api-sdk";
import {
  RadixNetwork,
  RadixNetworkConfigById,
} from "@radixdlt/babylon-gateway-api-sdk";

export type GatewayApiClient = ReturnType<typeof GatewayApiClient>;

export const GatewayApiClient = ({
  basePath,
}: {
  basePath: string;
  dAppDefinitionAddress?: string;
}) => {
  const { transaction, state, status } = BabylonGatewayApiClient.initialize({
    basePath,
  });
};

export const gatewayApi = GatewayApiClient({
  basePath: RadixNetworkConfigById[13].gatewayUrl,
});


const options = {
  dAppDefinitionAddress:
    "account_tdx_d_12x64mlmgaa4hsmn7jkyanclfhwpmnt9y0j8uggltlxra8d54g7n7ht",
  networkId: 13,

  useCache: false,
};

export const rdt = RadixDappToolkit(options);
