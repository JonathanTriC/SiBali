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
      location: 'Bali',
      category: 'Temple',
      rating: '4.8',
      distance: '12 km',
      image:
        'https://images.unsplash.com/photo-1583235891598-53ae16fab99d?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      name: 'Canggu Beach',
      location: 'Bali',
      category: 'Beach',
      rating: '4.2',
      distance: '8 km',
      image:
        'https://images.unsplash.com/photo-1666261012387-3b8d48975c08?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      name: 'Desa Potato Head Seminyak',
      location: 'Bali',
      category: 'Resort',
      rating: '4.5',
      distance: '20 km',
      image:
        'https://images.unsplash.com/photo-1663552059578-29c3e8662e3f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return { dummyPopularCategories, dummyRecommended, navigateScreen };
};

export default useHome;
