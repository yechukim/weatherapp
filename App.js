import React from 'react';
import { Alert } from 'react-native';
import Loading from './screen/loading';
import * as Location from 'expo-location';
import axios from 'axios';
import Weather from './screen/Weather';

const API_KEY = "b422bc7295c0ae11f8756e015fe316f9";

/* export default function App() {
  return (
    <Loading />
  );
} */
//async -> await 필요함 

export default class extends React.Component {
  state = {
    isLoading: true
  };

  getWeather = async (latitude, longitude) => {

    const {
      data: {
        main: { temp },
        weather
      }, } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        // 변수를 string에 포함할꺼니까 백틱 사용해야 함 
      );

    //temp 가져오기
    this.setState({
      isLoading: false,
      temp: temp,
      condition: weather[0].main
    })

  }

  getLocation = async () => {
    try {
      const locPermission = await Location.requestForegroundPermissionsAsync(); // returns promise 

      if (locPermission.granted) {
        //바로 위도 경도 가져오기 
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
        //send to api and get weather 
        this.getWeather(latitude, longitude);
      

      }
    } catch (error) { // catch error inside the block 
      Alert.alert("can't find you", "so sad"); // alert title, msg 
      console.log(error);
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }
}