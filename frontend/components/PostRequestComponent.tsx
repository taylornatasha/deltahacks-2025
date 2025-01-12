import React from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { PostRequestTypes } from '@/types/poke';

const PostRequest = async (param: PostRequestTypes) => {
    const response = await fetch(param.user.uid ? 'http://127.0.0.1:8000/api/add' : 'http://127.0.0.1:8000/api_user2/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
      });
    return response;
}

//too lazy to add parameter
const PostRequestXP = async (param: PostRequestTypes) => {
    const response = await fetch(param.user.uid ? 'http://127.0.0.1:8000/api/increase_xp' : 'http://127.0.0.1:8000/api_user2/increase_xp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
      });
    return response;
}

export function PostRequestOverwrite(param: PostRequestTypes) {
  const handlePress = async () => {
    try {
      const response = await PostRequest(param);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      param.onPostSuccess();
      Alert.alert('Success', `Response: ${JSON.stringify(data)}`);
    } catch (error: any) {
      Alert.alert('Error', `Failed to send POST request: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#1e90ff"
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>{param.buttonText}</Text>
      </TouchableHighlight>
    </View>
  );
}

export function PostRequestUpdate(param: PostRequestTypes) {
    const handlePress = async () => {
      try {
        const response = await PostRequestXP(param);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        param.onPostSuccess();
        Alert.alert('Success', `Response: ${JSON.stringify(data)}`);
      } catch (error: any) {
        Alert.alert('Error', `Failed to send POST request: ${error.message}`);
      }
    };
  
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={param.disabled ? styles.disabledButton : styles.button}
          underlayColor={"#1e90ff"}
          onPress={handlePress}
          disabled={param.disabled}
        >
          <Text style={styles.buttonText}>{param.buttonText}</Text>
        </TouchableHighlight>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // width: '10%',
    position: 'relative'
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 7,
    borderRadius: 8,
    width: '100%'
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
    paddingVertical: 15,
    paddingHorizontal: 7,
    borderRadius: 8,
    width: '100%'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
