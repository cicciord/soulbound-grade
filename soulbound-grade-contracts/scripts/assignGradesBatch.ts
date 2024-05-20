import { network, viem } from "hardhat";
import grades from "../constants/grade.test.json";

async function main() {
  const chainId = network.config.chainId || 31337;

  const contractAddress =
    require(`../ignition/deployments/chain-${chainId}/deployed_addresses.json`)[
      "SoulboundGradeModule#SoulboundGrade"
    ];

  const contract = await viem.getContractAt("SoulboundGrade", contractAddress);

  for (const grade of grades) {
    console.log(
      `Assigning grade ${grade.grade} to student s${grade.id} at address ${grade.address}`
    );

    await contract.write.safeMint([
      grade.address as `0x${string}`,
      BigInt(grade.id),
      `Grade: ${grade.grade}`,
    ]);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
