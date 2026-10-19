import { readFile, access } from "node:fs/promises";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");
const PROD = "https://www.orbisneoconsulting.com";
const ALLOWED_STATUS = new Set(["301!", "410!"]);

const exists = async (p: string): Promise<boolean> => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

// URL path -> file in dist (directory index for trailing slash, plain file otherwise)
const distFileFor = (path: string): string =>
  path.endsWith("/") ? join(DIST, path, "index.html") : join(DIST, path);

interface Rule {
  line: number;
  from: string;
  to: string;
  status: string;
}

const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

const raw = await readFile(join(ROOT, "public/_redirects"), "utf8");
const rules: Rule[] = [];

raw.split("\n").forEach((text, i) => {
  const line = text.trim();
  if (!line || line.startsWith("#")) return;
  const parts = line.split(/\s+/);
  if (parts.length !== 3) {
    fail(`regel ${i + 1}: verwacht "van naar status", kreeg ${parts.length} onderdelen`);
    return;
  }
  const [from, to, status] = parts;
  if (!ALLOWED_STATUS.has(status)) fail(`regel ${i + 1}: status ${status} niet toegestaan (301! of 410!)`);
  rules.push({ line: i + 1, from, to, status });
});

if (!(await exists(join(DIST, "_redirects")))) fail("dist/_redirects ontbreekt (build gedraaid?)");

const seen = new Set<string>();
let firstHostRule = 0;

for (const r of rules) {
  const isHostRule = /^https?:\/\//.test(r.from);

  if (seen.has(r.from)) fail(`regel ${r.line}: dubbele bron ${r.from}`);
  seen.add(r.from);

  if (isHostRule) {
    if (!firstHostRule) firstHostRule = r.line;
    if (!r.to.startsWith(`${PROD}/`)) fail(`regel ${r.line}: domeinregel moet naar ${PROD}/ verwijzen`);
    continue;
  }

  if (firstHostRule) {
    fail(`regel ${r.line}: padregel ${r.from} staat na de domeinregels (regel ${firstHostRule}) en wordt overschaduwd`);
  }

  // The source must not hijack a live page.
  const base = r.from.endsWith("/*") ? r.from.slice(0, -1) : r.from;
  if (await exists(distFileFor(base))) {
    fail(`regel ${r.line}: bron ${r.from} bestaat in dist en zou een echte pagina overschrijven`);
  }

  // The target must exist.
  let targetPath: string;
  if (r.to.startsWith(`${PROD}/`)) targetPath = new URL(r.to).pathname;
  else if (r.to.startsWith("/")) targetPath = r.to;
  else {
    fail(`regel ${r.line}: doel ${r.to} is geen pad op ${PROD} of een lokaal pad`);
    continue;
  }
  if (!(await exists(distFileFor(targetPath)))) {
    fail(`regel ${r.line}: doel ${targetPath} bestaat niet in dist`);
  }
}

if (errors.length) {
  console.error(`check-redirects: ${errors.length} fout(en)`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`check-redirects: ${rules.length} regels, alle bronnen en doelen kloppen`);
