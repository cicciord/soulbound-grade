import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useWriteContract } from "wagmi";

import { abi, address } from "../constants/soulboundGrade";
import { chains } from "../wagmi";

const gradesMenuItems = Array.from({ length: 14 }, (_, i) => i + 18).map(
  (grade) => (
    <MenuItem key={grade} value={grade === 31 ? "30L" : grade.toString()}>
      {grade === 31 ? "30L" : grade.toString()}
    </MenuItem>
  )
);

const AssignGradeForm = () => {
  const [studentAddress, setStudentAddress] = useState<`0x${string}` | "">("");
  const [studentId, setStudentId] = useState<number | "">("");
  const [grade, setGrade] = useState<string>("18");

  const { writeContract, reset, isPending, isSuccess, isError, error } =
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
      {isSuccess && (
        <Alert
          severity="success"
          onClose={() => reset()}
          sx={{ marginBottom: 2 }}
        >
          Grade assigned successfully.
        </Alert>
      )}
      {isError && (
        <Alert
          severity="error"
          onClose={() => reset()}
          sx={{ marginBottom: 2, width: 625 }}
        >
          {error?.message}
        </Alert>
      )}
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
            onClick={() =>
              writeContract(
                {
                  abi: abi,
                  address: address,
                  chainId: chains[0].id,
                  functionName: "safeMint",
                  args: [studentAddress, studentId, grade],
                },
                {
                  onSuccess: () => {
                    setStudentAddress("");
                    setStudentId("");
                    setGrade("18");
                  },
                }
              )
            }
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
