import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, StyleSheet, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

function CaseStudies({natigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://vrvinfoled.com/php/getAllCaseStudies.php')
      .then((response) => response.json())
      .then((json) => setData(json))
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  }, []);
  // console.log(data);
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
            <Text style={{fontSize: 20}}>Case Studies</Text>
          </View>

          <ScrollView>
            {data.map((item) => {
              const project_image = item.image;
              const p_image = project_image.split('../');
              return (
                <View style={styles.card} key={item.case_studies_id}>
                  <Text style={{textAlign: 'justify'}}>
                    {item.customer_name}
                  </Text>
                  <FastImage
                    style={{width: 300, height: 200}}
                    source={{
                      uri: 'https://vrvinfoled.com/' + p_image[1],
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text style={{textAlign: 'justify'}}>{item.description}</Text>
                  <Text></Text>
                  <Text>Venue : {item.location}</Text>
                </View>
              );
            })}
          </ScrollView>
        </>
      )}
    </>
  );
}

export default CaseStudies;
