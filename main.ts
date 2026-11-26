// The Absurd Clause Contest — entry program for the make.fun bounty
// "The Absurd Clause Contest" (u-donrulezz-the-absurd-clause-contest-035cc0f1).
//
// The entry is one original English sentence of 1 to 200 characters written
// as an absurd clause that could hide deep inside a terms-of-service
// agreement. The judge weighs, in order: the sentence must be such a clause,
// it must be funny on its own with no outside setup, it must sound like real
// legal boilerplate until the absurdity hits — the joke coming from the
// register as much as the words — it must be original and specific with a
// concrete absurd image, and it must be one clean sentence that never
// explains its own joke.
//
// This clause keeps a straight legal face for as long as possible: section
// number, the classic "by continuing to breathe" consent fiction, and the
// parenthetical numeral style of real contracts. The absurdity is smuggled
// in as casually as real terms smuggle everything else — a yawn after 6 p.m.
// counts as accepting another hour of work, which every tired employee has
// already suspected the contract said anyway.
//
// The program writes the line to entry.txt inside the output directory
// (argv[2], falling back to /output). The output directory is a mount point
// in the grading sandbox, so its contents are cleared, never the directory
// itself.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Section 12.4: By continuing to breathe within the premises, the user " +
  "agrees that any yawn occurring after 6 p.m. constitutes acceptance of " +
  "one (1) additional hour of work.";

function clearContents(dir: string): void {
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  // The gate counts characters, so refuse to emit anything over the cap.
  if (ENTRY.length > 200) {
    throw new Error(`entry is ${ENTRY.length} chars, over the 200 cap`);
  }
  const outDir = process.argv[2] ?? "/output";
  mkdirSync(outDir, { recursive: true });
  clearContents(outDir);
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote entry.txt (${ENTRY.length} chars) to ${outDir}`);
}

main();
