import {Text, View, StyleSheet} from "react-native"

export const ColorBox = ({colorName, hexValue}) => {

  return (
    <View style={[styles.listItem, { backgroundColor: hexValue }]}>
      <Text style={{ color: 'white' }}>
        {colorName} {hexValue}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    marginVertical: 10,
  },
});