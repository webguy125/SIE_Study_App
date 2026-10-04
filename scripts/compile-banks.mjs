import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BANKS_DIR = join(__dirname, 'banks');
mkdirSync(BANKS_DIR, { recursive: true });

function pyToJs(content) {
  return content
    .replace(/^"""[\s\S]*?"""\r?\n\r?\n/m, '')
    .replace(/def q\(/g, 'function q(')
    .replace(/def (section\d+_questions)\(\):/g, 'function $1() {')
    .replace(/\)\s*:\s*\n(\s*)return \{/g, ') {\n$1return {')
    .replace(/^\s*items = \[\]\s*$/gm, '  const items = [];')
    .replace(/items\.append\(/g, 'items.push(')
    .replace(/return items\[:?\d*\]/g, 'return items;')
    .replace(/if __name__[\s\S]*$/m, '')
    .replace(/\\'/g, "'")
    .replace(/^\s*#.*$/gm, '')
    .replace(/\r?\n[\t ]+\}\r?\n(?:\r?\n)+function section/g, '\n    }\n}\n\nfunction section')
    .replace(/^SECTION_NAME = /gm, 'const SECTION_NAME = ')
    .replace(/^SECTION_NAMES = /gm, 'const SECTION_NAMES = ');
}

function wrapModule(jsBody, fnName) {
  let trimmed = jsBody.trimEnd();
  trimmed = trimmed.replace(/\r?\n[\t ]+\}\r?\n(?:\r?\n)+function section/g, '\n    }\n}\n\nfunction section');
  const needsClose = !trimmed.endsWith('}');
  return `${trimmed}${needsClose ? '\n}' : ''}

export const questions = ${fnName}();
`;
}

const sources = [
  { py: join(__dirname, 'build-banks.py'), fn: 'section1_questions', out: 'section1.mjs', extract: true },
  { py: join(__dirname, 'build_banks_s2.py'), fn: 'section2_questions', out: 'section2.mjs' },
  { py: join(__dirname, 'build_banks_s3.py'), fn: 'section3_questions', out: 'section3.mjs' },
  { py: join(__dirname, 'build_banks_s4.py'), fn: 'section4_questions', out: 'section4.mjs' },
];

for (const src of sources) {
  let content = readFileSync(src.py, 'utf8');

  if (src.extract) {
    const match = content.match(/def section1_questions\(\):[\s\S]*?return items\[:68\]/);
    if (!match) throw new Error('Could not extract section1 from build-banks.py');
    let body = match[0]
      .replace(/def section1_questions\(\):\s*\n/, '')
      .replace(/"""[\s\S]*?"""\s*\n/, '')
      .replace(/items = \[\]\s*\n/, '')
      .replace(/return items\[:68\]/, 'return items;')
      .replace(/items\.append\(/g, 'items.push(')
      .replace(/\\'/g, "'")
      .replace(/^\s*#.*$/gm, '');

    content = `const SECTION_NAME = "Knowledge of Capital Markets";\n\nfunction q(section_id, topic, difficulty, prompt, choices, correct, explanation, tags, objective, tip) {
  return {
    section_id, section_name: SECTION_NAME, topic, difficulty, prompt,
    choices: { A: choices[0], B: choices[1], C: choices[2], D: choices[3] },
    correct_answer: correct, explanation, keyword_tags: tags,
    learning_objective: objective, remediation_tip: tip,
  };
}\n\nfunction section1_questions() {\n  const items = [];\n${body}\n}`;
  } else {
    content = pyToJs(content);
  }

  const outPath = join(BANKS_DIR, src.out);
  const tmpPath = join(BANKS_DIR, `_tmp_${src.out}`);
  writeFileSync(tmpPath, wrapModule(content, src.fn));

  try {
    const mod = await import(pathToFileURL(tmpPath).href);
    const count = mod.questions.length;
    writeFileSync(outPath, `export const questions = ${JSON.stringify(mod.questions, null, 2)};\n`);
    console.log(`Wrote ${src.out}: ${count} questions`);
  } catch (err) {
    console.error(`Failed compiling ${src.out}:`, err.message);
    process.exit(1);
  }
}

console.log('Bank compilation complete.');