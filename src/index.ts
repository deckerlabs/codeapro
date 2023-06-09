#!/usr/bin/env node
import isFolderCodeapro from "./helpers/is-folder-codeapro";
import { Command } from "commander";
import runInit from "./commands/init";
import runTest from "./commands/test";
import runWatch from "./commands/watch";
import runGet from "./commands/get";

const program = new Command();

program.name("codeapro").description("Code Like a Pro CLI.").version("0.0.11");

program
  .command("init", { isDefault: true })
  .description("Initialize the base in the current directory.")
  .argument("[name]")
  .option("--useNpm", "Use npm as the package manager.")
  .option("--useYarn", "Use yarn as the package manager.")
  .option("--usePnpm", "Use pnpm as the package manager.")
  .action(async (str, opts) => {
    await runInit(opts);
  });

program
  .command("test")
  .description("Run the tests for a specific challenge.")
  .argument("<challenge name>")
  .argument("[solution file]")
  .action(async (challenge, solution) => {
    if (!isFolderCodeapro) {
      process.exit(1);
    }
    await runTest(challenge, solution);
  });

program
  .command("watch")
  .description("Run the tests on a challenge when a file is changed.")
  .argument("[name]")
  .action(async () => {
    if (!isFolderCodeapro) {
      process.exit(1);
    }
    await runWatch();
  });

program
  .command("get")
  .description("Get specified challenge.")
  .argument("<challenge>")
  .action(async (challenge) => {
    if (!isFolderCodeapro()) {
      process.exit(1);
    }
    await runGet(challenge);
  });

program.parse();
