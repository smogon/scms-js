This is a transitional repository, related to the long-term project of retiring Smogon's legacy CMS.

`src/` is served at `https://www.smogon.com/__scms-js/`, and `old-scms-content/`
holds the stylesheets that went with it. A legacy page reaches a script by
writing a `<script src>` for it in the page's `[head]`.

src/widgets
-----------

Page-agnostic behavior that the article corpus wrote inline, one copy per page,
until it was collected here. These belong to no section: the disclosure widget
alone runs on `/articles/` and on every `/translations/` locale.

- ES5 and jQuery. No build step, no modules, no bundler. It is a plain
  `<script src>`, and it defines no globals.
- Configuration comes from `window.scmsJSON`, read inside `$(document).ready`.
  The CMS assigns it at the *end* of `[head]`, after this file's own tag has
  run, so nothing may read it at parse time.
- Per-element configuration is a `data-*` attribute on the markup, and
  `scmsJSON` carries page-level defaults only. The markup is already in the
  document; it does not get restated in JSON.
- Every knob defaults to what the corpus does most, so the majority of pages
  load a widget and write no `[json]` at all.
- Loading a widget on a page whose markup it does not match binds nothing and
  throws nothing.
