import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, StyleSheet, ScrollView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import styles from './styles';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function MoldSoldScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://vrvinfoled.com/php/mostSoldProducts.php')
      .then((response) => response.json())
      .then((json) => setData(json))
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <Image
            style={{width: 200, height: 200}}
            source={require('./load.gif')}
          />
        </View>
      ) : (
        <ScrollView>
          {data.map((item) => {
            const image = item.image;
            return (
              <View style={styles.card} key={item.image_id}>
                <Image
                  style={{width: 200, height: 200}}
                  source={{uri: 'https://vrvinfoled.com/' + image}}
                />
                <Text style={{justifyContent: 'center'}}>
                  {item.category_name}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </>
  );
}

function ContactScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
      }}>
      <Image
        style={{width: 100, height: 100}}
        source={require('./logo144.png')}
      />
      <ScrollView style={styles.viewStyle}>
        <Text style={{textAlign: 'justify'}}>Mangalore</Text>
        <Text style={{textAlign: 'justify'}}>
          Address: 4th Floor, PVS SadanBuilding, PVS Circle, Mangalore-575003
        </Text>
        <Text>Email: info@vrvinfoled.com</Text>
        <Text>Phone: +91 97416 75082 | +91 9686343647</Text>
        <Text></Text>
        <Text></Text>
        <Text style={{textAlign: 'justify'}}>Bangalore</Text>
        <Text style={{textAlign: 'justify'}}>
          Address: 1st Floor, 2nd Stage, 8th Main, J.C Industrial Estate,
          Kanakpura Road, Yelchenahalli, Bangalore-560062
        </Text>
        <Text>Email: info@vrvinfoled.com</Text>
        <Text>Phone: +91 98455 59076 | +91 97416 75082</Text>
      </ScrollView>
    </View>
  );
}

function ClientScreen({navigation}) {
  const [isLoadingClient, setLoading] = useState(true);
  const [clientData, setData] = useState([]);

  useEffect(() => {
    fetch('https://vrvinfoled.com/php/getAllClients.php')
      .then((response) => response.json())
      .then((json) => setData(json))
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      {isLoadingClient ? (
        <View style={styles.container}>
          <Image
            style={{width: 200, height: 200}}
            source={require('./load.gif')}
          />
        </View>
      ) : (
        <ScrollView>
          {clientData.map((item) => {
            const logo = item.client_logo;
            return (
              <View style={styles.card} key={item.client_id}>
                <Image
                  style={{width: 200, height: 200}}
                  source={{uri: 'https://vrvinfoled.com/' + logo}}
                />
              </View>
            );
          })}
        </ScrollView>
      )}
    </>
  );
}

function Info() {
  return (
    <>
      {/* <Stack.Navigator>
        <Stack.Screen name="Most Sold Products" component={SettingsScreen} />
      </Stack.Navigator> */}
      <Tab.Navigator>
        <Tab.Screen name="Products" component={MoldSoldScreen} />
        <Tab.Screen name="Contact Us" component={ContactScreen} />
        {/* <Tab.Screen name="Clients" component={ClientScreen} /> */}
      </Tab.Navigator>
    </>
  );
}

export default Info;
