# deepmerge (patched)

Local copy of [deepmerge](https://github.com/TehShrike/deepmerge) 4.3.1 (`dist/cjs.js`)
with a fix for [GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4)
(CVE-2026-93753, prototype poisoning of the object returned by `mergeObject()`).

Upstream has no fixed release, so `package.json` overrides every `deepmerge`
in the dependency tree with this copy.

The only change to the upstream code is in `index.js`: properties are written
to the result with `setProperty()`, which defines `__proto__` as an ordinary own
property instead of assigning it (which would replace the result's prototype).

Remove this directory and the `deepmerge` override once upstream publishes a
fixed version.
