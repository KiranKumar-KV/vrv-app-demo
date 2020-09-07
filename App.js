import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './Screens/Home';
import Info from './Screens/Info';
import Software from './Screens/Software';
import Gallery from './Screens/Gallery';
import News from './Screens/News';
import CaseStudies from './Screens/CaseStudies';

function HomeScreen({navigation}) {
  return <Home />;
}

function InfoScreen({navigation}) {
  return <Info />;
}
const Tab = createBottomTabNavigator();

function DashBoard({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const icons = {
            Home: 'home',
            Products: 'tv',
          };
          return <Icon name={icons[route.name]} color={color} size={25} />;
        },
      })}
      tabBarOptions={{
        showIcon: true,
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#2E86C1',
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={InfoScreen} />
    </Tab.Navigator>
  );
}

function SoftwareScreen({navigation}) {
  return (
    <>
      <View>
        <Button
          onPress={() => navigation.navigate('Dashboard')}
          title="Go back Dashboard"
        />
      </View>
      <Software />
    </>
  );
}

function GalleryScreen({navigation}) {
  return (
    <>
      <View>
        <Button
          onPress={() => navigation.goBack('Dashboard')}
          title="Go back Dashboard"
        />
      </View>
      <Gallery />
    </>
  );
}

function NewsScreen({navigation}) {
  return (
    <>
      <View>
        <Button
          onPress={() => navigation.goBack('Dashboard')}
          title="Go back Dashboard"
        />
      </View>
      <News />
    </>
  );
}

function CaseStudiesScreen({navigation}) {
  return (
    <>
      <View>
        <Button
          onPress={() => navigation.goBack('Dashboard')}
          title="Go back Dashboard"
        />
      </View>
      <CaseStudies />
    </>
  );
}

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Dashboard" component={DashBoard} />
        <Drawer.Screen name="Softwares" component={SoftwareScreen} />
        <Drawer.Screen name="Gallery" component={GalleryScreen} />
        <Drawer.Screen name="News" component={NewsScreen} />
        <Drawer.Screen name="Case-studies" component={CaseStudiesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
