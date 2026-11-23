#!/bin/sh
# Refuses a commit that adds private key material. Runs from .husky/pre-commit.
# Keys belong in .secrets/ (git-ignored) or in the deployment's secret store.

pattern='-----BEGIN ([A-Z0-9]+ )*PRIVATE KEY( BLOCK)?-----'
found=0

# Read the names line by line and unquoted, so names with spaces or non-ASCII
# characters are scanned too.
files=$(git -c core.quotepath=off diff --cached --name-only --diff-filter=ACMR)
while IFS= read -r file; do
    [ -n "$file" ] || continue
    if git diff --cached --no-color -U0 -- "$file" | grep -E '^\+' | grep -Eq -e "$pattern"; then
        echo "Private key material found in staged file: $file" >&2
        found=1
    fi
done <<LIST
$files
LIST

if [ "$found" -ne 0 ]; then
    echo "Commit refused: remove the private key from the commit. If it was ever pushed, treat it as compromised and rotate it." >&2
    exit 1
fi
