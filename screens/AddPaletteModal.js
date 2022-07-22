import {
  View,
  Text,
  StyleSheet,
  Switch,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { FlatList, TextInput } from 'react-native-gesture-handler';

export const AddPaletteModal = ({ navigation }) => {
  const [paletteName, setPaletteName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let paletteToCreate = [];

  const COLORS = [
    { colorName: 'AliceBlue', hexCode: '#F0F8FF' },

    { colorName: 'Coral', hexCode: '#FF7F50' },
    { colorName: 'CornflowerBlue', hexCode: '#6495ED' },
    { colorName: 'Cornsilk', hexCode: '#FFF8DC' },
    { colorName: 'Crimson', hexCode: '#DC143C' },
    { colorName: 'Cyan', hexCode: '#00FFFF' },
    { colorName: 'DarkBlue', hexCode: '#00008B' },
    { colorName: 'DarkCyan', hexCode: '#008B8B' },
    { colorName: 'DarkGoldenRod', hexCode: '#B8860B' },
    { colorName: 'DarkGray', hexCode: '#A9A9A9' },
    { colorName: 'DarkGrey', hexCode: '#A9A9A9' },
  ];

  const addColorPalette = useCallback(() => {
    if (!paletteName) {
      setErrorMessage('Enter a name for your palette.');
      return;
    }

    if (paletteToCreate.length < 3) {
      setErrorMessage('Select atleast 3 colors.');
      return;
    }
    const newPalette = {
      paletteName: paletteName,
      colors: paletteToCreate,
    };
    navigation.navigate('Home', { newPalette: newPalette });
  }, [paletteName, paletteToCreate]);

  const onSwitchActive = (color) => paletteToCreate.push(color);
  const onSwitchDisable = (color) => {
    paletteToCreate = paletteToCreate.filter(
      (item) => item.colorName !== color.colorName,
    );
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 30 }}>
        <Text>Name of your color palette</Text>
        <TextInput
          style={styles.input}
          value={paletteName}
          onChangeText={setPaletteName}
        ></TextInput>

        <View>
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              borderRadius: 4,
              marginVertical: 30,
              paddingVertical: 12,
              alignItems: 'center',
            }}
            onPress={() => addColorPalette()}
          >
            <Text style={{ color: 'white' }}>Submit!</Text>
          </TouchableOpacity>
          <Text>{errorMessage}</Text>
        </View>

        <FlatList
          data={COLORS}
          keyExtractor={(item) => item.colorName}
          renderItem={({ item }) => (
            <SelectItem
              color={item}
              onActivate={onSwitchActive}
              onDeactivate={onSwitchDisable}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

const SelectItem = ({ color, onActivate, onDeactivate }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.item}>
      <Text>{color.colorName}</Text>
      <Switch
        onValueChange={() =>
          setIsActive((prev) => {
            if (prev) {
              onDeactivate(color);
            } else {
              onActivate(color);
            }
            return !prev;
          })
        }
        value={isActive}
      ></Switch>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
  },
  item: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    backgroundColor: '#bbb',
    height: 2,
  },
});
