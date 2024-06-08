import { polygonAmoy } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

export const chains = [polygonAmoy] as const;

export const config = getDefaultConfig({
  appName: "Soulbound Grade",
  projectId: projectId,
  chains,
  ssr: true,
});
