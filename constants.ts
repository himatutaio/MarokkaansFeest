import { Category, Provider } from './types';

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'Ziana Amira',
    category: Category.ZIANA,
    description: 'Exclusieve Marokkaanse bruidsstyling en visagie. Wij zorgen ervoor dat u straleert op uw grote dag met de nieuwste collectie jurken.',
    location: 'Amsterdam',
    priceStart: 1500,
    imageUrl: 'https://picsum.photos/seed/ziana1/400/300',
    rating: 4.8,
    phone: '06-12345678',
    email: 'info@zianaamira.nl'
  },
  {
    id: '2',
    name: 'Traiteur Maghreb Royal',
    category: Category.CATERING,
    description: 'Authentieke Marokkaanse keuken met een moderne twist. Van bastilla tot tajine, wij verzorgen het complete diner.',
    location: 'Rotterdam',
    priceStart: 2500,
    imageUrl: 'https://picsum.photos/seed/catering1/400/300',
    rating: 4.9,
    phone: '010-9876543',
    email: 'contact@maghrebroyal.nl'
  },
  {
    id: '3',
    name: 'DJ Yassin',
    category: Category.MUSIC,
    description: 'De beste Chaabi, Reggada en R&B mixen voor een onvergetelijk feest. Inclusief professionele lichtshow.',
    location: 'Utrecht',
    priceStart: 450,
    imageUrl: 'https://picsum.photos/seed/dj1/400/300',
    rating: 4.5,
    phone: '06-87654321',
    email: 'bookings@djyassin.nl'
  },
  {
    id: '4',
    name: 'Partycentrum Het Paleis',
    category: Category.VENUE,
    description: 'Luxe zaalverhuur met capaciteit tot 500 personen. Gescheiden zalen mogelijk.',
    location: 'Den Haag',
    priceStart: 2000,
    imageUrl: 'https://picsum.photos/seed/venue1/400/300',
    rating: 4.7
  },
  {
    id: '5',
    name: 'Fotografie Yasmina',
    category: Category.PHOTO,
    description: 'Wij leggen uw mooiste momenten vast. Gespecialiseerd in Marokkaanse bruiloften.',
    location: 'Eindhoven',
    priceStart: 800,
    imageUrl: 'https://picsum.photos/seed/photo1/400/300',
    rating: 4.6
  },
  {
    id: '6',
    name: 'Decoratie 1001 Nacht',
    category: Category.DECOR,
    description: 'Sfeervolle decoratie voor elke gelegenheid. Tafels, stoelen, ingang en podia.',
    location: 'Amsterdam',
    priceStart: 600,
    imageUrl: 'https://picsum.photos/seed/decor1/400/300',
    rating: 4.3
  },
    {
    id: '7',
    name: 'Dakka Fantasia',
    category: Category.MUSIC,
    description: 'Traditionele Dakka Marrakchia om de sfeer er goed in te brengen bij het ophalen van de bruid.',
    location: 'Breda',
    priceStart: 350,
    imageUrl: 'https://picsum.photos/seed/dakka/400/300',
    rating: 4.8,
    isOwner: true
  }
];

export const CATEGORIES = Object.values(Category);