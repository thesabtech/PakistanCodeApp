import {createStackNavigator} from '@react-navigation/stack';
import SingleLaw from '../SingleLaw';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SingleLaw" component={SingleLaw} />
    </Stack.Navigator>
  );
}
export default MainStackNavigator;
