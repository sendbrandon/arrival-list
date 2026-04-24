# Design System — The Arrival List

## Creative thesis

Brutalist outside. Ornate inside.

The surface should feel restrained, cinematic, and premium. The emotional details should feel warm, intimate, and handcrafted.

## Public visual direction

- Monochrome foundation
- Bone/cream text on ash black
- Concrete and paper texture
- Sparse composition
- Large uppercase typography
- Subtle film grain
- One rich accent color
- Gentle ceremonial language

## Palette

Use CSS variables:

```css
--ash: #090909;
--charcoal: #151515;
--stone: #2a2926;
--bone: #f3eee3;
--cream: #d8ccb8;
--muted: #928a7c;
--gold: #c9a45c;
--oxblood: #4d1118;
```

## Type direction

Suggested pairings:

- Display: large uppercase sans-serif, tight tracking
- Body: readable sans-serif
- Accent: editorial serif or italic only if available

System fallback:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

## Layout rules

- Use large negative space.
- Keep CTAs obvious.
- Do not clutter the hero.
- Use centered blocks for ritual/announcement moments.
- Use grid only when it helps scanning.
- Mobile must feel intentional, not compressed.

## Components

### Hero

- Huge title
- Minimal date/context
- One sentence emotional promise
- Primary/secondary CTA

### Signup card

- Dark panel
- Thin border
- Cream labels
- Large inputs
- Clear consent copy

### Registry card

- Category label
- Item title
- Price/sale price
- Retailer
- Why it matters
- Link CTA

### Reminder block

Use “drop” language carefully:

- Drop 01 — Save the date
- Drop 02 — Registry guide
- Drop 03 — Final details
- Drop 04 — Thank you / baby update

## Motion

- Slow fade in
- Small translate up
- No bouncing
- No cartoon effects
- Respect `prefers-reduced-motion`

## Accessibility

- Maintain contrast.
- Use visible focus states.
- Avoid all-uppercase for long paragraphs.
- Make buttons large enough on mobile.
- Keep form labels explicit.

## Important brand/IP rule

The inspiration may be Ye/Yeezy/Donda/Bully/Poor Things internally, but public copy/code/assets should not use protected imagery, logos, album art, celebrity name, or direct imitation. Make the final product original.
