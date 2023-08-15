import { useContext } from "react";
import { RdtContext } from "../rdt/rdt-context";

export const useRdt = () => {
  const rdt = useContext(RdtContext);

  return rdt;
};