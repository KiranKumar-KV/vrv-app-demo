import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, StyleSheet, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

function Software() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://vrvinfoled.com/php/getAllNews.php')
      .then((response) => response.json())
      .then((json) => setData(json))
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  }, []);
  //   console.log(data);
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
            <Text style={{fontSize: 20}}>News</Text>
          </View>

          <ScrollView>
            {data.map((item) => {
              const project_image = item.news_image;
              const p_image = project_image.split('../');
              return (
                <View style={styles.card} key={item.news_id}>
                  <Text style={{textAlign: 'justify'}}>{item.news_header}</Text>
                  <FastImage
                    style={{width: 300, height: 200}}
                    source={{
                      uri: 'https://vrvinfoled.com/' + p_image[1],
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text style={{textAlign: 'justify'}}>
                    {item.news_description}
                  </Text>
                  <Text></Text>
                  <Text>Date : {item.news_date}</Text>
                  <Text>Venue : {item.news_venue}</Text>
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
