import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='start' options={{ headerShown: false }} />
      <Stack.Screen name='register' options={{ headerShown: false }} />
      <Stack.Screen name='login' options={{ headerShown: false }} />
      <Stack.Screen name='registerPassword' options={{ headerShown: false }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;

