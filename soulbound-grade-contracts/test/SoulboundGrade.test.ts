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
    const STUDENT_GRADE = "Grade: 30L";
    const { soulboundGrade, student } = await loadFixture(
      deploySoulboundGradeFixture
    );

    await soulboundGrade.write.safeMint([
      student.account.address,
      STUDENT_ID,
      STUDENT_GRADE,
    ]);

    const studentGrade = await soulboundGrade.read.tokenURI([STUDENT_ID]);
    const studentBalance = await soulboundGrade.read.balanceOf([
      student.account.address,
    ]);

    expect(studentBalance).to.equal(1n);
    expect(studentGrade).to.equal(STUDENT_GRADE);
  });

  it("Should not transfer the grade to another student", async function () {
    const STUDENT_ID = 333333n;
    const STUDENT_GRADE = "Grade: 30L";

    const { soulboundGrade, student, randomPerson } = await loadFixture(
      deploySoulboundGradeFixture
    );

    await soulboundGrade.write.safeMint([
      student.account.address,
      STUDENT_ID,
      STUDENT_GRADE,
    ]);

    await expect(
      soulboundGrade.write.safeTransferFrom([
        student.account.address,
        randomPerson.account.address,
        STUDENT_ID,
      ])
    ).to.be.rejectedWith("SBGNonTransferrable");
  });
});
