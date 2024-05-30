import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import { useAccount, useConnectorClient, useReadContract } from "wagmi";
import { chains } from "../wagmi";

import {
  abi as soulboundGradeAbi,
  address as soulboundGradeAddress,
} from "../constants/soulboundGrade";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AssignGradeForm from "../components/AssignGradeForm";
import ShowGradeForm from "../components/ShowGradeForm";

const Home: NextPage = () => {
  const { address } = useAccount();
  // const { error, isLoading } = useConnectorClient();

  const { data: ownerAddress } = useReadContract({
    abi: soulboundGradeAbi,
    address: soulboundGradeAddress,
    functionName: "owner",
    chainId: chains[0].id,
  });

  // if (isLoading)
  //   return (
  //     <Backdrop
  //       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //       open={isLoading}
  //     >
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );

  ///TODO: make an error screen
  // if (error) return <Typography>{error.message}</Typography>;

  return (
    <>
      <Head>
        <title>Soulboound Grade</title>
        <link href="/favicon.ico" rel="icon" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <NavBar />
      <Container
        sx={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {address ? (
          address === ownerAddress ? (
            <>
              <Box sx={{ margin: 4 }}>
                <AssignGradeForm />
              </Box>
              <Box sx={{ margin: 4 }}>
                <ShowGradeForm />
              </Box>
            </>
          ) : (
            <ShowGradeForm />
          )
        ) : (
          <>
            <Box sx={{ margin: 4 }}>
              <ShowGradeForm />
            </Box>
            <Box
              sx={{
                margin: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ConnectButton showBalance={false} />
              <Typography sx={{ margin: 2 }}>
                Connect your wallet if you are the owner to assign grades
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
