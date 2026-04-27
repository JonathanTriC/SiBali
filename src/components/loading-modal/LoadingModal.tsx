import { Colors } from '@constants/colors';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

interface LoadingModalProps {
  isVisible: boolean;
}

export const LoadingModal: React.FC<LoadingModalProps> = React.memo(
  ({ isVisible }: LoadingModalProps) => {
    return (
      <Modal isVisible={isVisible} style={styles.modal}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={Colors.white} />
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
