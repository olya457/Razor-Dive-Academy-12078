export type LearningResource = {
  id: string;
  title: string;
  publisher: string;
  kind: 'Article' | 'Video';
  topic: 'Getting started' | 'Safety' | 'Marine life';
  description: string;
  url: string;
  image: number;
};
export const resources: LearningResource[] = [
  {
    id: 'first-steps',
    title: 'How to Scuba Dive: A Guide for Beginners',
    publisher: 'PADI',
    kind: 'Article',
    topic: 'Getting started',
    description:
      'Explore the path from your first supervised experience to scuba certification.',
    url: 'https://www.padi.com/us/en/blog/how-to-scuba-dive',
    image: require('../assets/FirstDive.png'),
  },
  {
    id: 'golden-rules',
    title: 'The Golden Rules of Scuba Diving',
    publisher: 'PADI',
    kind: 'Article',
    topic: 'Safety',
    description:
      'A refresher on preparation, buddy awareness and responsible diving habits.',
    url: 'https://www.padi.com/us/en/blog/the-golden-rules-of-scuba-diving',
    image: require('../assets/ScubaFoundations.png'),
  },
  {
    id: 'return-guide',
    title: 'Return to Diving Safely',
    publisher: 'Divers Alert Network',
    kind: 'Article',
    topic: 'Getting started',
    description:
      'Review equipment, skills and trip preparation before returning to the water.',
    url: 'https://dan.org/safety-prevention/return-to-diving-safely/',
    image: require('../assets/ReefExplorer.png'),
  },
  {
    id: 'return-video',
    title: 'Watch: Return to Diving Safely',
    publisher: 'Divers Alert Network',
    kind: 'Video',
    topic: 'Getting started',
    description:
      'DAN’s English-language video about preparing to dive again after a break.',
    url: 'https://www.youtube.com/watch?v=0kCRZyUwe3A',
    image: require('../assets/BuoyancyControl.png'),
  },
  {
    id: 'buddy-video',
    title: 'How to Perform a Pre-Dive Safety Check',
    publisher: 'PADI',
    kind: 'Video',
    topic: 'Safety',
    description:
      'Watch an English-language demonstration of the pre-dive buddy check.',
    url: 'https://www.youtube.com/watch?v=NZq83SGi8Oc',
    image: require('../assets/UnderwaterNavigation.png'),
  },
  {
    id: 'safe-practices',
    title: 'Safe Diving Practices',
    publisher: 'DAN World',
    kind: 'Article',
    topic: 'Safety',
    description:
      'Browse reminders about planning, equipment checks and communication.',
    url: 'https://world.dan.org/safety-prevention/diver-safety/safe-diving-practices/',
    image: require('../assets/RescueSkillsWorkshop.png'),
  },
  {
    id: 'ocean-impact',
    title: 'Leave Only Bubbles',
    publisher: 'PADI',
    kind: 'Article',
    topic: 'Marine life',
    description:
      'Discover ways to reduce your impact on the underwater environment.',
    url: 'https://www.padi.com/th/en/blog/minimize-impact-underwater-as-a-scuba-diver',
    image: require('../assets/TurtleReef.png'),
  },
];
