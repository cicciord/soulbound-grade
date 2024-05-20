import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SoulboundGradeModule = buildModule("SoulboundGradeModule", (m) => {
  const soulboundGrade = m.contract("SoulboundGrade");

  return { soulboundGrade };
});

export default SoulboundGradeModule;
