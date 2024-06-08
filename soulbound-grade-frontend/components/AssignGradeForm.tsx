import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { ChangeEvent, useState } from "react";
import { useWriteContract } from "wagmi";

import { abi, address } from "../constants/soulboundGrade";
import { chains } from "../wagmi";
import { image_url } from "../constants/metadataAssets";

const gradesMenuItems = Array.from({ length: 14 }, (_, i) => i + 18).map(
  (grade) => (
    <MenuItem key={grade} value={grade === 31 ? "30L" : grade.toString()}>
      {grade === 31 ? "30L" : grade.toString()}
    </MenuItem>
  ),
);

const AssignGradeForm = () => {
  const [studentAddress, setStudentAddress] = useState<`0x${string}` | "">("");
  const [studentId, setStudentId] = useState<number | "">("");
  const [grade, setGrade] = useState<string>("18");

  const { writeContract, reset, isPending, isSuccess, isError } =
    useWriteContract();

  const handleGradeChange = (event: SelectChangeEvent) => {
    setGrade(() => event.target.value as string);
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStudentAddress(() => event.target.value as `0x${string}`);
  };

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStudentId(() => parseInt(event.target.value));
  };

  return (
    <Box>
      <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        onClose={() => reset()}
      >
        <Alert
          onClose={() => reset()}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Grade assigned successfully.
        </Alert>
      </Snackbar>

      <Snackbar open={isError} autoHideDuration={6000} onClose={() => reset()}>
        <Alert
          onClose={() => reset()}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Something went wrong.
        </Alert>
      </Snackbar>

      <Card raised sx={{ width: 625 }}>
        <CardContent>
          <Typography variant="h4">Assign Grade</Typography>
        </CardContent>

        <CardContent sx={{ display: "flex" }}>
          <TextField
            fullWidth
            required
            label="Student Address"
            value={studentAddress}
            onChange={handleAddressChange}
            sx={{ marginRight: 1 }}
          />
          <TextField
            required
            label="Student ID"
            value={studentId}
            onChange={handleIdChange}
          />
        </CardContent>

        <CardContent>
          <FormControl>
            <InputLabel id="grade-select-label">Grade</InputLabel>
            <Select
              labelId="grade-select-label"
              label="Grade"
              value={grade}
              onChange={handleGradeChange}
            >
              {gradesMenuItems}
            </Select>
          </FormControl>
        </CardContent>

        <CardActions>
          <LoadingButton
            onClick={() => {
              const metadata = {
                description:
                  "Nft Grade for the Blockchain and Cryptoeconomy Course",
                image: image_url,
                name: `Soulbound Grade of s${studentId.toString()}`,
                attributes: [
                  {
                    display_type: "number",
                    trait_type: "Grade",
                    value: grade === "30L" ? 31 : parseInt(grade),
                    max_value: 31,
                  },
                ],
              };
              const metadata_str = Buffer.from(
                JSON.stringify(metadata),
              ).toString();
              const tokenUri = `data:application/json;base64,${btoa(metadata_str)}`;
              writeContract(
                {
                  abi: abi,
                  address: address,
                  chainId: chains[0].id,
                  functionName: "safeMint",
                  args: [studentAddress, studentId, tokenUri],
                },
                {
                  onSuccess: () => {
                    setStudentAddress("");
                    setStudentId("");
                    setGrade("18");
                  },
                },
              );
            }}
            loading={isPending}
          >
            <span>Submit</span>
          </LoadingButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AssignGradeForm;
