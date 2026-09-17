# Remove generated-looking patterns site-wide

## Scope

- Audit every authored route and shared component, including login, registration, dashboard, triage, offline resources, and homepage sections.
- Replace `rounded-full` on all interactive controls with `rounded-md`. Preserve small circular status indicators only where they represent a dot or map marker, not a pill/button.
- Remove all em dashes from authored code and public content. Rewrite visible prose and metadata with natural punctuation; use clear placeholders such as “Not available” instead of dash glyphs.
- Remove decorative emoji and replace only meaningful actions/statuses with Lucide icons.

## Homepage cleanup

- Remove the `Stats` section and its import, delete the unused component, and remove `react-countup` if no other usage remains.
- Rewrite the main headline and supporting copy around specific functions: trail guidance, cached emergency resources, location-based weather, SOS preparation, and multilingual assistance.
- Remove the generated mountain photograph from the hero. Replace it with a restrained CSS/topographic mountain treatment using existing semantic colors, without adding purple gradients.
- Remove snowfall, floating loops, animated grids, pulsing decorative glows, and bouncing typing dots. Keep only short, one-time fade/slide transitions where they clarify page entry.
- Remove or correct homepage mock content that presents invented coordinates, rescue dispatches, vitals, route coverage, language counts, or other unsupported capabilities as live facts.

## Site-wide credibility pass

- Review all Framer Motion usage and reduce it to subtle one-time opacity/position transitions; remove decorative continuous motion and hover movement.
- Remove “AI-style” buzzword copy and unsupported claims across feature, process, emergency, demo, and future sections while retaining clearly labeled demonstrations.
- Confirm no testimonial or review sections exist. Remove any found during implementation.
- Remove unused image and animation files/imports after confirming no remaining references.

## Branding and navigation

- Create a distinct lightweight mountain-and-signal SVG favicon in `public/`, wire it into the root metadata, and stop using the full logo as the favicon.
- Keep the uploaded logo in visible brand positions, but make its treatment rectangular rather than circular.
- Add Privacy Policy and Terms & Conditions links to the footer using real application routes.

## New legal pages

- Add `/privacy-policy` with clear sections covering location and account data, local/offline storage, cookies, Lovable Cloud services, AI requests, weather/map providers, retention, user choices, security, children, policy changes, and a visibly marked contact placeholder.
- Add `/terms-and-conditions` with acceptable use, account responsibilities, emergency limitations, no guarantee of trail/weather/location accuracy, third-party data, no warranty, liability limits, and a visibly marked contact placeholder.
- Add complete, unique route metadata, canonical URLs, and social tags for both pages, then include them in the sitemap.

## Verification

- Search the entire authored codebase again for em dashes, emoji, interactive `rounded-full`, `react-countup`, removed image references, fabricated reviews, and continuous animation loops.
- Validate homepage and both new legal pages in desktop and mobile preview, checking navigation, readable text, no overlap, favicon metadata, and console errors.

## Assumptions

- Circular status dots, radio indicators, and map markers may remain circular because they are symbols, not pill-shaped controls.
- The legal text will be a practical project template, not legal advice; the contact field remains explicitly marked as a placeholder because no real contact address was supplied.
- A real licensed mountain photograph should eventually replace the abstract hero treatment if photographic branding is desired.
