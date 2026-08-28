# Code Audit Protocols

## Purpose

`code_audit` validates code against Carbon Design System guidelines. It checks
tokens, components, accessibility, layout, and advanced patterns. Use it whenever
the user asks to audit, check, validate, or review Carbon code for compliance.

---

## Parameters

| Parameter        | Type             | Required   | Description                                                                                                                          |
| ---------------- | ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `code`           | string           | ✓ (single) | Code content to validate. Required unless using batch mode.                                                                          |
| `files`          | array of objects | ✓ (batch)  | Batch mode: `[{ path, code, framework?, language? }]`. Max 50 files. Mutually exclusive with `code`.                                 |
| `framework`      | string           | optional   | `react`, `webComponents`, `vue`, `angular`, `svelte`. Auto-detected if omitted.                                                      |
| `language`       | string           | optional   | `javascript`, `typescript`, `html`, `css`, `scss`, `vue`, `svelte`. Auto-detected if omitted.                                        |
| `filename`       | string           | optional   | File path for context — improves auto-detection of framework and language.                                                           |
| `categories`     | string[]         | optional   | Subset of categories to run. Defaults to all. Valid: `tokens`, `components`, `accessibility`, `layout`, `documentation`, `advanced`. |
| `ibmProducts`    | `"yes"` / `"no"` | optional   | Activates IBM Products–specific rules. Omit if unknown.                                                                              |
| `includeContext` | boolean          | optional   | Fetch and attach relevant Carbon docs/code examples to the response. Default `false`. Disabled in batch mode.                        |
| `skipCache`      | boolean          | optional   | Force fresh validation — bypasses the result cache. Default `false`.                                                                 |
| `parallel`       | boolean          | optional   | Batch mode only: process files in parallel (default `true`). Set `false` for sequential.                                             |
| `max_workers`    | number           | optional   | Batch mode only: max parallel workers (default 5, max 10).                                                                           |

> **Note:** There is no `format` parameter in the current API — the server always returns
> the compact format. Do not pass `format: "verbose"`.

---

## Invocation Examples

### Single file

```json
{
  "code": "import { Button } from '@carbon/react';\n<Button style={{ color: '#ff0000' }}>Click</Button>",
  "framework": "react",
  "ibmProducts": "no"
}
```

### Single file with context

```json
{
  "code": "...",
  "framework": "react",
  "includeContext": true
}
```

### Batch mode

```json
{
  "files": [
    { "path": "src/App.jsx", "code": "..." },
    { "path": "src/Header.jsx", "code": "...", "framework": "react" }
  ],
  "framework": "react",
  "categories": ["tokens", "accessibility"]
}
```

### Targeted category audit

```json
{
  "code": "...",
  "categories": ["accessibility"],
  "framework": "react"
}
```

---

## Response Schema — Single File (Compact Format)

```json
{
  "valid": false,
  "total": 3,
  "sev": { "e": 1, "w": 2 },
  "cat": { "tokens": 2, "accessibility": 1 },
  "issues": [
    {
      "rule": "token-color-001",
      "name": "No raw hex colors",
      "sev": "e",
      "msg": "Use Carbon color token instead of raw hex '#ff0000'",
      "fix": "Replace with var(--cds-text-error)",
      "line": 2,
      "col": 18,
      "ctx": "style={{ color: '#ff0000' }}",
      "comp": "Button",
      "token": "#ff0000",
      "cat": "tokens",
      "autoFix": {
        "orig": "#ff0000",
        "repl": "var(--cds-text-error)"
      }
    }
  ],
  "ctx": "react/javascript/tokens,accessibility",
  "took_ms": 142,
  "validation_confidence": 0.95,
  "analysis_method": "ast",
  "meta": { "tool": "carbon-check", "v": "1.0.0" }
}
```

### Top-level fields

| Field                   | Type    | Description                                                                                            |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `valid`                 | boolean | `true` when `total === 0`                                                                              |
| `total`                 | number  | Total issue count                                                                                      |
| `sev`                   | object  | Issue counts by abbreviated severity. Keys omitted when count is 0.                                    |
| `cat`                   | object  | Issue counts by category. Keys omitted when count is 0.                                                |
| `issues[]`              | array   | Present only when `total > 0`. Each entry is a compressed issue object.                                |
| `ctx`                   | string  | Compact context string: `framework/language/categories`                                                |
| `ibm`                   | string  | `"yes"` — present only when `ibmProducts: "yes"` was passed                                            |
| `took_ms`               | number  | Execution time in milliseconds                                                                         |
| `validation_confidence` | number  | Confidence score: `0.95` = AST parse succeeded; `0.85` = regex; `0.7` = fallback                       |
| `analysis_method`       | string  | `"ast"` or `"regex"`                                                                                   |
| `carbon_ctx`            | object  | Present only when `includeContext: true` and issues were found. Contains `docs[]` and `code[]` arrays. |
| `execution_summary`     | object  | Present only when rule failures occurred. Contains `total_rules`, `successful_rules`, `failed_rules`.  |
| `cached`                | boolean | `true` when result was served from cache                                                               |
| `meta`                  | object  | `{ tool: "carbon-check", v: "1.0.0" }`                                                                 |

### Issue object fields

| Field     | Type   | Always present | Description                                                                                                                                                                      |
| --------- | ------ | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rule`    | string | ✓              | Rule ID (e.g. `token-color-001`) — internal identifier; **do not show to users**                                                                                                 |
| `name`    | string | ✓              | Plain-English rule label (e.g. `"No raw hex colors"`) — **use this when presenting issues to users**                                                                             |
| `sev`     | string | ✓              | `"e"` error, `"w"` warning, `"i"` info                                                                                                                                           |
| `msg`     | string | ✓              | Compressed human-readable issue message                                                                                                                                          |
| `fix`     | string | when available | Compressed fix suggestion                                                                                                                                                        |
| `line`    | number | when > 0       | 1-based line number in the submitted code                                                                                                                                        |
| `col`     | number | when > 0       | 1-based column number                                                                                                                                                            |
| `ctx`     | string | when available | Short code snippet around the issue (max 60 chars)                                                                                                                               |
| `comp`    | string | when available | Carbon component name associated with the issue                                                                                                                                  |
| `token`   | string | when available | Design token or raw value that triggered the issue                                                                                                                               |
| `cat`     | string | when available | Category: `tokens`, `components`, `accessibility`, `layout`, `advanced`                                                                                                          |
| `autoFix` | object | when fixable   | `{ orig, repl, scssImports? }` — exact text replacement. `scssImports` lists any `@use` statements that must be present at the top of the SCSS file for the replacement to work. |

---

## Severity and Category Reference

### Severity codes

| Code | Full name | Meaning                                    |
| ---- | --------- | ------------------------------------------ |
| `e`  | error     | Violation of a hard Carbon rule — must fix |
| `w`  | warning   | Likely non-compliant — should fix          |
| `i`  | info      | Suggestion or best-practice note           |

### Categories and what they check

| Category        | What is checked                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `tokens`        | Raw hex colors, raw pixel sizes, hardcoded typography values, spacing not using Carbon tokens                 |
| `components`    | Incorrect prop usage, missing required props, deprecated usage patterns, visual overrides, composition errors |
| `accessibility` | ARIA roles, focus states, keyboard navigation, WCAG contrast ratios                                           |
| `layout`        | Spacing not using the grid, container nesting, component size mismatches                                      |
| `advanced`      | Deprecated components, theme compatibility, anti-patterns — **always runs**                                   |
| `documentation` | Code quality and documentation checks (enabled by default)                                                    |

> **Smart category detection:** When `categories` is not explicitly provided, the server
> analyses the code and only runs categories whose patterns are present (e.g., it skips
> `tokens` for code with no CSS values). `advanced` always runs regardless.

---

## Response Schema — Batch Mode

```json
{
  "batch": true,
  "files_processed": 2,
  "files_failed": 0,
  "total_issues": 5,
  "results": [
    { "path": "src/App.jsx", "valid": false, "total": 3, "sev": { "w": 3 }, "issues": [...] },
    { "path": "src/Header.jsx", "valid": true, "total": 0 }
  ],
  "took_ms": 310,
  "metadata": { "tool": "code_audit", "version": "1.0.0", "mode": "batch", "parallel": true }
}
```

- `files_failed` and `errors[]` are present only when one or more files could not be processed.
- `includeContext` is automatically disabled in batch mode — the server ignores it.

---

## Interpreting Results

1. **`valid: true`, `total: 0`** — code is clean; confirm this to the user.
2. **`sev.e > 0`** — there are hard errors; surface all error-severity issues first.
3. **`autoFix` present** — show the exact `orig` → `repl` substitution; do not guess at fixes.
4. **`validation_confidence < 0.8`** — AST parsing fell back to regex; mention that results
   may be less precise (false positives or missed issues are possible).
5. **`cached: true`** — result is from cache; if the user just changed the code, suggest
   passing `skipCache: true` to get a fresh result.
6. **`execution_summary.failed_rules > 0`** — some rules errored internally; results are
   partial. Disclose this before presenting issues.

### Presenting issues to users

- Use `name` (e.g. "No raw hex colors"), not `rule` (e.g. `token-color-001`), when describing an issue.
- Use `cat` to group issues by category in your response — present errors before warnings.
- Use `msg` as the issue description and `fix` as the recommended action.
- `rule` IDs are for your internal use only (deduplication, linking docs, referencing in tool calls).
  Never surface them in your reply unless the user explicitly asks for the technical rule reference.

---

### `autoFix` in SCSS files

When the `language` is `scss` or `sass` and `autoFix.scssImports` is present, you **must** add
those imports to the top of the file before the first non-`@use` statement. The `repl` value is
already in the correct `$token` form (e.g. `$spacing-05`); without the import the SCSS compiler
will error because the variable is undefined.

Example — a file that has no existing Carbon imports:

```scss
// Before
.card {
  padding: 16px;
}

// After applying autoFix { orig: 'padding: 16px', repl: 'padding: $spacing-05', scssImports: ["@use '@carbon/react/scss/spacing' as *;"] }
@use '@carbon/react/scss/spacing' as *;

.card {
  padding: $spacing-05;
}
```

### Inline style fixes

Carbon v11 only emits CSS custom properties (`--cds-*`) for **color/theme tokens** by default.
Spacing (`$spacing-*`) and typography (`$body-01`, `$heading-03`, etc.) are SCSS compile-time
variables — they are **not** available as `var(--cds-*)` at runtime without a manual `:root`
bridge block.

The rules reflect this:

| Token type                                            | `ctx = "JSX inline style"` behaviour                                       |
| ----------------------------------------------------- | -------------------------------------------------------------------------- |
| Color/theme (`text-primary`, `blue-60`, `background`) | `autoFix.repl` uses `var(--cds-*)` — safe, emitted by default              |
| Spacing (`spacing-05`)                                | No `autoFix`. `fix` says to move to a CSS class and use `$spacing-05`      |
| Typography (`body-compact-01`, `heading-03`)          | No `autoFix`. `fix` says to move to a CSS class and use `$body-compact-01` |

If the project has a manual `:root` bridge (e.g. `--cds-spacing-05: #{spacing.$spacing-05}`) the
`var()` form would work, but the tool cannot detect that bridge so it always guides to a CSS class
for safety.

---

## Post-Audit Workflow

After running `code_audit`, you may follow up with other tools if needed:

- **Deeper docs on a flagged component** — `docs_search` with `component_id` from the issue's `comp` field
- **Correct example for a misused component** — `code_search` with `component_id` from the `comp` field
- **Charts-related issues** — `get_charts` (never `code_search`)

Do **not** pre-fetch docs or examples before calling `code_audit`. The audit itself identifies
which components are problematic; query only after you have audit results to act on.

---

## Error Recovery

| Symptom                          | Recovery                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| `valid: false, error: true`      | Check `errors[]` for input validation failures (empty code, invalid framework, etc.)  |
| `total: 0` but code looks wrong  | Pass `skipCache: true` to bust cache; ensure code is complete and not truncated       |
| `validation_confidence: 0.7`     | AST parse failed; results are regex-only; check `execution_summary` for rule failures |
| Batch: `files_failed > 0`        | Inspect `errors[]` for per-file error messages                                        |
| `issues[]` absent despite errors | `total` is the source of truth — `issues[]` is only emitted when `total > 0`          |
