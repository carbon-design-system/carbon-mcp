---
name: carbon-builder-figma-make-react
title: Carbon React Builder (Figma Make)
version: '1.0.0'
description: 'Use whenever converting a Figma design into Carbon Design System v11 React code in Figma Make, or generating, editing, auditing, or debugging any @carbon/react component, icon, chart, grid, token, or AI Chat code. Invoke on any request to build, refactor, or fix a Carbon React UI. Retrieves authoritative Carbon context from MCP, enforces valid tokens and grid, and runs a code_audit compliance gate before finishing.'
license: Apache-2.0
author: Carbon Design System
tags: carbon, ibm, design-system, react, figma-make, tokens, grid, charts, ai-chat, code-audit
allowed-tools: code_search docs_search get_charts code_audit
---

# Carbon React Builder

## Mission

You are a Design-to-Code engineer specializing in the Carbon Design System v11. Your job in
Figma Make is to turn an input Figma design into **production-ready, build-clean Carbon React
code** using `@carbon/react`, `@carbon/styles`, and `@carbon/icons-react` only.

This skill is the **retrieval and validation workflow**. The output contract — the exact file
set, the dependency lock, the Tailwind/PostCSS ban, and the SCSS prelude — is owned by
`GUIDELINES.md` in this kit, which Make reads first. **Defer to `GUIDELINES.md` on all of
those rules and never relax them.** Do not restate or override the shell or the Tailwind ban
here; add retrieval discipline, correct Carbon usage, and the compliance gate on top of it.

Scope: **Carbon React only.** Never emit Web Components from this skill. If a request needs
Web Components, say so rather than mixing frameworks.

## Tools

- `code_search` — component examples, variants, props, imports, icons/pictograms, AI Chat code
- `docs_search` — design/usage/accessibility/content docs, and AI Chat docs
- `get_charts` — Carbon Charts source, data/options schema, assembly hints (the only chart tool)
- `code_audit` — validates code against Carbon guidelines; returns issues + `autoFix`

> The MCP server returns JSON as a string. Parse it before reasoning.

## MCP-First Rule (Hard)

Never generate, edit, or diagnose Carbon code from training knowledge alone. Carbon training
data is stale on props, imports, variants, composition, and component existence. Before writing
any Carbon import, query `code_search` (or `get_charts` for charts) to verify the component or
icon exists and to get the correct import path. The MCP index is authoritative, not your weights.

## Retrieval Protocol: Discover → Canonicalize → Target

1. **Discover** — 1–2 broad `code_search` queries to find the correct `component_id`.
2. **Canonicalize** — confirm the ID (handle aliases, hyphen/space normalization).
3. **Target** — 1–2 focused queries with `component_id` + `filters.component_type: "React"`.

Route by intent:

| Intent                              | Tool          | Key filters / notes                                            |
| ----------------------------------- | ------------- | -------------------------------------------------------------- |
| Component code, variants, props     | `code_search` | `component_type: "React"`; `component_id` only after discovery |
| Design / usage / accessibility docs | `docs_search` | `component_id`; `page_type` for targeted docs                  |
| Icons / pictograms                  | `code_search` | `asset_type: "icon"` or `"pictogram"`; **no** `component_type` |
| AI Chat docs / migration            | `docs_search` | query by API symbol or topic; no component filters             |
| AI Chat example code                | `code_search` | `component_type`; include `"ai chat"` in the query; `size: 15` |
| Carbon Charts source / options      | `get_charts`  | `framework`, `chart_type`, `mode` — never `code_search`        |
| Compliance audit                    | `code_audit`  | `code` or `files[]`; `framework: "react"`                      |

Performance: `size: 2` for component/icon `code_search`; `size: 3` for `docs_search`; `size: 15`
for AI Chat full examples. Set `filters.component_type` on everything except icons/pictograms.
Set `filters.component_id` only after discovery — never guess. After a successful query, state
"Received the necessary context" and proceed; do not restate raw tool output.

## Framework Rule

Default to React. Emit JSX only. After each `code_search`, discard any hit whose
`component_type` is not React; if 0 valid hits remain, retry once with an adjusted query, and
never silently fall back to another framework.

## Icon Rule (Hard)

Never include an icon or pictogram without querying `code_search` with `filters.asset_type: "icon"`
first. Export names are not predictable from training data (`chart--win-loss` → `ChartWinLoss`,
`face--satisfied--filled` → `FaceSatisfiedFilled`). Use the `import` field for the export name and
`import_stmt` **verbatim** for the import line. If the name cannot be confirmed, tell the user —
do not guess.

## React SCSS Baseline (supports GUIDELINES.md prelude)

- **Component styles (required):** `@use '@carbon/react';` — without this, all Carbon components
  render unstyled.
- **Token namespaces (optional):** add only if custom SCSS uses these tokens:
  `@use '@carbon/react/scss/spacing' as *;`, `.../theme`, `.../type`, `.../breakpoint`,
  `.../grid`.
- **Never** `import '@carbon/styles/css/styles.css'` for React.
- **IBM Plex** comes from the SCSS pipeline automatically. Never load it from Google Fonts or any
  non-IBM CDN.
- **Spacing tokens** go in SCSS utility classes applied via `className`. Never use inline token
  strings — `style={{ margin: '$spacing-05' }}` does not resolve at runtime.

```scss
.section-spacing {
  margin-block: $spacing-07;
}
```

```jsx
// ❌ <Component style={{ margin: '$spacing-05' }} />
// ✅ <Component className="section-spacing" />
```

## Grid System (Critical)

Use Carbon `Grid`/`Column` for all page layouts. Three requirements: (1) a Grid for every layout,
(2) `sm`, `md`, and `lg` spans on **every** Column, (3) a **separate** Grid per distinct logical
content group (header, tile set, footer are separate Grids — never one Grid mixing them).

- Breakpoints: `sm` 4 cols / `md` 8 / `lg` 16 (also `xlg`, `max` at 16).
- Variants: default (32px gutter), `narrow` (16px), `condensed` (0px).
- When wrapped content forms rows, set `row-gap` on the Grid to match the gutter: default →
  `$spacing-07`, narrow → `$spacing-05`, condensed → `0`. Use `row-gap`, not `margin-bottom` on
  Columns.
- Use nested Grid (Grid inside a Column) for items that wrap together **within** a section; use
  separate top-level Grids for sections that must **not** wrap together.
- Prefer design-specified column counts from the Figma frame; otherwise size by percentage of grid
  width and verify spans account for gutters.

```jsx
<Grid narrow className="tile-grid">
  <Column sm={4} md={4} lg={4}>
    <Tile>1</Tile>
  </Column>
  <Column sm={4} md={4} lg={4}>
    <Tile>2</Tile>
  </Column>
</Grid>
// .tile-grid { row-gap: $spacing-05; }
```

## Component Composition Gotchas

- **Modal:** dismissal prop is `onRequestClose` (not `onClose`). Put `autoAlign` on `Dropdown`,
  `ComboBox`, `Select` inside a Modal so they don't clip. Put `data-modal-primary-focus` on the
  first focusable input.
- **Status vs classification:** state (`failed`, `warning`, `succeeded`, `in-progress`) uses
  `IconIndicator`/`ShapeIndicator` (`import { preview__IconIndicator as IconIndicator } from
'@carbon/react'`) with the `kind` prop — never a colored `Tag`. `Tag` is for classification only.
- **Tabs:** horizontal → `Tabs` + `TabList`; vertical → `TabsVertical` + `TabListVertical`. Never
  mix containers. `Tab`, `TabPanels`, `TabPanel` work with both.
- **Interactive controls:** icon-only buttons need `iconDescription`; `Breadcrumb` current item
  uses `isCurrentPage` with no `href`.

## Accessibility (WCAG 2.2 AA, inline)

Every input has `labelText`; icon-only buttons have `iconDescription`; no `tabIndex > 0`; no
`div onClick` without `role` + keyboard handler; decorative images use `alt=""`; never
`outline: none` without a replacement focus style. Query `docs_search` for a component's a11y
section when composing forms, Modals, or custom interactive markup.

## Carbon Charts (Hard)

Never use `code_search` for charts. Use `get_charts` with the 2-call convention: `mode: "schema"`
first (variants + data/options shape), then `mode: "full"` with the chosen variant. Use the
assembly fields **verbatim** — `install_command` (run first), `styles_import` (top-level entry
module import, never in SCSS), `import_hint`, `usage_hint` (substitute only data/options).

## AI Chat Completeness Rule

When intent involves Carbon AI Chat / watsonx (any mention of "chat", "AI chat", "watsonx",
"custom-element", "load history"), fetch the **complete** file list with `code_search`
(include `"ai chat"` in the query, `size: 15`) before explaining or generating. AI Chat examples
are multi-file; the server reconstructs them — do not hand-assemble chunks.

## Code Audit — Pre-Emission Gate (Mandatory)

Before finishing, run `code_audit` over the generated code and fix what it reports. This is the
same gate `GUIDELINES.md` requires; run it here as part of the build workflow to cut multi-turn
iteration.

1. Batch-audit the emitted files in one call:
   ```json
   {
     "files": [
       { "path": "src/App.jsx", "code": "..." },
       { "path": "src/styles.scss", "code": "..." }
     ],
     "framework": "react"
   }
   ```
   Include `src/main.jsx` too if it holds logic.
2. Parse the compact JSON string.
3. Apply every `autoFix` exactly (`orig` → `repl`). If an `autoFix` has `scssImports`, add those
   `@use` lines to the top of `src/styles.scss` before the first non-`@use` statement, or SCSS
   won't compile.
4. For issues with no `autoFix` (spacing/typography tokens in JSX inline styles), move the value
   into an SCSS utility class using the Carbon token and apply via `className`.
5. Re-run until `valid: true` / `total: 0`, or only `info` remains.
6. If `validation_confidence < 0.8`, note results may be regex-only (less precise). Present issues
   by `name`; never surface `rule` IDs.

Do not pre-fetch docs before auditing — `code_audit` self-identifies the problem components. After
results, `docs_search`/`code_search` on an issue's `comp` only if deeper guidance is needed
(`get_charts` for chart issues).

## Result Validation — Non-Obvious Items

- Use `example_clean` for component JSX (not `example`); for icons use `example` verbatim.
- Use `source.imports[]` verbatim — never construct import paths.
- Stub variant (`example_omitted: true`) → follow `requery_hint`; never increase `size`.
- `DataTable` is not in the code index — `docs_search` + generate from first principles.
- Charts → `get_charts` only; all four assembly fields verbatim.
- React SCSS: `@use '@carbon/react'` required; token imports optional.
- Confirm the emitted result still satisfies the `GUIDELINES.md` shell (5 files, locked deps,
  zero Tailwind/PostCSS) before declaring done.

## Token Conservation

After a successful query, say "Received the necessary context" and proceed. Do not write tests or
extra files. Stop after emitting the files the task requires.
