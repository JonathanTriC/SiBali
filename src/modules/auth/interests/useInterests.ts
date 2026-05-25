import { apiGet, apiPost } from '@api';
import { URL_PATH } from '@constants/url';
import { useNavigate } from '@hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

const useInterests = () => {
  const { popScreen, resetNavigate, getRouteParams } = useNavigate();
  const queryClient = useQueryClient();

  const { isFromRegister } = getRouteParams<InterestParamsList>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isMinSelected = selectedIds.length >= 3;

  const toggleInterest = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const {
    data: interestsList,
    isLoading: isLoadingInterestsList,
    isError: isErrorInterestsList,
  } = useQuery({
    queryKey: ['interests'],
    queryFn: () =>
      apiGet({
        url: URL_PATH.master.interests,
      }).then((res: InterestsListResponse) => res?.data),
  });

  const {
    data: userInterestsData,
    isPending: isLoadingUserInterest,
    // isError: isErrorUserInterests,
  } = useQuery({
    queryKey: ['user-interests'],
    queryFn: () =>
      apiGet({
        url: URL_PATH.users.interests,
      }).then((res: UserInterestsResponse) => {
        setSelectedIds((res?.data ?? [])?.map(data => data?.interest_id ?? ''));
        return res?.data;
      }),
    enabled: !isFromRegister,
    retry: false,
  });

  const {
    mutate: submitUserInterests,
    isPending: isLoadingSubmitUserInterests,
  } = useMutation<UserInterestsItem[], ApiError<UsersErrorResponse>>({
    mutationKey: ['set-interests'],
    mutationFn: async () => {
      const body = {
        interestIds: selectedIds,
      };

      const data = await apiPost<SetInterestsResponse>({
        url: URL_PATH.users.interests,
        body,
      });

      return data?.data ?? [];
    },
    onSuccess: data => {
      console.log('Successfuly Set User Interests:', data);
      if (isFromRegister) {
        handleNavigateHome();
      } else {
        popScreen();
      }
    },
  });

  const handleSubmitInterests = useCallback(() => {
    console.log(selectedIds);
    submitUserInterests();
  }, [selectedIds, submitUserInterests]);

  const handleNavigateHome = useCallback(() => {
    resetNavigate('Main', { screen: 'HomeScreen' });
  }, [resetNavigate]);

  useEffect(() => {
    console.log('🚀 ~ useInterests ~ userInterestsData:', userInterestsData);
    if (userInterestsData) {
      setSelectedIds(userInterestsData.map(data => data?.interest_id ?? ''));
    }
  }, [userInterestsData]);

  useEffect(() => {
    return () => {
      setSelectedIds([]);
      queryClient.resetQueries({
        queryKey: ['user-interests'],
      });
    };
  }, [queryClient]);

  return {
    isFromRegister,
    interestsList,
    isLoadingInterestsList,
    isLoadingUserInterest,
    isLoadingSubmitUserInterests,
    isErrorInterestsList,
    selectedIds,
    isMinSelected,
    toggleInterest,
    popScreen,
    handleSubmitInterests,
    handleNavigateHome,
  };
};

export default useInterests;
