import { Equipment } from '../types';
const included =
  'Mask, adjustable fins, wetsuit, dive computer, pressure gauge';
export const equipment: Equipment[] = [
  {
    id: 'reef',
    name: 'Reef Explorer',
    price: 25,
    image: require('../assets/ReefExplorer.png'),
    summary:
      'A practical equipment set for guided reef dives and training sessions.',
    specs: [
      ['BCD', 'Jacket-style, adjustable fit'],
      ['Regulator', 'Primary regulator and alternate air source'],
      ['Cylinder', '12 L aluminium'],
      ['Included', included],
      ['Sizes', 'Selected during fitting'],
    ],
    description:
      'Reef Explorer combines a jacket-style buoyancy compensator with a complete recreational scuba setup. Its adjustable fit allows the club team to prepare the equipment for your size before the dive. The set includes a mask, fins, wetsuit and instruments for use during your booked session. It is a practical option for guided reef outings and supervised training.',
  },
  {
    id: 'comfort',
    name: 'Ocean Comfort',
    price: 35,
    image: require('../assets/OceanComfort.png'),
    summary:
      'A comfort-focused setup with padded support and flexible fit adjustments.',
    specs: [
      ['BCD', 'Jacket-style with padded back support'],
      ['Regulator', 'Primary regulator and alternate air source'],
      ['Cylinder', '12 L aluminium'],
      ['Included', included],
      ['Sizes', 'Selected during fitting'],
    ],
    description:
      'Ocean Comfort features a padded buoyancy compensator with multiple fit adjustments. The configuration prioritises comfortable contact points around the shoulders and back. A complete selection of personal equipment and essential instruments is included in the rental. The club team checks the fit with you before preparing the set for your booking.',
  },
  {
    id: 'travel',
    name: 'Travel Light',
    price: 30,
    image: require('../assets/TravelLight.png'),
    summary:
      'A compact equipment set designed for convenient handling during club outings.',
    specs: [
      ['BCD', 'Lightweight travel-style'],
      ['Regulator', 'Compact primary regulator and alternate air source'],
      ['Cylinder', '10 L aluminium'],
      [
        'Included',
        'Mask, lightweight fins, wetsuit, dive computer, pressure gauge',
      ],
      ['Sizes', 'Selected during fitting'],
    ],
    description:
      'Travel Light pairs a compact buoyancy compensator with lightweight personal equipment. Its streamlined components make the set convenient to organise during transfers and equipment preparation. The rental includes a smaller cylinder, subject to the instructor confirming its suitability for the planned dive and your requirements. Mask, fins, wetsuit and essential instruments complete the package.',
  },
  {
    id: 'photo',
    name: 'Photo Balance',
    price: 40,
    image: require('../assets/PhotoBalance.png'),
    summary:
      'A photography-focused configuration with space to organise compatible camera accessories.',
    specs: [
      ['BCD', 'Back-inflate with accessory attachment points'],
      ['Regulator', 'Primary regulator and alternate air source'],
      ['Cylinder', '12 L aluminium'],
      ['Included', included],
      ['Camera', 'Not included'],
      ['Sizes', 'Selected during fitting'],
    ],
    description:
      'Photo Balance features a back-inflate buoyancy compensator with attachment points for compatible accessories. Its configuration provides space around the front of the torso when handling an underwater camera. The set includes standard diving equipment and instruments, while camera equipment is rented or supplied separately. Your instructor will confirm familiarity with the configuration and help arrange accessories before the dive.',
  },
];
