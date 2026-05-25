/* eslint-disable react-native/no-inline-styles */
import { Button, Text, TextField } from '@components';
import { Colors } from '@constants/colors';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import useReviews from './useReviews';
import { FlatList } from 'react-native-gesture-handler';

const ReviewsTab: React.FC = () => {
  const {
    reviewDestination,
    rating,
    reviewText,
    isLoadingAddReview,
    errorAddReview,
    setRating,
    setReviewText,
    handleSubmitReview,
  } = useReviews();

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text
          text={`We couldn't find any reviews at the moment.`}
          type="regular-base"
          color={Colors.neutral.secondary}
          textAlign="center"
        />
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View>
        <Text
          text="Add Your Review"
          type="bold-lg"
          color={Colors.neutral.base}
        />

        <View>
          <View style={styles.ratingContainer}>
            <Text
              text="Rating"
              type="regular-sm"
              color={Colors.neutral.secondary}
              textAlign="center"
            />

            {[1, 2, 3, 4, 5].map(star => {
              const isFilled = star <= rating;

              return (
                <TouchableOpacity
                  key={star}
                  activeOpacity={0.7}
                  onPress={() => setRating(star)}
                >
                  <MaterialDesignIcons
                    name="star"
                    size={20}
                    color={
                      isFilled ? Colors.warning.base : Colors.neutral.disabled
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.reviewInputContainer}>
            <View style={styles.reviewTextFieldWrapper}>
              <TextField
                placeholder="Share your experience in this place..."
                value={reviewText}
                onChangeText={setReviewText}
                inputTextStyle={{ width: '80%' }}
              />
            </View>

            <View style={styles.reviewButtonWrapper}>
              <Button action={handleSubmitReview}>
                {!isLoadingAddReview ? (
                  <Text text="Submit" type="bold-base" color={Colors.white} />
                ) : (
                  <ActivityIndicator size="small" color={Colors.white} />
                )}
              </Button>
            </View>
          </View>
          {errorAddReview && (
            <View style={{ marginTop: 8 }}>
              <Text
                text={errorAddReview}
                type="regular-sm"
                color={Colors.danger.base}
              />
            </View>
          )}
        </View>
      </View>

      <FlatList
        scrollEnabled={false}
        data={reviewDestination}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <MaterialDesignIcons
                name="account-circle"
                size={24}
                color={Colors.neutral.base}
              />

              <Text text={item?.users?.name ?? 'Anonymous'} type="bold-base" />
            </View>

            <View style={styles.reviewStarsContainer}>
              {[1, 2, 3, 4, 5].map(star => {
                const isFilled = star <= (item?.rating ?? 0);

                return (
                  <MaterialDesignIcons
                    key={star}
                    name="star"
                    size={16}
                    color={
                      isFilled ? Colors.warning.base : Colors.neutral.disabled
                    }
                  />
                );
              })}
            </View>

            <Text
              text={item?.comment}
              type="regular-base"
              color={Colors.neutral.base}
              style={styles.reviewComment}
            />
          </View>
        )}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

export { ReviewsTab };
