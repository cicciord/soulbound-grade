// import { http } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";
// const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "";

export const chains = [polygonAmoy] as const;

export const config = getDefaultConfig({
  appName: "Soulbound Grade",
  projectId: projectId,
  chains,
  ssr: true,
  // transports: {
  //   [polygonAmoy.id]: http(
  //     `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`,
  //   ),
  // },
});
