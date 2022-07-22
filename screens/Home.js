import { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

export const Home = ({ navigation, route }) => {
  const newPalette = route.params && route.params.newPalette;
  const [colorMap, setColorMap] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchColors = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.vercel.app/palettes',
    );
    const facts = await result.json();
    if (result.ok) {
      setColorMap(facts);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchColors();
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    fetchColors();
    console.log(colorMap);
  }, []);

  useEffect(() => {
    if (newPalette) {
      setColorMap((prev) => [newPalette, ...prev]);
    }
  }, [newPalette]);

  return (
    <FlatList
      data={colorMap}
      keyExtractor={(item) => item.paletteName}
      refreshing={isRefreshing}
      onRefresh={() => onRefresh()}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 30 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ColorPalette', {
                paletteName: item.paletteName,
                colors: item.colors,
              })
            }
          >
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}
            >
              {item.paletteName}
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <PreviewItems colors={item.colors} />
          </View>
        </View>
      )}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => navigation.navigate('ColorPaletteModal')}
          style={{ padding: 30 }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            Add a color scheme
          </Text>
        </TouchableOpacity>
      }
    ></FlatList>
  );
};

const PreviewColor = ({ hexCode }) => {
  return (
    <View
      style={{
        height: 50,
        width: 50,
        backgroundColor: hexCode,
        marginRight: 6,
      }}
    ></View>
  );
};

const PreviewItems = ({ colors }) => {
  const itemList = [];
  const len = Math.min(colors.length, 5);
  for (let i = 0; i < len; i++) {
    itemList.push(<PreviewColor hexCode={colors[i].hexCode} key={i} />);
  }
  return itemList;
};
