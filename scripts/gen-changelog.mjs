#!/usr/bin/env node
/*
 * gen-changelog.mjs
 *
 * Auto-generates pages/changelog.mdx from git commit history.
 *
 * Grouping: by ISO date (descending). Commit subjects become bullet points.
 * Conventional commits are parsed into type tags (feat/fix/docs/...) and a
 * body-highlighted summary.
 *
 * Runs on every `npm run build` (see package.json) so the deployed site
 * always has a fresh changelog. Manually: `npm run changelog`.
 *
 * Uses execFileSync (no shell) to avoid command-injection surface area.
 */
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "pages", "changelog.mdx");

const FORMAT = "%H%x1f%ad%x1f%an%x1f%s%x1f%b%x1e";

function gitLog() {
  try {
    return execFileSync(
      "git",
      ["log", "--date=short", `--pretty=format:${FORMAT}`],
      { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    );
  } catch {
    // No commits yet, or git missing. Emit a placeholder instead of failing the build.
    return "";
  }
}

function parseCommits(raw) {
  if (!raw.trim()) return [];
  return raw
    .split("\x1e")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => {
      const [hash, date, author, subject, body] = line.split("\x1f");
      return { hash, date, author, subject, body };
    });
}

function typeOf(subject) {
  const m = subject.match(/^(\w+)(\([^)]+\))?:\s*(.*)$/);
  if (!m) return { type: "chore", scope: null, title: subject };
  return { type: m[1], scope: m[2] ? m[2].slice(1, -1) : null, title: m[3] };
}

const ORDER = ["feat", "fix", "perf", "refactor", "docs", "build", "ci", "test", "chore"];
const LABEL = {
  feat: "Added",
  fix: "Fixed",
  perf: "Performance",
  refactor: "Changed",
  docs: "Docs",
  build: "Build",
  ci: "CI",
  test: "Tests",
  chore: "Chore",
};

function render(commits) {
  const header = `---
title: Changelog
description: Generated from git commits. Newest first.
---

# Changelog

> Generated automatically from git history on build.
> Commits follow [Conventional Commits](https://www.conventionalcommits.org/).

`;

  if (commits.length === 0) {
    return (
      header +
      `*No commits recorded yet.* Once you commit to this repo, running \`npm run build\` refreshes this page.\n`
    );
  }

  const byDate = new Map();
  for (const c of commits) {
    if (!byDate.has(c.date)) byDate.set(c.date, []);
    byDate.get(c.date).push(c);
  }

  const dates = [...byDate.keys()].sort().reverse();

  const sections = dates.map((date) => {
    const group = byDate.get(date);
    const byType = new Map();
    for (const c of group) {
      const { type, scope, title } = typeOf(c.subject);
      const bucket = ORDER.includes(type) ? type : "chore";
      if (!byType.has(bucket)) byType.set(bucket, []);
      byType.get(bucket).push({ ...c, scope, title });
    }

    const typeSections = ORDER.filter((t) => byType.has(t)).map((t) => {
      const items = byType
        .get(t)
        .map(
          (c) =>
            `- ${c.scope ? `**${c.scope}** - ` : ""}${c.title} ([${c.hash.slice(0, 7)}](https://github.com/schenkei/nexa-docs/commit/${c.hash}))`
        )
        .join("\n");
      return `### ${LABEL[t]}\n\n${items}`;
    });

    return `## ${date}\n\n${typeSections.join("\n\n")}`;
  });

  return header + sections.join("\n\n");
}

const commits = parseCommits(gitLog());
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, render(commits) + "\n", "utf8");
console.log(
  `[gen-changelog] wrote ${OUT} with ${commits.length} commit${commits.length === 1 ? "" : "s"}`
);
