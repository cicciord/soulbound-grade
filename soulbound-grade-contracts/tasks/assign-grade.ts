import { task } from "hardhat/config";
import { TaskArguments, HardhatRuntimeEnvironment } from "hardhat/types";

task("assign-grade", "Mints the NFT of the grade to the student")
  .addParam("studentAddress", "The student address")
  .addParam("studentId", "The student ID (do not include the 's', i.e. 123456")
  .addParam("grade", "The grade of the student (31 = 30L)")
  .setAction(
    async (
      taskArgs: TaskArguments,
      hre: HardhatRuntimeEnvironment,
    ): Promise<void> => {
      const studentId = BigInt(taskArgs.studentId);
      const grade = parseInt(taskArgs.grade);
      if (grade < 18 || grade > 31) {
        throw new Error("The grade must be in the range [18, 31]");
      }
      const studentAddress = taskArgs.studentAddress;

      const metadata = {
        description: "Nft Grade for the Blockchain and Cryptoeconomy Course",
        image: "https://file.didattica.polito.it/download/DSK_CONDIVISO/131376",
        name: `Soulbound Grade of s${studentId.toString()}`,
        attributes: [
          {
            display_type: "number",
            trait_type: "Grade",
            value: grade,
            max_value: 31,
          },
        ],
      };
      const metadata_str = Buffer.from(JSON.stringify(metadata)).toString();
      const tokenUri = `data:application/josn;base64,${btoa(metadata_str)}`;

      const chainId = hre.network.config.chainId || 31337;

      const contractAddress = require(
        `../ignition/deployments/chain-${chainId}/deployed_addresses.json`,
      )["SoulboundGradeModule#SoulboundGrade"];

      let contract;
      try {
        contract = await hre.viem.getContractAt(
          "SoulboundGrade",
          contractAddress,
        );
      } catch (error) {
        throw new Error(
          `Could not find the contract at address ${contractAddress}`,
        );
      }

      try {
        await contract.write.safeMint([studentAddress, studentId, tokenUri]);
      } catch (error) {
        throw new Error(`Could not mint the NFT for student ${studentId}`);
      }

      console.log(
        `Minted the NFT for student ${studentId}, ${grade === 31 ? "30L" : grade}`,
      );
    },
  );
