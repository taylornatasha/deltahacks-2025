import React from 'react';
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { PyPokeType } from '@/app/(tabs)/pokemon';

type PostRequestComponentProps = {
    onPostSuccess: () => void;
    param: PyPokeType; // Define the expected structure of param
  };

export const PostRequest = async (param: PostRequestComponentProps) => {
    const response = await fetch('http://127.0.0.1:8000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
      });
    return response;
}

export function PostRequestComponent(param: PostRequestComponentProps) {
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
        <Text style={styles.buttonText}>Track Habit</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});
