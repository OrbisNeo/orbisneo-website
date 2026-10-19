import { readFile, readdir, access } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");

const exists = async (p: string): Promise<boolean> => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

const htmlFiles = ((await readdir(DIST, { recursive: true })) as string[])
  .filter((f) => f.endsWith(".html"))
  .map((f) => join(DIST, f));

const unescape = (s: string) => s.replace(/&amp;/g, "&").replace(/&#38;/g, "&");

const redirectSources = new Set(
  (await readFile(join(ROOT, "public/_redirects"), "utf8"))
    .split("\n")
    .map((l) => l.trim().split(/\s+/)[0])
    .filter((s) => s && !s.startsWith("#") && s.startsWith("/") && !s.includes("*")),
);

const resolveFile = async (pathname: string): Promise<string | null> => {
  const clean = decodeURI(pathname);
  const candidates = clean.endsWith("/")
    ? [join(DIST, clean, "index.html")]
    : [join(DIST, clean), join(DIST, clean, "index.html"), join(DIST, `${clean}.html`)];
  for (const c of candidates) if (await exists(c)) return c;
  return null;
};

const idCache = new Map<string, Set<string>>();
const idsOf = async (file: string): Promise<Set<string>> => {
  let ids = idCache.get(file);
  if (!ids) {
    const text = await readFile(file, "utf8");
    ids = new Set([...text.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    idCache.set(file, ids);
  }
  return ids;
};

const errors: string[] = [];
let checked = 0;

for (const file of htmlFiles) {
  const rel = relative(DIST, file);
  if (rel === "__forms.html") continue;
  const text = await readFile(file, "utf8");
  for (const m of text.matchAll(/\s(?:href|src|action)="([^"]*)"/g)) {
    const raw = unescape(m[1]).trim();
    if (!raw || /^(mailto:|tel:|data:|javascript:|https?:|\/\/)/i.test(raw)) continue;
    checked++;

    const [beforeHash, hash] = raw.split("#");
    const pathname = beforeHash.split("?")[0];

    if (!pathname) {
      if (hash && !(await idsOf(file)).has(hash)) errors.push(`${rel}: anker #${hash} bestaat niet op de pagina`);
      continue;
    }
    if (!pathname.startsWith("/")) {
      errors.push(`${rel}: relatieve link ${raw} (gebruik een absoluut pad)`);
      continue;
    }
    if (redirectSources.has(pathname)) {
      errors.push(`${rel}: ${raw} verwijst naar een redirectbron`);
      continue;
    }
    const target = await resolveFile(pathname);
    if (!target) {
      errors.push(`${rel}: ${raw} bestaat niet in dist`);
      continue;
    }
    if (hash && target.endsWith(".html") && !(await idsOf(target)).has(hash)) {
      errors.push(`${rel}: ${raw} wijst naar een anker dat niet bestaat`);
    }
  }
}

if (errors.length) {
  const unique = [...new Set(errors)];
  console.error(`check-links: ${unique.length} kapotte link(s)`);
  for (const e of unique) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`check-links: ${checked} interne verwijzingen in ${htmlFiles.length} pagina's, geen kapotte links`);
