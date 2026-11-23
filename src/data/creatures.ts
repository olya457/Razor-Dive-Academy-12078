import { Creature } from '../types';

export const creatures: Creature[] = [
  {
    id: 'lionfish',
    name: 'Lionfish',
    description: [
      'Lionfish are recognisable by their striped bodies, spreading fins and long dorsal spines. Their elegant appearance can make them especially tempting photography subjects. However, several of their fin spines can deliver venom through a puncture wound.',
      'Observe lionfish without touching them or moving into contact with their fins. A disturbed fish may hold its position and direct its dorsal spines toward an approaching diver. Give it space and avoid reaching into the shelter where it is resting.',
    ],
    danger: 4,
    summary: 'Venomous fin spines',
    quiz: [
      {
        statement: 'A lionfish can deliver venom through its fin spines.',
        answer: true,
        explanation: 'Contact with venomous spines can cause a painful injury.',
      },
      {
        statement: 'A lionfish that stays still is safe to touch.',
        answer: false,
        explanation:
          'Remaining still does not remove the danger from its spines.',
      },
    ],
    image: require('../assets/Lionfish.png'),
  },
  {
    id: 'reefstonefish',
    name: 'Reef Stonefish',
    description: [
      'Reef stonefish have irregular bodies that can blend closely with surrounding rocks and reef surfaces. Their camouflage makes them difficult to distinguish from the seabed. Strong dorsal spines can inject highly dangerous venom when pressure is applied.',
      'Avoid placing your hands or knees on surfaces you have not clearly identified. Never pick up or attempt to reposition a stonefish for a photograph. Observe from a distance and draw your instructor’s attention to the animal without approaching it.',
    ],
    danger: 5,
    summary: 'Camouflaged venomous spines',
    quiz: [
      {
        statement:
          'A reef stonefish can look like part of the surrounding seabed.',
        answer: true,
        explanation: 'Its camouflage can make it difficult to notice.',
      },
      {
        statement: 'Pressing against a stonefish’s dorsal spines is harmless.',
        answer: false,
        explanation: 'Pressure on the spines can cause venom injection.',
      },
    ],
    image: require('../assets/ReefStonefish.png'),
  },
  {
    id: 'scorpionfish',
    name: 'Scorpionfish',
    description: [
      'Scorpionfish often have mottled colours and textured bodies that help them blend into their surroundings. Their outlines can be difficult to recognise against rocks and marine growth. Venomous dorsal spines can cause painful injuries through accidental contact.',
      'Look carefully before bringing your hands or equipment close to the seabed. Do not touch a resting fish or assume that camouflage means it is harmless. Leave space around the animal and photograph it without disturbing its position.',
    ],
    danger: 4,
    summary: 'Concealed venomous spines',
    quiz: [
      {
        statement:
          'Scorpionfish can be difficult to distinguish from nearby rocks.',
        answer: true,
        explanation: 'Their colours and textured bodies provide camouflage.',
      },
      {
        statement:
          'Touching the dorsal spines is a safe way to identify a scorpionfish.',
        answer: false,
        explanation: 'Those spines can deliver venom and cause injury.',
      },
    ],
    image: require('../assets/Scorpionfish.png'),
  },
  {
    id: 'morayeel',
    name: 'Moray Eel',
    description: [
      'Moray eels have elongated bodies and often shelter inside rocky crevices. You may see only the head extending from an opening. Repeatedly opening and closing the mouth helps move water over the gills and does not automatically signal aggression.',
      'Keep your hands outside holes and avoid reaching toward an eel’s head. Never feed, touch or attempt to pull a moray from its shelter. Observe its natural behaviour while leaving the animal and its hiding place undisturbed.',
    ],
    danger: 3,
    summary: 'Powerful bite if disturbed',
    quiz: [
      {
        statement:
          'A moray opening and closing its mouth may simply be breathing.',
        answer: true,
        explanation: 'This movement helps pass water over its gills.',
      },
      {
        statement: 'Hand-feeding is a suitable way to interact with a moray.',
        answer: false,
        explanation: 'Keep hands away from its mouth and do not feed wildlife.',
      },
    ],
    image: require('../assets/MorayEel.png'),
  },
  {
    id: 'titantriggerfish',
    name: 'Titan Triggerfish',
    description: [
      'Titan triggerfish have robust bodies, strong jaws and distinctive markings around the eyes. They are reef fish that feed on animals including sea urchins, crustaceans and molluscs. Individuals guarding a nest can become defensive toward approaching divers.',
      'Give a nesting fish plenty of space and avoid moving closer for a photograph. If its behaviour becomes defensive, stop approaching and follow your instructor’s directions away from the area. Do not chase, feed or deliberately provoke the fish.',
    ],
    danger: 3,
    summary: 'Defensive behaviour near nests',
    quiz: [
      {
        statement: 'A titan triggerfish may defend the area around its nest.',
        answer: true,
        explanation: 'Nest guarding can lead to defensive behaviour.',
      },
      {
        statement:
          'Moving closer to a defensive triggerfish is a good way to calm it.',
        answer: false,
        explanation: 'Give it space rather than continuing your approach.',
      },
    ],
    image: require('../assets/TitanTriggerfish.png'),
  },
  {
    id: 'longspinedseaurchin',
    name: 'Long-Spined Sea Urchin',
    description: [
      'Long-spined sea urchins have rounded bodies surrounded by slender projecting spines. They can occur among reef structures and rocky surfaces. Their spines extend well beyond the body, so contact can happen before a diver reaches the central shell.',
      'Keep hands, knees and equipment clear of the entire animal. Sharp spines can puncture skin and may break during contact. Observe without touching and leave enough room for your movements around the reef.',
    ],
    danger: 3,
    summary: 'Sharp, fragile spines',
    quiz: [
      {
        statement:
          'A sea urchin’s spines can extend far beyond its central body.',
        answer: true,
        explanation:
          'Allow space around the whole animal, including its spines.',
      },
      {
        statement: 'Sea urchin spines are a suitable handhold for balancing.',
        answer: false,
        explanation:
          'Contact can cause puncture injuries and damage the animal.',
      },
    ],
    image: require('../assets/LongSpinedSeaUrchin.png'),
  },
  {
    id: 'stingray',
    name: 'Stingray',
    description: [
      'Stingrays have flattened bodies and are often seen resting on sandy bottoms. Some can cover themselves with sand, making their outlines less obvious. A defensive movement of the tail can cause a serious injury from its spine.',
      'Observe rays without touching, chasing or crowding them. Leave a clear route for the animal to move away. Pay attention to sandy resting areas and follow your guide’s instructions when entering or leaving the water.',
    ],
    danger: 4,
    summary: 'Defensive tail spine',
    quiz: [
      {
        statement: 'Some stingrays can rest partly hidden beneath sand.',
        answer: true,
        explanation:
          'A resting ray may be difficult to distinguish from the seabed.',
      },
      {
        statement: 'A stingray’s tail is safe to hold while it rests.',
        answer: false,
        explanation: 'Handling the tail risks injury and disturbs the animal.',
      },
    ],
    image: require('../assets/Stingray.png'),
  },
  {
    id: 'blueringedoctopus',
    name: 'Blue-Ringed Octopus',
    description: [
      'Blue-ringed octopuses are small animals whose vivid blue markings become especially noticeable when threatened. They can shelter in crevices, shells and other small spaces. Their venomous bite can cause life-threatening paralysis, including loss of breathing.',
      'Never handle the animal or pick up objects that could conceal one. Do not provoke it to make the blue rings appear for a photograph. Observe from a distance and alert your instructor if you notice one nearby.',
    ],
    danger: 5,
    summary: 'Highly dangerous venomous bite',
    quiz: [
      {
        statement:
          'A blue-ringed octopus can be dangerous despite its small size.',
        answer: true,
        explanation:
          'Its bite can deliver venom with life-threatening effects.',
      },
      {
        statement: 'Faint blue markings mean the octopus is safe to handle.',
        answer: false,
        explanation:
          'The visibility of its markings does not make handling safe.',
      },
    ],
    image: require('../assets/BlueRingedOctopus.png'),
  },
];
