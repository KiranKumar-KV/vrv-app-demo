import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, StyleSheet, ScrollView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FastImage from 'react-native-fast-image';
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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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

function AboutScreen({navigation}) {
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
        <Text style={{textAlign: 'justify'}}>
          Welcome to VRV Info LED Private Limited Leading Digital Signage Expert
          company in Mangalore & Bangalore.
        </Text>
        <Text style={{textAlign: 'justify'}}>
          Starting as a business named “VRV” in the year 2008, now newly named
          as “VRV Info LED Private Limited” in the year 2017, we have big
          dreams. We are a motivated company specializing in manufacturing and
          exporting LED/LCD Digital Signage Displays worldwide. We believe
          passionately in great bargains and excellent service, which is why we
          commit ourselves to giving you the best of both. We aim to offer our
          customers a variety of the latest LED/LCD Digital Signage Displays.
        </Text>
        <Text style={{textAlign: 'justify'}}>
          We always keep an eye on the latest trends in LED/LCD Digital Signage
          Displays and put our customers’ wishes first. That is why we have
          satisfied customers all over the world, and are thrilled to be a part
          of “Digital India” a campaign launched by the Government of India on
          1st July 2015 in order to ensure the Government and Private services
          are made available to citizens electronically by improved online
          infrastructure and by increasing Internet connectivity or by making
          the country digitally empowered in the field of technology. We strive
          to be industrious and innovative, offering our customers something
          they want, putting their desires at the top of our priority list. The
          interests of our customers are always top priority for us, so we hope
          you will enjoy our products as much as we enjoy making them available
          to you. With a motivated team, we strive to be the creative minds that
          bring a smile to your face. That’s why we’re always looking for
          innovative new ways to get the best for you.
        </Text>
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
            const res = logo.split('../');
            return (
              <View style={styles.card} key={item.client_id}>
                <FastImage
                  style={{width: 200, height: 200}}
                  source={{
                    uri: 'https://vrvinfoled.com/' + res[1],
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            );
          })}
        </ScrollView>
      )}
    </>
  );
}

function Home() {
  return (
    <>
      {/* <Stack.Navigator>
        <Stack.Screen name="Most Sold Products" component={SettingsScreen} />
      </Stack.Navigator> */}
      <Tab.Navigator>
        <Tab.Screen name="About us" component={AboutScreen} />
        <Tab.Screen name="Most Sold Products" component={MoldSoldScreen} />
        <Tab.Screen name="Clients" component={ClientScreen} />
      </Tab.Navigator>
    </>
  );
}

export default Home;
