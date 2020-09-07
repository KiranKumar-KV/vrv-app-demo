import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, StyleSheet, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

function Software() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://vrvinfoled.com/php/getAllSoftwares.php')
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
        <>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 100,
              margin: 20,
            }}>
            <Text style={{fontSize: 20}}>Our Softwares</Text>
          </View>

          <ScrollView>
            {data.map((item) => {
              const logo = item.project_logo;
              const res = logo.split('../');
              const project_image = item.project_image;
              const p_image = project_image.split('../');
              return (
                <View style={styles.card} key={item.project_id}>
                  <FastImage
                    style={{width: 200, height: 50}}
                    source={{
                      uri: 'https://vrvinfoled.com/' + res[1],
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <FastImage
                    style={{width: 400, height: 200}}
                    source={{
                      uri: 'https://vrvinfoled.com/' + p_image[1],
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text style={{textAlign: 'justify'}}>
                    {item.project_description}
                  </Text>
                  <Text></Text>
                  <Text>Platform : {item.platform}</Text>
                </View>
              );
            })}
          </ScrollView>
        </>
      )}
    </>
  );
}

export default Software;
