import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ColorBox } from '../components/ColorBox';

export const ColorPalette = ({ route }) => {
  const COLORS = route.params.colors;
  const paletteName = route.params.paletteName;
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{paletteName}</Text>
      <FlatList
        data={COLORS}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <ColorBox
            colorName={item.colorName}
            hexValue={item.hexCode}
          ></ColorBox>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  listItem: {
    textColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    marginVertical: 10,
  },
});
