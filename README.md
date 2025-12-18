# CSV Comparator – Quick Guide

## 1. How to

- **Purpose**: Compare two CSV exports (A and B) to quickly see common rows as well as rows that exist only in A or only in B.
- **Local processing**: Everything runs inside your browser. No data leaves your machine unless your browser extensions intercept it.
- **Large files**: The UI is optimized for sizeable files as long as your browser has enough memory. Closing other heavy tabs helps.
- **Columns to keep**: The fewer columns you select, the faster the computation and the lower the memory usage. Only keep what you need in the final export.
- **Pre-processing tip**: If your CSVs contain many useless columns, trim them beforehand with another tool (`csvcut`, `mlr cut`, a spreadsheet, etc.) to keep the app responsive.
- **Set diagram**:

```
[ A \ B ] | [ A ∩ B ] | [ B \ A ]
  left        intersection    right
```

## 2. Technical notes

- **Tech stack**: Pure front-end (HTML/CSS/JS). No backend, no external dependencies.
- **Security**: A strict Content Security Policy (`script-src 'self' 'sha256-…'`) blocks inline injections; no remote scripts are loaded.
- **CSV parsing**: Custom reader that handles quotes, delimiters, CR/LF endings, and reports rows with unexpected column counts.
- **Join keys**: Each file can have its own key. The inner result merges columns from A and B while prefixing duplicates automatically.
- **Performance**:
  - Rows are stored as JavaScript objects. Fewer selected columns mean smaller objects and faster rendering.
  - Default selections include only the join keys to minimize the initial load.
  - Stats recompute only when files or key options change; you can disable auto-compute to tweak settings before running the calculation.
- **Very large files**:
  - Practical limits depend on available RAM and the browser’s JS engine. On modern machines, hundreds of thousands of rows are feasible if column selections remain small.
  - When you hit performance issues, deselect unneeded columns, pre-filter files, or process them in batches.
- **Export**: Each result (inner, left-only, right-only) is downloadable as a CSV with names derived from the original files.

Happy comparing!
