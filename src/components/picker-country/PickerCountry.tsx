import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { COUNTRIES } from '@constants';
import { Text } from '@components/text';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { BottomModal } from '@components/bottom-modal';

interface Country {
  name: string;
  dialCode: string;
  code: string;
  image: string;
  latitude: number | string;
  longitude: number | string;
  id?: number;
}

interface PickerCountryProps {
  data?: Country[];
  type?: 'dial' | 'name';
  selectedValue: string | null;
  onSelect: (code: string) => void;
  placeholder?: string;
  selectedTextStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
}

interface ItemProps {
  item: Country;
  type: 'dial' | 'name';
  onPress: (item: Country) => void;
  textStyle?: StyleProp<TextStyle>;
}

const Item: React.FC<ItemProps> = React.memo(
  ({ item, type = 'name', onPress, textStyle }: ItemProps) => {
    //   const {item, onPress, textStyle} = props;
    // const isSelected = selectedValue === item.value;
    const text =
      type === 'dial' ? `(${item.dialCode}) ${item.name}` : item.name;
    const handlePress = () => {
      onPress(item);
    };

    return (
      <TouchableOpacity
        // style={StyleSheet.flatten([styles.item, isSelected && styles.selectedItem])}
        style={{ marginVertical: 8 }}
        onPress={handlePress}
      >
        <Text style={StyleSheet.flatten([styles.text, textStyle])}>{text}</Text>
      </TouchableOpacity>
    );
  },
);

export const PickerCountry: React.FC<PickerCountryProps> = props => {
  const {
    data = COUNTRIES,
    type = 'name',
    selectedValue,
    onSelect,
    placeholder = 'Nationality',
    selectedTextStyle,
    textStyle,
  } = props;

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const country = useMemo(
    () => COUNTRIES.find(country => country.code === selectedValue),
    [selectedValue],
  );

  // const selectedVal = country ? country.name : placeholder;
  const selectedVal = useMemo(() => {
    if (!country) return placeholder;
    return type === 'name' ? country.name : country.dialCode;
  }, [country, placeholder, type]);

  const onPress = () => setModalVisible(!modalVisible);
  const handleSelect = (value: Country) => {
    const val = type === 'name' ? value.code : value.dialCode;
    onSelect(val);
    setModalVisible(!modalVisible);
  };

  const renderItem = ({ item }: { item: Country }) => {
    return (
      <Item
        item={item}
        type={type}
        onPress={handleSelect}
        textStyle={textStyle}
      />
    );
  };

  console.log('PickerCountry-FlagImage: ', country?.image);
  // emoji.hasEmoji(country?.image) ==> node-emoji
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.selectedContainer}>
        {/* FlagImage */}
        {/* {selectedVal && <Image source={{uri: country?.image}} style={{width: 12, height: 12}} />} */}
        <Text type="regular-sm" style={selectedTextStyle}>
          {selectedVal}
        </Text>
        <MaterialDesignIcons name="chevron-down" size={8} />
      </TouchableOpacity>
      <BottomModal isVisible={modalVisible} onPressClose={onPress}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              renderItem={renderItem}
              fadingEdgeLength={20}
              keyExtractor={item => item.code}
              showsVerticalScrollIndicator={false}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
            />
          </View>
        </View>
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 20,
    maxHeight: 300,
  },
  text: {
    textTransform: 'capitalize',
  },
});
