import { useNavigate } from '@hooks';
import { useState } from 'react';

const useDestinationDetail = () => {
  const { getRouteParams, navigation } = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'photos'>(
    'overview',
  );
  const { data } = getRouteParams<DestinationDetailScreenProps>();

  const TABS = [
    { index: 1, key: 'overview', label: 'Overview' },
    { index: 2, key: 'reviews', label: 'Reviews' },
    { index: 3, key: 'photos', label: 'Photos' },
  ];

  return { data, navigation, TABS, activeTab, setActiveTab };
};

export default useDestinationDetail;
