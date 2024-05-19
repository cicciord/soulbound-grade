import { hardhat } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = process.env.NEXT_WC_PROJECT_ID || "YOUR_PROJECT_ID"

export const chains = [hardhat] as const

export const config = getDefaultConfig({
    appName: "Soulbound Grade",
    projectId,
    chains,
    ssr: true
})
