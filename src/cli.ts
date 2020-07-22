#!/usr/bin/env node
import * as path from "path";
import minimist from "minimist";
import { check } from "./index";

const {
  workspace,
  srcDir,
  onlyTemplate,
  onlyTypeScript,
  ignoredDupIdentifier,
  excludeDir,
} = minimist(process.argv.slice(2));

if (!workspace) {
  throw new Error("--workspace is required");
}

const cwd = process.cwd();

check({
  workspace: path.resolve(cwd, workspace),
  srcDir: srcDir && path.resolve(cwd, srcDir),
  onlyTemplate,
  onlyTypeScript,
  ignoredDupIdentifier: toStringArray(ignoredDupIdentifier),
  excludeDir,
});


function toStringArray(val: any): string[] {
  if (typeof val === 'string') {
    return [val]
  } else if (typeof val === 'object') {
    return val
  } else {
    return [val.toString()]
  }
}