# Divergipedia Editing Cheatsheet

1. Open `web/data/divergipedia.json` in a plain-text editor.
2. Each entry lives inside the `pages` array as an object with:
   - `title`: short name of the concept.
   - `description`: one-sentence explainer.
   - Optional `tip`: concrete next step or usage note.
3. Keep tone witty-but-clear. No inside jokes that need a decoder ring.
4. Validate JSON (commas between items, quotes around keys/values).
5. Save the file and refresh `divergipedia.html` — no build step required.
