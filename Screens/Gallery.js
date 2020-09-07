import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, StyleSheet, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

function Gallery() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://vrvinfoled.com/php/getAllGallery.php')
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
            <Text style={{fontSize: 20}}>Gallery</Text>
          </View>
          <ScrollView>
            {data.map((item) => {
              const gallery_image = item.gallery_image;
              const res = gallery_image.split('../');
              return (
                <View style={styles.card} key={item.gallery_id}>
                  <FastImage
                    style={{width: 300, height: 300}}
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
        </>
      )}
    </>
  );
}

export default Gallery;
