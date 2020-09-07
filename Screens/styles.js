import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    // margin: 10,
    height: 100,
    overflow: 'scroll',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    // borderWidth: 1,
    padding: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 9,
  },
});

export default styles;
