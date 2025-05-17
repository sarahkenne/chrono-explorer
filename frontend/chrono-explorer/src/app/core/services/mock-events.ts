export const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Prise de la Bastille',
    description: 'Événement marquant le début de la Révolution française.',
    location: 'Paris, France',
    startDate: '1789-07-14',
    endDate: '1789-07-14',
    detailedContent: 'Le 14 juillet 1789, des Parisiens prennent d\'assaut la prison de la Bastille...',
    theme: 'Révolution',
    category: 'Soulèvement',
    imageUrl: 'assets/bastille.jpg',
    civilization: 'Française',
    archives: [
      { type: 'image', url: 'assets/archives/bastille1.jpg', description: 'Peinture de la prise de la Bastille' },
      { type: 'video', url: 'assets/archives/bastille2.mp4', description: 'Reconstitution historique' }
    ]
  },
  {
    id: 2,
    title: 'Découverte de l\'Amérique',
    description: 'Arrivée de Christophe Colomb sur le continent américain.',
    location: 'San Salvador, Bahamas',
    startDate: '1492-10-12',
    endDate: '1492-10-12',
    detailedContent: 'Christophe Colomb atteint les côtes des Caraïbes, ouvrant une ère d\'exploration et de colonisation...',
    theme: 'Exploration',
    category: 'Découverte',
    imageUrl: 'assets/colomb.jpg',
    civilization: 'Espagnole',
    archives: [
      { type: 'image', url: 'assets/archives/colomb1.jpg', description: 'Carte de l\'expédition' },
      { type: 'audio', url: 'assets/archives/colomb2.mp3', description: 'Lecture du journal de bord' }
    ]
  },
  {
    id: 3,
    title: 'Invention de l\'imprimerie',
    description: 'Johannes Gutenberg invente l\'imprimerie à caractères mobiles.',
    location: 'Mayence, Allemagne',
    startDate: '1440-01-01',
    endDate: '1440-01-01',
    detailedContent: 'Cette invention révolutionne la diffusion des savoirs en permettant la production en masse de livres...',
    theme: 'Invention',
    category: 'Technologie',
    imageUrl: 'assets/gutenberg.jpg',
    civilization: 'Allemande',
    archives: [
      { type: 'image', url: 'assets/archives/gutenberg1.jpg', description: 'Portrait de Gutenberg' },
      { type: 'document', url: 'assets/archives/gutenberg2.pdf', description: 'Manuscrit de l\'imprimerie' }
    ]
  },
  {
    id: 4,
    title: 'Bataille de Waterloo',
    description: 'Défaite de Napoléon face aux forces alliées.',
    location: 'Waterloo, Belgique',
    startDate: '1815-06-18',
    endDate: '1815-06-18',
    detailedContent: 'La bataille marque la fin définitive du pouvoir de Napoléon Bonaparte en Europe...',
    theme: 'Guerre',
    category: 'Bataille',
    imageUrl: 'assets/waterloo.jpg',
    civilization: 'Française',
    archives: [
      { type: 'image', url: 'assets/archives/waterloo1.jpg', description: 'Carte de la bataille' },
      { type: 'video', url: 'assets/archives/waterloo2.mp4', description: 'Documentaire sur Waterloo' }
    ]
  },
  {
    id: 5,
    title: 'Première mission spatiale habitée',
    description: 'Lancement de Youri Gagarine, premier homme dans l\'espace.',
    location: 'Baïkonour, URSS',
    startDate: '1961-04-12',
    endDate: '1961-04-12',
    detailedContent: 'Youri Gagarine effectue un vol orbital historique à bord du Vostok 1...',
    theme: 'Exploration spatiale',
    category: 'Mission',
    imageUrl: 'assets/gagarine.jpg',
    civilization: 'Soviétique',
    archives: [
      { type: 'video', url: 'assets/archives/gagarine1.mp4', description: 'Vol de Gagarine' },
      { type: 'audio', url: 'assets/archives/gagarine2.mp3', description: 'Discours de Gagarine' }
    ]
  },
  {
    id: 6,
    title: 'Révolution industrielle',
    description: 'Période majeure de transformation économique et sociale en Europe.',
    location: 'Royaume-Uni',
    startDate: '1760-01-01',
    endDate: '1840-01-01',
    detailedContent: 'L\'industrialisation modifie profondément les modes de production et de vie...',
    theme: 'Économie',
    category: 'Révolution',
    imageUrl: 'assets/industrielle.jpg',
    civilization: 'Européenne',
    archives: [
      { type: 'image', url: 'assets/archives/industrielle1.jpg', description: 'Usine textile' },
      { type: 'document', url: 'assets/archives/industrielle2.pdf', description: 'Rapport industriel' }
    ]
  },
  {
    id: 7,
    title: 'Construction des pyramides de Gizeh',
    description: 'Construction des célèbres pyramides en Égypte ancienne.',
    location: 'Gizeh, Égypte',
    startDate: '-2580-01-01',
    endDate: '-2560-01-01',
    detailedContent: 'Les pyramides sont des tombeaux monumentaux destinés aux pharaons Khéops, Khéphren et Mykérinos...',
    theme: 'Architecture',
    category: 'Monument',
    imageUrl: 'assets/pyramides.jpg',
    civilization: 'Égyptienne',
    archives: [
      { type: 'image', url: 'assets/archives/pyramides1.jpg', description: 'Pyramide de Khéops' },
      { type: 'document', url: 'assets/archives/pyramides2.pdf', description: 'Plan architectural' }
    ]
  },
  {
    id: 8,
    title: 'Indépendance de l\'Inde',
    description: 'L\'Inde devient indépendante du Royaume-Uni.',
    location: 'New Delhi, Inde',
    startDate: '1947-08-15',
    endDate: '1947-08-15',
    detailedContent: 'Après une longue lutte menée notamment par Gandhi, l\'Inde obtient son indépendance...',
    theme: 'Politique',
    category: 'Indépendance',
    imageUrl: 'assets/inde.jpg',
    civilization: 'Indienne',
    archives: [
      { type: 'image', url: 'assets/archives/inde1.jpg', description: 'Manifestation pour l\'indépendance' },
      { type: 'audio', url: 'assets/archives/inde2.mp3', description: 'Discours de Gandhi' }
    ]
  }
];
