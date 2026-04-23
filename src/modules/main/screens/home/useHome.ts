import { useNavigate } from '@hooks';

const useHome = () => {
  const { navigateScreen } = useNavigate();

  const dummyPopularCategories = [
    {
      id: 1,
      icon: 'beach',
      name: 'Beach',
    },
    {
      id: 2,
      icon: 'temple-buddhist',
      name: 'Temples',
    },
    {
      id: 3,
      icon: 'food',
      name: 'Culinary',
    },
    {
      id: 4,
      icon: 'shopping',
      name: 'Shopping',
    },
    {
      id: 5,
      icon: 'diving-snorkel',
      name: 'Diving',
    },
  ];

  const dummyRecommended = [
    {
      id: 1,
      name: 'Lempuyan Luhur Temple',
      location: 'Karangasem, Bali',
      category: 'Temple',
      rating: '4.8',
      reviewsCount: '2000',
      distance: '12 km',
      image:
        'https://images.unsplash.com/photo-1583235891598-53ae16fab99d?q=80&w=686&auto=format&fit=crop',

      aiInsight:
        'Famous for its “Gates of Heaven,” this temple offers breathtaking views of Mount Agung. Best visited early morning to avoid crowds and capture clear photos.',
      about:
        'Lempuyang Luhur Temple is one of Bali’s oldest and most revered temples, located high in the mountains of Karangasem. It is part of the Sad Kahyangan Jagad, the six holiest places of worship in Bali.',
      openHours: '06:00 - 18:00',
      phone: '+62 363 4301870',
      website: 'lempuyangtemple.com',
      amenities: ['Parking', 'Guided Tours', 'Photo Spots', 'Stairs Access'],
    },
    {
      id: 2,
      name: 'Canggu Beach',
      location: 'Canggu, Bali',
      category: 'Beach',
      rating: '4.2',
      reviewsCount: '1000',
      distance: '8 km',
      image:
        'https://images.unsplash.com/photo-1666261012387-3b8d48975c08?q=80&w=1740&auto=format&fit=crop',

      aiInsight:
        'Perfect spot for surfing and sunset views. The area is popular among digital nomads with plenty of cafes and beach clubs nearby.',
      about:
        'Canggu Beach is known for its black sand coastline, surf-friendly waves, and vibrant atmosphere. It’s a hotspot for travelers looking for a mix of relaxation and nightlife.',
      openHours: 'Open 24 hours',
      phone: '-',
      website: '-',
      amenities: ['Surfing', 'Beach Clubs', 'Cafes', 'Parking'],
    },
    {
      id: 3,
      name: 'Desa Potato Head Seminyak',
      location: 'Seminyak, Bali',
      category: 'Resort',
      rating: '4.5',
      reviewsCount: '3000',
      distance: '20 km',
      image:
        'https://images.unsplash.com/photo-1663552059578-29c3e8662e3f?q=80&w=687&auto=format&fit=crop',

      aiInsight:
        'A lifestyle destination combining beach club, hotel, and cultural space. Great for sunset, music events, and unique architecture.',
      about:
        'Desa Potato Head is a creative village in Seminyak offering a mix of hospitality, entertainment, and sustainability-driven experiences.',
      openHours: '10:00 - 22:00',
      phone: '+62 361 4737979',
      website: 'potatohead.co',
      amenities: ['Pool', 'Beachfront', 'Restaurant', 'Events'],
    },
    {
      id: 4,
      name: 'Tanah Lot Temple',
      location: 'Beraban, Tabanan Regency, Bali',
      category: 'Temple',
      rating: '4.8',
      reviewsCount: '2847',
      distance: '15 km',
      image:
        'https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1740&auto=format&fit=crop',

      aiInsight:
        'Perfect for sunset photography and spiritual experiences. Best visited during low tide when you can walk closer to the temple. The surrounding area offers traditional markets and cultural performances.',
      about:
        'Tanah Lot is a rock formation off the Indonesian island of Bali. It is home to the ancient Hindu pilgrimage temple Pura Tanah Lot, one of Bali’s most iconic landmarks.',
      openHours: '06:00 - 18:00',
      phone: '+62 361 8800361',
      website: 'tanahlot.net',
      amenities: ['Parking', 'WiFi', 'Family-friendly', 'Guided Tours'],
    },
  ];

  const onNavigateDetail = ({ item }: { item: DestinationItem }) => {
    return navigateScreen('Detail', {
      screen: 'DestinationDetailScreen',
      params: { data: item },
    });
  };

  return {
    dummyPopularCategories,
    dummyRecommended,
    navigateScreen,
    onNavigateDetail,
  };
};

export default useHome;
