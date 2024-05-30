import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { viem } from "hardhat";
import { expect } from "chai";

describe("SoulboundGrade", function () {
  async function deploySoulboundGradeFixture() {
    const [professor, student, randomPerson] = await viem.getWalletClients();

    const soulboundGrade = await viem.deployContract("SoulboundGrade");

    const publicClient = await viem.getPublicClient();

    return {
      soulboundGrade,
      professor,
      student,
      randomPerson,
      publicClient,
    };
  }

  it("Should mint a grade to the student", async function () {
    const STUDENT_ID = 333333n;

    const METADATA = {
      description: "Nft Grade for the Blockchain and Cryptoeconomy Course",
      image: "https://file.didattica.polito.it/download/DSK_CONDIVISO/131376",
      name: `Soulbound Grade of s${STUDENT_ID.toString()}`,
      attributes: [
        {
          display_type: "number",
          trait_type: "Grade",
          value: 30,
          max_value: 31,
        },
      ],
    };
    const METADATA_STR = Buffer.from(JSON.stringify(METADATA)).toString();
    const TOKEN_URI = btoa(METADATA_STR);

    const { soulboundGrade, student } = await loadFixture(
      deploySoulboundGradeFixture,
    );

    await soulboundGrade.write.safeMint([
      student.account.address,
      STUDENT_ID,
      TOKEN_URI,
    ]);

    const tokenUri = await soulboundGrade.read.tokenURI([STUDENT_ID]);
    const studentBalance = await soulboundGrade.read.balanceOf([
      student.account.address,
    ]);

    expect(studentBalance).to.equal(1n);
    expect(tokenUri).to.equal(TOKEN_URI);
  });

  it("Should not transfer the grade to another student", async function () {
    const STUDENT_ID = 333333n;

    const METADATA = {
      description: "Nft Grade for the Blockchain and Cryptoeconomy Course",
      image: "https://file.didattica.polito.it/download/DSK_CONDIVISO/131376",
      name: `Soulbound Grade of s${STUDENT_ID.toString()}`,
      attributes: [
        {
          display_type: "number",
          trait_type: "Grade",
          value: 30,
          max_value: 31,
        },
      ],
    };
    const METADATA_STR = Buffer.from(JSON.stringify(METADATA)).toString();
    const TOKEN_URI = btoa(METADATA_STR);

    const { soulboundGrade, student, randomPerson } = await loadFixture(
      deploySoulboundGradeFixture,
    );

    await soulboundGrade.write.safeMint([
      student.account.address,
      STUDENT_ID,
      TOKEN_URI,
    ]);

    await expect(
      soulboundGrade.write.safeTransferFrom([
        student.account.address,
        randomPerson.account.address,
        STUDENT_ID,
      ]),
    ).to.be.rejectedWith("SBGNonTransferrable");
  });
});
