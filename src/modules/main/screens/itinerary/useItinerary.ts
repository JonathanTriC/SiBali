import { useNavigate } from '@hooks';

const useItinerary = () => {
  const { navigateScreen } = useNavigate();

  const dummyItineraryList: ItineraryItem[] = [
    {
      id: 1,
      title: 'Bali Cultural Adventure',
      date: 'April 18, 2026',
      duration: '3 Days, 2 Nights',
      budget: 'Rp. 1.500.000',
      placesCount: 5,
      image:
        'https://images.unsplash.com/photo-1583235891598-53ae16fab99d?q=80&w=686&auto=format&fit=crop',
      days: [
        {
          day: 1,
          date: 'April 5, 2026',
          places: [
            {
              id: 1,
              name: 'Tanah Lot Temple',
              time: '09:00 AM',
              image:
                'https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=400&auto=format&fit=crop',
              destination: {
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
                  'Perfect for sunset photography and spiritual experiences. Best visited during low tide when you can walk closer to the temple.',
                about:
                  'Tanah Lot is a rock formation off the Indonesian island of Bali. It is home to the ancient Hindu pilgrimage temple Pura Tanah Lot, one of Bali\'s most iconic landmarks.',
                openHours: '06:00 - 18:00',
                phone: '+62 361 8800361',
                website: 'tanahlot.net',
                amenities: ['Parking', 'WiFi', 'Family-friendly', 'Guided Tours'],
              },
            },
            {
              id: 2,
              name: 'Seminyak Beach',
              time: '02:00 PM',
              image:
                'https://images.unsplash.com/photo-1666261012387-3b8d48975c08?q=80&w=400&auto=format&fit=crop',
              destination: {
                id: 5,
                name: 'Seminyak Beach',
                location: 'Seminyak, Bali',
                category: 'Beach',
                rating: '4.4',
                reviewsCount: '1500',
                distance: '10 km',
                image:
                  'https://images.unsplash.com/photo-1666261012387-3b8d48975c08?q=80&w=1740&auto=format&fit=crop',
                aiInsight:
                  'One of Bali\'s most popular beaches, known for its stunning sunsets and upscale beach clubs. Great for an afternoon stroll.',
                about:
                  'Seminyak Beach is a long stretch of golden sand lined with beach clubs, restaurants, and boutique shops. It\'s a favorite among tourists seeking a lively beach experience.',
                openHours: 'Open 24 hours',
                phone: '-',
                website: '-',
                amenities: ['Beach Clubs', 'Restaurants', 'Surfing', 'Parking'],
              },
            },
          ],
        },
        {
          day: 2,
          date: 'April 6, 2026',
          places: [
            {
              id: 1,
              name: 'Tegalalang Rice Terrace',
              time: '08:00 AM',
              image:
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&auto=format&fit=crop',
              destination: {
                id: 6,
                name: 'Tegalalang Rice Terrace',
                location: 'Tegalalang, Gianyar, Bali',
                category: 'Nature',
                rating: '4.6',
                reviewsCount: '3200',
                distance: '25 km',
                image:
                  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1740&auto=format&fit=crop',
                aiInsight:
                  'Best visited in the early morning for cooler temperatures and fewer crowds. The terraced rice paddies offer spectacular photo opportunities.',
                about:
                  'Tegalalang Rice Terrace is one of Bali\'s most famous landscapes, featuring stunning terraced rice paddies shaped by the traditional Balinese cooperative irrigation system known as Subak.',
                openHours: '08:00 - 18:00',
                phone: '-',
                website: '-',
                amenities: ['Guided Tours', 'Photo Spots', 'Cafes', 'Parking'],
              },
            },
            {
              id: 2,
              name: 'Ubud Monkey Forest',
              time: '01:00 PM',
              image:
                'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=400&auto=format&fit=crop',
              destination: {
                id: 7,
                name: 'Ubud Monkey Forest',
                location: 'Ubud, Gianyar, Bali',
                category: 'Nature',
                rating: '4.3',
                reviewsCount: '4100',
                distance: '22 km',
                image:
                  'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1740&auto=format&fit=crop',
                aiInsight:
                  'A unique sanctuary home to over 700 Balinese long-tailed monkeys. Keep your belongings secure and avoid direct eye contact with the monkeys.',
                about:
                  'The Sacred Monkey Forest Sanctuary is a nature reserve and Hindu temple complex in Ubud. It is home to three Hindu temples and a large population of Balinese long-tailed macaques.',
                openHours: '09:00 - 17:00',
                phone: '+62 361 971304',
                website: 'monkeyforestubud.com',
                amenities: ['Guided Tours', 'Parking', 'Restrooms', 'Souvenir Shops'],
              },
            },
          ],
        },
        {
          day: 3,
          date: 'April 7, 2026',
          places: [
            {
              id: 1,
              name: 'Lempuyang Luhur Temple',
              time: '07:00 AM',
              image:
                'https://images.unsplash.com/photo-1583235891598-53ae16fab99d?q=80&w=400&auto=format&fit=crop',
              destination: {
                id: 1,
                name: 'Lempuyang Luhur Temple',
                location: 'Karangasem, Bali',
                category: 'Temple',
                rating: '4.8',
                reviewsCount: '2000',
                distance: '12 km',
                image:
                  'https://images.unsplash.com/photo-1583235891598-53ae16fab99d?q=80&w=686&auto=format&fit=crop',
                aiInsight:
                  'Famous for its "Gates of Heaven," this temple offers breathtaking views of Mount Agung. Best visited early morning to avoid crowds.',
                about:
                  'Lempuyang Luhur Temple is one of Bali\'s oldest and most revered temples, located high in the mountains of Karangasem.',
                openHours: '06:00 - 18:00',
                phone: '+62 363 4301870',
                website: 'lempuyangtemple.com',
                amenities: ['Parking', 'Guided Tours', 'Photo Spots', 'Stairs Access'],
              },
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'Beach & Relaxation',
      date: 'April 15, 2026',
      duration: '5 Days, 4 Nights',
      budget: 'Rp. 2.500.000',
      placesCount: 8,
      image:
        'https://images.unsplash.com/photo-1666261012387-3b8d48975c08?q=80&w=1740&auto=format&fit=crop',
      days: [
        {
          day: 1,
          date: 'April 15, 2026',
          places: [
            {
              id: 1,
              name: 'Canggu Beach',
              time: '09:00 AM',
              image:
                'https://images.unsplash.com/photo-1666261012387-3b8d48975c08?q=80&w=400&auto=format&fit=crop',
              destination: {
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
                  'Canggu Beach is known for its black sand coastline, surf-friendly waves, and vibrant atmosphere.',
                openHours: 'Open 24 hours',
                phone: '-',
                website: '-',
                amenities: ['Surfing', 'Beach Clubs', 'Cafes', 'Parking'],
              },
            },
            {
              id: 2,
              name: 'Desa Potato Head',
              time: '04:00 PM',
              image:
                'https://images.unsplash.com/photo-1663552059578-29c3e8662e3f?q=80&w=400&auto=format&fit=crop',
              destination: {
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
            },
          ],
        },
        {
          day: 2,
          date: 'April 16, 2026',
          places: [
            {
              id: 1,
              name: 'Nusa Dua Beach',
              time: '10:00 AM',
              image:
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&auto=format&fit=crop',
              destination: {
                id: 8,
                name: 'Nusa Dua Beach',
                location: 'Nusa Dua, Badung, Bali',
                category: 'Beach',
                rating: '4.7',
                reviewsCount: '2100',
                distance: '30 km',
                image:
                  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1740&auto=format&fit=crop',
                aiInsight:
                  'A pristine white-sand beach with calm, clear waters. Ideal for swimming and water sports. The area is home to several luxury resorts.',
                about:
                  'Nusa Dua is a resort area in the southern part of Bali, known for its beautiful beaches, luxury hotels, and calm waters perfect for water sports.',
                openHours: 'Open 24 hours',
                phone: '-',
                website: '-',
                amenities: ['Water Sports', 'Luxury Resorts', 'Restaurants', 'Parking'],
              },
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'Temple Hopping Tour',
      date: 'April 10, 2026',
      duration: '2 Days, 1 Night',
      budget: 'Rp. 800.000',
      placesCount: 4,
      image:
        'https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1740&auto=format&fit=crop',
      days: [
        {
          day: 1,
          date: 'April 10, 2026',
          places: [
            {
              id: 1,
              name: 'Tanah Lot Temple',
              time: '08:00 AM',
              image:
                'https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=400&auto=format&fit=crop',
              destination: {
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
                  'Perfect for sunset photography and spiritual experiences. Best visited during low tide when you can walk closer to the temple.',
                about:
                  'Tanah Lot is a rock formation off the Indonesian island of Bali. It is home to the ancient Hindu pilgrimage temple Pura Tanah Lot.',
                openHours: '06:00 - 18:00',
                phone: '+62 361 8800361',
                website: 'tanahlot.net',
                amenities: ['Parking', 'WiFi', 'Family-friendly', 'Guided Tours'],
              },
            },
            {
              id: 2,
              name: 'Uluwatu Temple',
              time: '02:00 PM',
              image:
                'https://images.unsplash.com/photo-1583235891598-53ae16fab99d?q=80&w=400&auto=format&fit=crop',
              destination: {
                id: 9,
                name: 'Uluwatu Temple',
                location: 'Pecatu, Badung, Bali',
                category: 'Temple',
                rating: '4.7',
                reviewsCount: '3500',
                distance: '28 km',
                image:
                  'https://images.unsplash.com/photo-1583235891598-53ae16fab99d?q=80&w=686&auto=format&fit=crop',
                aiInsight:
                  'Perched on a dramatic cliff 70 meters above the Indian Ocean. The Kecak fire dance performed at sunset here is unmissable.',
                about:
                  'Pura Luhur Uluwatu is a Balinese sea temple perched on the edge of a steep cliff. It is one of the six key temples believed to be Bali\'s spiritual pillars.',
                openHours: '09:00 - 19:00',
                phone: '+62 361 8480762',
                website: '-',
                amenities: ['Kecak Dance', 'Parking', 'Guided Tours', 'Photo Spots'],
              },
            },
          ],
        },
        {
          day: 2,
          date: 'April 11, 2026',
          places: [
            {
              id: 1,
              name: 'Besakih Temple',
              time: '09:00 AM',
              image:
                'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=400&auto=format&fit=crop',
              destination: {
                id: 10,
                name: 'Besakih Temple',
                location: 'Rendang, Karangasem, Bali',
                category: 'Temple',
                rating: '4.6',
                reviewsCount: '1800',
                distance: '60 km',
                image:
                  'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1740&auto=format&fit=crop',
                aiInsight:
                  'Known as the "Mother Temple" of Bali, this is the largest and holiest temple complex on the island. Hire a local guide for the best experience.',
                about:
                  'Pura Besakih is the most important, largest, and holiest temple of Hindu religion in Bali. It is located on the slopes of Mount Agung.',
                openHours: '08:00 - 17:00',
                phone: '-',
                website: '-',
                amenities: ['Guided Tours', 'Parking', 'Sarong Rental', 'Restrooms'],
              },
            },
            {
              id: 2,
              name: 'Lempuyang Luhur Temple',
              time: '01:00 PM',
              image:
                'https://images.unsplash.com/photo-1583235891598-53ae16fab99d?q=80&w=400&auto=format&fit=crop',
              destination: {
                id: 1,
                name: 'Lempuyang Luhur Temple',
                location: 'Karangasem, Bali',
                category: 'Temple',
                rating: '4.8',
                reviewsCount: '2000',
                distance: '12 km',
                image:
                  'https://images.unsplash.com/photo-1583235891598-53ae16fab99d?q=80&w=686&auto=format&fit=crop',
                aiInsight:
                  'Famous for its "Gates of Heaven," this temple offers breathtaking views of Mount Agung. Best visited early morning to avoid crowds.',
                about:
                  'Lempuyang Luhur Temple is one of Bali\'s oldest and most revered temples, located high in the mountains of Karangasem.',
                openHours: '06:00 - 18:00',
                phone: '+62 363 4301870',
                website: 'lempuyangtemple.com',
                amenities: ['Parking', 'Guided Tours', 'Photo Spots', 'Stairs Access'],
              },
            },
          ],
        },
      ],
    },
  ];

  const onNavigateDetail = (item: ItineraryItem) => {
    navigateScreen('Detail', {
      screen: 'ItineraryDetailScreen',
      params: { data: item },
    });
  };

  return {
    dummyItineraryList,
    onNavigateDetail,
  };
};

export default useItinerary;
