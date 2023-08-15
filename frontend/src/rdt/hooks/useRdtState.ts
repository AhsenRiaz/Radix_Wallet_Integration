import { useEffect, useState } from "react";
import { useRdt } from "./useRdt";

export const useRdtState = () => {
  const rdt = useRdt();
};