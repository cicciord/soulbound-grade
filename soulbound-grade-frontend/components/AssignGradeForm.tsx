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
import React, { ChangeEvent, useState } from "react";
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

  const { writeContract } = useWriteContract();

  const handleGradeChange = (event: SelectChangeEvent) => {
    setGrade(event.target.value as string);
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStudentAddress(event.target.value as `0x${string}`);
  };

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStudentId(parseInt(event.target.value));
  };

  return (
    <Box>
      <Card raised>
        <CardContent>
          <Typography variant="h4">Assign Grade</Typography>
        </CardContent>

        <CardContent>
          <TextField
            required
            label="Student Address"
            onChange={handleAddressChange}
          />
        </CardContent>

        <CardContent>
          <TextField required label="Student ID" onChange={handleIdChange} />
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
          <Button
            onClick={() => {
              console.log(`Student Address: ${studentAddress}`);
              console.log(`Student ID: ${studentId}`);
              console.log(`Grade: ${grade}`);
              writeContract({
                abi: abi,
                address: address,
                chainId: chains[0].id,
                functionName: "safeMint",
                args: [studentAddress, studentId, grade],
              });
            }}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AssignGradeForm;
