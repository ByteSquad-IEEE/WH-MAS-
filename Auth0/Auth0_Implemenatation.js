import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import Auth0 from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DbORM } from '../sarahdb/SarahDBClient';
import { encrypt, decrypt } from '../sarahdb/SarahEncrypt'

const auth0 = new Auth0({
  domain: 'dev-b5g4d5rsurrmubie.us.auth0.com',
  clientId: 'cUB1ixYLTVpKsVMVmIbh3U1TNBOPGqcO',
});

const logout = async () => {
  await auth0.webAuth.clearSession();
  await AsyncStorage.removeItem('accessToken');
  setUser(null);
};

const newUser = {
    first_name: user.given_name,
    last_name: user.family_name,
    email: user.email,
    OAUTH: 'google',
  // Populate other fields as necessary
    address: '',//user.,
    state: '',//user.,
    wallet_balance: '',//user.,
    wallet_id: '',//user.,
    phone_number: '',//user.,
    temp_data: '',//user.,
    role: '',//user.,
    merchant_name: '',//user.,
    account_ban: '',//user.,
    id: '',//user.
};

// You can then send this to your backend or store it locally
DbORM.addEntry("UserIEEE", `${encrypt(JSON.stringify(newUser))}`)

const App = () => {
  const [user, setUser] = useState(null);

  const loginWithGoogle = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
        connection: 'google-oauth2',
      });
      await AsyncStorage.setItem('accessToken', credentials.accessToken);
      const userInfo = await auth0.auth.userInfo({ token: credentials.accessToken });
      setUser(userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Login with Google" onPress={loginWithGoogle} />
      {user && (
        <View>
          <Text>Welcome, {user.name}!</Text>
          <Text>Email: {user.email}</Text>
        </View>
      )}
    </View>
  );
};



export default App;
