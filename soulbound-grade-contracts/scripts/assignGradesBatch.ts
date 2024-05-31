import { network, viem } from "hardhat";
import grades from "../constants/grade.test.json";
import { image_url } from "../constants/metadataAssets";

async function main() {
  const chainId = network.config.chainId || 31337;

  const contractAddress = require(
    `../ignition/deployments/chain-${chainId}/deployed_addresses.json`,
  )["SoulboundGradeModule#SoulboundGrade"];

  const contract = await viem.getContractAt("SoulboundGrade", contractAddress);

  for (const grade of grades) {
    if (grade.grade < 18 || grade.grade > 31) {
      throw new Error("The grade must be in the range [18, 31]");
    }

    const metadata = {
      description: "Nft Grade for the Blockchain and Cryptoeconomy Course",
      image: image_url,
      name: `Soulbound Grade of s${grade.id.toString()}`,
      attributes: [
        {
          display_type: "number",
          trait_type: "Grade",
          value: grade.grade,
          max_value: 31,
        },
      ],
    };
    const metadata_str = Buffer.from(JSON.stringify(metadata)).toString();
    const tokenUri = `data:application/josn;base64,${btoa(metadata_str)}`;

    console.log(
      `Assigning grade ${grade.grade === 31 ? "30L" : grade.grade} to student s${grade.id} at address ${grade.address}`,
    );

    await contract.write.safeMint([
      grade.address as `0x${string}`,
      BigInt(grade.id),
      tokenUri,
    ]);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
