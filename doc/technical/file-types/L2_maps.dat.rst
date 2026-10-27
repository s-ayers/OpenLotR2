============
L2_maps.dat
============

There are 40 map slots in L2_MAPS.DAT but only 24 are used
Each map has six 64*64 bitmaps and one 65*129 bitmap

File layout
===========

+--------+----------------------------------------------------------+
| Unit   | Size                                                     |
+========+==========================================================+
| File   | 40 slots × 65,922 B = 2,636,880 B (exact)               |
+--------+----------------------------------------------------------+
| Slot   | 2 blocks × 32,961 B                                     |
+--------+----------------------------------------------------------+
| Block  | six 64×64 byte planes (4,096 B each) + one 65×129        |
|        | bitmap (8,385 B) = 32,961 B                              |
+--------+----------------------------------------------------------+

Slot usage (verified by MD5 over the English build)
===================================================

* Slots 0–11 and 20–29: unique map data
* Slot 12: unique map data, with **byte-identical copies in slots
  13–19**
* Slot 30: unique map data, with **byte-identical copies in slots
  31–39**

So 24 slots hold unique data (matching the "24 used" count above), and
16 slots are redundant copies of two maps: 8 copies of slot 12's map
and 10 copies of slot 30's map.

Block content
=============

Each block is six byte planes of 64×64 (row-major, one byte per cell)
followed by the 65×129 bitmap.

Plane 0 — terrain (verified)
----------------------------

* Value ``4`` = sea, ``0`` = land base.
* Orientation and sea polarity confirmed by an overlap test against the
  manual's "England Circa AD 1268" screenshot: row-major with 4 = sea
  scores **0.899** (alternatives: 0.813 transposed, 0.66–0.77 with
  inverted polarity).
* Observed values in real maps: 0, 1, 2, 3, 4, 8, 10, 16, 18, 32, 64,
  128, 130. Values 1 / 8 / 2 form line networks (roads? rivers?) —
  **not yet verified**.

Plane 2 — county colouring (likely)
------------------------------------

Dithered fill using palette indices in the 22–27 range of
``Lords2.256``.

Planes 1, 3, 4, 5 — open
-------------------------

Sparse data; semantics not yet identified.

65×129 bitmap — open
---------------------

Purpose not yet identified.

Rendering
=========

Terrain renders with the isometric ``Base01.pl8`` sheet (58×30 diamond
tiles): cell ``(c, r)`` maps to screen ``x = (c − r) × 29 + offset``,
``y = (c + r) × 15``. Deep/shallow water and grass tiles are selected
per cell; coastline transition tiles are chosen by which of the four
diamond edges face water (tile edge masks were classified by sampling
each edge midpoint for blue-dominance).

Validation
==========

Decoded and rendered with Python tooling: all **48** non-template
blocks produce complete maps; slot template detection by MD5; the
England render was visually verified against the manual screenshot.
