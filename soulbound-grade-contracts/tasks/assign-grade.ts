import { task } from "hardhat/config";
import { TaskArguments, HardhatRuntimeEnvironment } from "hardhat/types";

task("assign-grade", "Mints the NFT of the grade to the student")
  .addParam("studentAddress", "The student address")
  .addParam("studentId", "The student ID (do not include the 's', i.e. 123456")
  .addParam("grade", "The grade of the student")
  .setAction(
    async (
      taskArgs: TaskArguments,
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const studentId = BigInt(taskArgs.studentId);
      const grade = `Grade: ${taskArgs.grade}`;
      const studentAddress = taskArgs.studentAddress;

      const chainId = hre.network.config.chainId || 31337;

      const contractAddress =
        require(`../ignition/deployments/chain-${chainId}/deployed_addresses.json`)[
          "SoulboundGradeModule#SoulboundGrade"
        ];

      let contract;
      try {
        contract = await hre.viem.getContractAt(
          "SoulboundGrade",
          contractAddress
        );
      } catch (error) {
        throw new Error(
          `Could not find the contract at address ${contractAddress}`
        );
      }

      try {
        await contract.write.safeMint([studentAddress, studentId, grade]);
      } catch (error) {
        throw new Error(`Could not mint the NFT for student ${studentId}`);
      }

      console.log(`Minted the NFT for student ${studentId}, ${grade}`);
    }
  );
