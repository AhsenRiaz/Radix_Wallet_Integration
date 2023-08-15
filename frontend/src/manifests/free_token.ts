export const free_token_manifest = (id: string, account: string) => `
CALL_METHOD
    Address("component_tdx_d_1cq3gysyev8392hd6ps9r6ks549lhuqa58aufa2xcawau59rxyf77dp")
    "free_token"
    ${id}u64;

CALL_METHOD
  Address("${account}")
  "deposit_batch"
  Expression("ENTIRE_WORKTOP");`;
