import { useNavigate } from '@hooks';
import { useCallback, useState } from 'react';

const useInterests = () => {
  const { popScreen, resetNavigate } = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isMinSelected = selectedIds.length >= 3;

  const toggleInterest = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const listInterests = [
    { id: '1', icon: 'surfing', name: 'Surfing' },
    { id: '2', icon: 'temple-buddhist', name: 'Temples' },
    { id: '3', icon: 'yoga', name: 'Yoga &\nWellness' },
    { id: '4', icon: 'music', name: 'Nightlife' },
    { id: '5', icon: 'food', name: 'Foodie Spots' },
    { id: '6', icon: 'hiking', name: 'Hiking' },
    { id: '7', icon: 'beach', name: 'Beach' },
    { id: '8', icon: 'diving-snorkel', name: 'Diving' },
    { id: '9', icon: 'shopping', name: 'Shopping' },
    { id: '10', icon: 'star', name: 'Equestrian' },
    { id: '11', icon: 'ferry', name: 'Jet Skiing' },
    { id: '12', icon: 'fish', name: 'Fishing' },
  ];

  const handleNavigateHome = useCallback(() => {
    resetNavigate('Main', { screen: 'HomeScreen' });
  }, [resetNavigate]);

  return {
    listInterests,
    selectedIds,
    isMinSelected,
    toggleInterest,
    popScreen,
    handleNavigateHome,
  };
};

export default useInterests;
