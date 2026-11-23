import { Course } from '../types';

export const courses: Course[] = [
  {
    id: 'firstdive',
    name: 'First Dive',
    description: [
      'First Dive introduces you to scuba diving through a structured session with an instructor. You will become familiar with the equipment, basic hand signals and the sequence of preparing for a dive. The experience begins in a controlled shallow-water setting where you can ask questions and build confidence.',
      'During the underwater session, you will practise breathing comfortably through a regulator and moving with your equipment. Your instructor will guide the activities and help you adjust to the unfamiliar sensations. The focus is on a calm introduction rather than covering distance or reaching depth.',
    ],
    level: 'Beginner',
    price: 75,
    summary:
      'Discover scuba equipment and experience your first guided underwater session.',
    image: require('../assets/FirstDive.png'),
  },
  {
    id: 'scubafoundations',
    name: 'Scuba Foundations',
    description: [
      'Scuba Foundations develops your understanding of the equipment and routines used during a dive. The session covers the purpose of the main components, preparation checks and communication with your instructor. Demonstrations are followed by supervised practice in a controlled environment.',
      'You will work through introductory exercises involving your mask, regulator and body position. Each activity is introduced gradually, with time to repeat it and receive feedback. The session helps establish a more organised and confident approach to further training.',
    ],
    level: 'Beginner',
    price: 95,
    summary:
      'Build essential scuba skills through guided equipment practice and underwater exercises.',
    image: require('../assets/ScubaFoundations.png'),
  },
  {
    id: 'buoyancycontrol',
    name: 'Buoyancy Control',
    description: [
      'Buoyancy Control focuses on maintaining a stable position while moving through the water. Your instructor will observe your weighting, body alignment and use of the buoyancy compensator. Guided exercises help you understand how small adjustments affect your position.',
      'You will practise hovering, controlled movement and navigating around suspended training markers. The aim is to reduce unnecessary effort and avoid contact with the seabed. Individual feedback helps you identify habits to work on during future dives.',
    ],
    level: 'Intermediate',
    price: 85,
    summary:
      'Improve your balance, trim and movement with focused buoyancy exercises.',
    image: require('../assets/BuoyancyControl.png'),
  },
  {
    id: 'underwaternavigation',
    name: 'Underwater Navigation',
    description: [
      'Underwater Navigation introduces practical ways to recognise your position and follow a planned route. You will explore how a compass, underwater landmarks and observations of the surroundings can work together. Your instructor will explain the exercises before you enter the water.',
      'During the session, you will follow simple routes and practise returning to designated points. Tasks include recognising landmarks, maintaining a heading and communicating direction with a buddy. A final review compares your planned route with your observations underwater.',
    ],
    level: 'Intermediate',
    price: 90,
    summary:
      'Practise compass use and natural navigation during a structured underwater route.',
    image: require('../assets/UnderwaterNavigation.png'),
  },
  {
    id: 'reefdivingskills',
    name: 'Reef Diving Skills',
    description: [
      'Reef Diving Skills focuses on moving around reef environments with awareness and control. The session introduces techniques for observing marine life while maintaining distance from sensitive surfaces. Your instructor will explain how positioning and equipment awareness affect the surrounding habitat.',
      'You will practise controlled approaches to observation points without touching coral or disturbing wildlife. Exercises combine buoyancy, careful fin movement and communication with your buddy. The session finishes with feedback on your movement and interaction with the environment.',
    ],
    level: 'Intermediate',
    price: 95,
    summary:
      'Refine your movement and observation skills while exploring a reef responsibly.',
    image: require('../assets/ReefDivingSkills.png'),
  },
  {
    id: 'underwaterphotography',
    name: 'Underwater Photography',
    description: [
      'Underwater Photography introduces the visual challenges of taking photographs beneath the surface. You will explore framing, available light and the effect of camera angle on a composition. The instructor will also discuss handling a camera without losing awareness of your surroundings.',
      'Practical exercises focus on stationary subjects and simple scenes suited to your experience. You will work on maintaining position while composing images without disturbing marine life. After the dive, a short review highlights useful changes to framing and camera placement.',
    ],
    level: 'Intermediate',
    price: 110,
    summary:
      'Learn to frame underwater subjects while maintaining stable and considerate positioning.',
    image: require('../assets/UnderwaterPhotography.png'),
  },
  {
    id: 'nightdivingskills',
    name: 'Night Diving Skills',
    description: [
      'Night Diving Skills introduces the additional preparation and communication involved in diving after dark. Your instructor will explain the session plan, lighting equipment and agreed signals before entering the water. Participation depends on meeting the club’s experience and qualification requirements.',
      'The practical session focuses on controlled movement, orientation and maintaining contact with your buddy. You will observe how familiar underwater features appear within a torch beam. A guided debrief reviews your communication, awareness and response to the reduced visibility.',
    ],
    level: 'Advanced',
    price: 125,
    summary:
      'Develop torch communication and buddy awareness during an instructor-led night session.',
    image: require('../assets/NightDivingSkills.png'),
  },
  {
    id: 'rescueskillsworkshop',
    name: 'Rescue Skills Workshop',
    description: [
      'Rescue Skills Workshop develops awareness of diver difficulties through structured practice with an instructor. The session begins with a briefing on recognising problems, communicating clearly and coordinating assistance. Activities are selected according to participant qualifications and take place in a controlled setting.',
      'You will work through simulated situations that emphasise assessment, teamwork and following the instructor’s directions. Each scenario is followed by feedback and an opportunity to discuss your decisions. This workshop supports continued learning and does not replace a recognised rescue certification.',
    ],
    level: 'Advanced',
    price: 135,
    summary:
      'Practise diver assistance, clear communication and teamwork through supervised scenarios.',
    image: require('../assets/RescueSkillsWorkshop.png'),
  },
];
