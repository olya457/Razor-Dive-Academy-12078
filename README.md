# Razor Dive Academy

React Native + TypeScript mobile app with React Navigation, AsyncStorage, local artwork, gradient buttons and a four-second WebView splash animation.

## Run

```sh
npm install
npm start
```

In another terminal:

```sh
npm run ios
npm run android
```

For iOS, install CocoaPods dependencies first from `ios` using `pod install`. Ruby, CocoaPods and Node must be available on PATH. Android requires JDK 17 and Android SDK 36.

## Structure

- `src/assets`: supplied local images; no remote image requests.
- `src/data`: 12 locations, 8 courses, 4 equipment sets, 8 creatures and 20 rules.
- `src/components`: shared controls, pricing, date selection and booking cards.
- `src/screens`: onboarding, splash, catalogues, details, booking, rental, calculator and rules.
- `src/navigation`: six bottom tabs with typed native stacks.
- `src/store`: serialized AsyncStorage writes and persisted user state.
- `src/utils`: pricing, schedules and conflict validation.

## Behavior

The first launch shows onboarding after the splash. Completing or skipping onboarding is remembered. Bookings, equipment assignments, calculator selections and quiz answers are saved locally. There are no pre-filled user bookings or quiz answers.

A trip supports 1–8 participants and 1–3 dives. Transfer costs €15 per person per trip, a dedicated instructor costs €40 per group per dive, and rental charges use the selected number of sets. Multiple dives are scheduled three hours apart; daytime departures that finish the schedule after the local operating window are disabled. Night training uses evening slots. Dates are selectable up to one year ahead. Existing local reservations block overlapping schedules.

Bookings are local reservations only. No club API, live inventory, payment service or server confirmation was supplied. The booking screen explains that actual location, equipment and instructor availability requires club confirmation. Static prices and educational content come from the supplied specification.

## Checks

```sh
npx tsc --noEmit
npm run lint -- --quiet
npm test -- --runInBand
```

## Learning and adaptive layouts

Open **Training → Explore the Learning Library**, or use the link in **Rules**. Seven English resources from PADI and DAN include two videos. Search, filter by type, and save resources for later. Saved links survive app restarts; external articles and videos require internet access.

Layouts follow the measured window and available content width, including fold/unfold resizing, rotation and safe areas. Catalogues use one to three columns, the creature grid supports up to four, and windows at least 600 pt wide use a left navigation rail when wider than tall; windows from 900 pt also use the rail in portrait. The compact rail scrolls on short screens, and larger windows add text labels. Forms remain comfortably readable, the equipment carousel measures its actual container, and onboarding switches to two columns when space allows. Larger accessibility text reduces column counts. Resizing does not remount navigation or reset booking form state.

Native Animated transitions, rising bubbles and button press feedback respect Reduce Motion. Background effects stop when the screen is unfocused or the app is inactive. No extra animation dependency is installed.
