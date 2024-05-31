import { task } from "hardhat/config";
import { TaskArguments, HardhatRuntimeEnvironment } from "hardhat/types";

task(
  "transfer-ownership",
  "Transfer the ownership of the contract to another address",
)
  .addParam("ownerAddress", "The address of the new owner")
  .setAction(
    async (
      taskArgs: TaskArguments,
      hre: HardhatRuntimeEnvironment,
    ): Promise<void> => {
      const ownerAddress = taskArgs.ownerAddress;

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
        await contract.write.transferOwnership([ownerAddress]);
      } catch (error) {
        throw new Error(
          `Could not transfer the ownership of the contract to ${ownerAddress}`,
        );
      }

      console.log(
        `Ownership of the contract has been transferred to ${ownerAddress}`,
      );
    },
  );
