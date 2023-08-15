import { createContext } from 'react'
import { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'

export type Rdt = ReturnType<typeof RadixDappToolkit>

export const RdtContext = createContext<Rdt | null>(null)