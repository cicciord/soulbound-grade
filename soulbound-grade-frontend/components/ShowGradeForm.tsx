import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useReadContract } from "wagmi";

import { abi, address } from "../constants/soulboundGrade";
import { chains } from "../wagmi";

const ShowGradeForm = () => {
  const [studentId, setStudentId] = useState<number | "">("");

  const { data } = useReadContract({
    abi,
    address,
    functionName: "tokenURI",
    chainId: chains[0].id,
    args: [studentId],
    query: {
      enabled: studentId !== "" && studentId <= 999999 && studentId > 99999,
    },
  });

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStudentId(parseInt(event.target.value));
  };

  return (
    <Box>
      <Card raised sx={{ width: 625 }}>
        <CardContent>
          <Typography variant="h4">Show Grade</Typography>
        </CardContent>

        <CardContent sx={{ display: "flex" }}>
          <TextField
            fullWidth
            label="Student ID"
            onChange={handleIdChange}
            sx={{ marginRight: 1 }}
          />
          <TextField
            fullWidth
            label="Grade"
            value={data || ""}
            InputProps={{
              readOnly: true,
            }}
            focused={(data as string | undefined) !== undefined}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ShowGradeForm;
