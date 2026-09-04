# ESA: content direction and evidence

Current cleanup: the captured template archive, duplicate root files and unused assets were removed at the user's request. Runtime libraries, the active base stylesheet (`public/styles/site-base.css`), fonts and HDR lighting remain. The notes below record the earlier content adaptation and asset provenance, not a requirement to keep the original export.

## Instagram color adaptation

Public reference reviewed on 4 September 2026: https://www.instagram.com/esa_coder_solutions/ . The visible avatar and pinned three-panel ESA mosaic use a metallic gold logo on black, with bronze shadows and pale gold highlights. Individual post details require login, but the profile grid and logo were visually accessible without signing in. No private posts or account data were accessed.

Implementation palette (visually interpreted, not official brand HEX specifications): black `#0c0c0b`, surface `#161613`, ivory text `#f5f2eb`, muted text `#beb8ac`, gold `#d4ab58`, light gold `#f2d58b`, bronze `#a77a32`. `src/theme.js` supplies the CSS variables, canvas palette and Three.js materials. Original green accents are replaced in active UI classes, loader/transitions, reveal overlays, interactive hexagons, both 3D logos and the footer shader. Original CSS/assets remain archived unchanged.

The website copy remains without Romanian diacritics as requested. Color verification: `node scripts/verify-brand.mjs`; compile/content verification: `npm run build` and `node scripts/verify-esa-content.mjs`. Solid text/background pairs pass 4.5:1 contrast; this is not a full rendered-page accessibility audit. The local site was not visually retested in this turn; Instagram reference screenshots were inspected.

Reviewed 4 September 2026: https://esa-coder-solutions.com/ (rendered hero/services and public page bundles).

## Positioning

The published offering supports positioning ESA as a custom digital development partner: websites, frontend, web applications, e-commerce, Shopify, integrations, business tools, technical SEO and maintenance. It is wider than web design alone. The new copy uses the developer's first-person voice inside the ESA brand, with specific use cases and deliverables rather than unsupported seniority claims.

This is an analysis of the public professional presentation, not an independent code-quality audit or certification of skills.

## Kept and adapted

- The template's strongest proposition: a brand deserves more than a pretty website.
- Design with purpose, code with passion, purposeful interactions, and the invitation to start without a perfect brief.
- The six-step process, renamed around requirements, planning, design, development, testing and handover.
- Existing animation systems, rotating ESA model, draggable process cards and portfolio effects.

## Added

- Professional introduction and six service groups with concrete scope.
- Technology-selection rationale, without claiming every project uses every technology.
- Four FAQs: starting with an idea, taking over an existing project, estimates, and post-launch work.
- Published ESA portfolio selection: Team Stoica, Beauty Villa, Event Smart Assistant, Xelle. No invented project metrics, implementation roles or case-study results. Amber Cloud is also published on the source site, but omitted to preserve the existing four-item animated gallery.
- The published telephone +40 755 938 367, used for telephone contact and a user-confirmed WhatsApp draft. No public email was verified, so none was invented. Availability of WhatsApp on that number has not been independently confirmed.

## Deliberately not copied

The source hero contains generic English metrics (10+ years, 3,000+ businesses, 4.9/5); their underlying evidence was not available. They were not carried over. Unqualified 24/7 support, guarantees, universal performance claims, stock client portraits and exact contractual/pricing promises were not added.

The original template projects and contact identities were replaced, rather than presented as ESA work. The Google Apps Script POST was removed so prospect details cannot go to the template owner's endpoint.

## Assets and checks

Portfolio posters came from the official site's `ProjectsShowcase-DFnR3qbE.js` references:

- `/assets/team-stoica-poster-CU2bIT2D.webp`
- `/assets/beauty-villa-poster-JOrcRdg9.webp`
- `/assets/event-smart-assistant-poster-C7VkvTe0.webp`
- `/assets/xelle-poster-DmNumokg.webp`

`public/assets/esa/logo.png` is the user-supplied parent-folder logo. Romanian font supplements use the same families from Google Fonts: Bebas Neue, Inter Tight and Plus Jakarta Sans. The old CSS/font files remain unchanged.

Verification covers production compilation, source assertions, asset formats, local file preservation and HTTP delivery. No new visual browser QA or real contact message was performed for this content change. The live ESA domain has not been modified.
