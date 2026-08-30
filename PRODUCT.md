# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary user: a Thai high-school chemistry teacher (ครูเคมี) standing in front of a Matthayom 5 classroom, projecting the page on a screen/projector and driving it live while teaching. They control the page; students watch the projection.

Secondary user: Matthayom 5 students (age ~16-17) who may reopen the same URL later on a phone to review before an exam.

## Product Purpose
A sequence of single-page HTML lessons covering "อัตราการเกิดปฏิกิริยาเคมี" (chemical reaction rates) in the Thai IPST/สสวท. curriculum, one page per concept. This first page covers Concept 1: reaction rate as a rate of change. Success = the teacher can run a full class period off the page without slides, and students leave able to compute average rate, read instantaneous rate off a tangent, convert rates by stoichiometric coefficient, and choose a measurement method.

## Positioning
Thai chemistry teaching material is almost entirely static: textbook pages, photocopies, and PowerPoint screenshots of graphs. This page makes the graph itself manipulable in front of the class — a secant that the teacher can narrow until it becomes the tangent — which is the exact idea a static textbook figure cannot show.

## Operating Context
- Projected in a classroom, often on a low-contrast projector in a lit room; viewed from the back row.
- Teacher-driven: the teacher clicks and drags while talking; no student input devices.
- Class period length ~50 minutes; this page is planned for roughly 1.5-2 periods.
- Later re-read by students on mobile phones.
- Thai language throughout; chemistry notation and units in international form.

## Capabilities and Constraints
- Single self-contained HTML file, no build step, no external JS/CSS dependencies (published as a Claude Artifact under a strict CSP; Google Fonts is the only permitted external host).
- Interactive graph must be hand-built inline SVG + vanilla JS.
- Must render correctly in both light and dark viewer themes and must not scroll horizontally on a phone.
- Concept 1 scope is fixed and confirmed: definition and units; average vs instantaneous vs initial rate; rate and stoichiometric coefficients; experimental methods of measuring rate; common misconceptions; end-of-page exercises.
- Instantaneous rate is taught properly, including how to draw a tangent by hand (confirmed choice over a qualitative "steeper = faster" treatment).
- Exercises are pitched at textbook level, not university-entrance level.
- File naming follows `NN-slug.html` so the seven concept pages sort in order.

## Brand Commitments
None pre-existing. Thai text must use a Thai-capable typeface with proper Thai vowel/tone-mark rendering.

## Evidence on Hand
- The seven-concept curriculum analysis agreed earlier in this project.
- No สสวท. textbook scans are present yet: `D:\Desktop\chemical rate\` is empty. The teacher will photograph the textbook exercises into this folder later. Until they arrive, exercise items are written in the style of standard IPST experiments (Mg + HCl, CaCO3 + HCl, Na2S2O3 + HCl, H2O2 decomposition) and are NOT reproductions of the actual textbook. They must be swapped for the real items once the photos land, and must not be described to anyone as textbook-sourced before then.

## Product Principles
1. The projector is the medium: type, line weight, and contrast are sized for the back row, not for a laptop reader.
2. Every abstraction gets a manipulable object. If a claim can be dragged, it is dragged, not described.
3. One concept per page, taught to completion, ending in practice.
4. Misconceptions are content, not footnotes; the page names the wrong answer explicitly before correcting it.
5. Nothing is claimed as coming from the textbook until the textbook is actually in hand.

## Accessibility & Inclusion
Projection legibility is the binding constraint: minimum body size well above web norms, high contrast against projector washout, and no meaning carried by color alone (graph lines are distinguished by dash pattern and label as well as hue).
