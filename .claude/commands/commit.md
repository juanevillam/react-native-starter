---
description: Commit all current changes in logically grouped chunks following conventional commit conventions
---

# Commit Changes in Proper Chunks

You must commit the current working tree changes following these rules:

## Commit Message Convention

This project uses **conventional commits**. Format:

```
type: short lowercase description
```

**Types:** `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `perf`, `ci`, `build`

- Message must be lowercase after the type prefix
- No period at the end
- Keep it concise (under 72 characters)
- Focus on the "why" or "what changed", not implementation details

## Chunking Strategy

Do NOT put all changes into a single commit unless they are genuinely one logical change. Instead:

1. Run `git status` and `git diff` to understand all current changes.
2. Group changes into **logical chunks** — each chunk should represent one coherent purpose. Examples of good groupings:
   - All files related to a new feature → one `feat:` commit
   - Config/dependency changes → one `chore:` commit
   - Translation updates → one `chore:` or `feat:` commit
   - Style-only changes → one `style:` commit
   - Documentation changes → one `docs:` commit
   - Bug fixes → one `fix:` commit per distinct bug
   - Barrel file / re-export updates that accompany a feature → include in the feature commit, not separate
3. Stage and commit each chunk separately, in a logical order (e.g., dependencies before features, features before docs).
4. Use `git add <specific files>` for each chunk — never `git add -A` or `git add .` unless everything belongs together.

## Process

1. Analyze all changes (staged + unstaged + untracked)
2. Propose the chunking plan to the user with the files and commit message for each chunk
3. Wait for user approval before committing
4. Execute each commit in order
5. Run `git log --oneline -n <number_of_new_commits>` at the end to show the result
