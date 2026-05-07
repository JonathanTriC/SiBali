import { apiGet, apiPost } from '@api';
import { URL_PATH } from '@constants/url';
import { useNavigate } from '@hooks';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const useReviews = () => {
  const { getRouteParams } = useNavigate();
  const { destinationId } = getRouteParams<DestinationDetailScreenProps>();

  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [errorAddReview, setErrorAddReview] = useState<string>('');

  const { refetch: refetchDestination } = useQuery({
    queryKey: [`destination-detail-${destinationId}`],
    queryFn: () =>
      apiGet({
        url: URL_PATH.destinations.detail({ destinationId }),
      }).then((res: DestinationDetailResponse) => res?.data),
    placeholderData: keepPreviousData,
    enabled: true,
    retry: false,
  });

  const { data: reviewDestination, refetch: refetchReviews } = useQuery({
    queryKey: [`review-destination-${destinationId}`],
    queryFn: () =>
      apiGet({
        url: URL_PATH.destinations.reviews({ destinationId }),
      }).then((res: GetDestinationReviewResponse) => res?.data),
    placeholderData: keepPreviousData,
    enabled: true,
    retry: false,
  });

  const { mutate: addReview, isPending: isLoadingAddReview } = useMutation({
    mutationKey: ['add-review'],
    mutationFn: async () => {
      if (rating === 0) {
        setErrorAddReview(
          'Please provide a rating before submitting your review.',
        );
        throw new Error('Rating is required');
      }
      if (reviewText.trim() === '') {
        setErrorAddReview(
          'Please provide a review text before submitting your review.',
        );
        throw new Error('Review text is required');
      }

      setErrorAddReview('');
      const body = {
        rating,
        comment: reviewText,
      };

      const data = await apiPost({
        url: URL_PATH.destinations.reviews({ destinationId }),
        body,
      });

      return data?.data ?? {};
    },
    onSuccess: () => {
      setRating(0);
      setReviewText('');
      refetchReviews();
      refetchDestination();
    },
  });

  const handleSubmitReview = () => {
    console.log('Submitting review:', { rating, reviewText });
    addReview();
  };

  return {
    reviewDestination,
    rating,
    reviewText,
    isLoadingAddReview,
    errorAddReview,
    setRating,
    setReviewText,
    handleSubmitReview,
  };
};

export default useReviews;
