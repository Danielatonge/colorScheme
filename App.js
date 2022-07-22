import { NavigationContainer } from '@react-navigation/native';
import { ColorPalette } from './screens/ColorPalette';
import { Home } from './screens/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { AddPaletteModal } from './screens/AddPaletteModal';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.paletteName })}
      />
    </MainStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen
            name="ColorPaletteModal"
            component={AddPaletteModal}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
