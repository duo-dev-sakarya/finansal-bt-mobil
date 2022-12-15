import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { View } from 'react-native';
import axios from 'axios'
import CustomButton from '../atoms/CustomButton'
import { FirebaseContext } from "../../contexts/FirebaseContextProvider"
import { GOOGLE_CLIENT_ID } from '@env'
import * as SecureStore from 'expo-secure-store';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {

  const firebaseContext = React.useContext(FirebaseContext);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
    },
  );

  React.useEffect(() => {
    try {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        console.log(response)

        singInFirebaseWithCredentials(firebaseContext.auth, id_token)


        //requestExample()
      }
    } catch (err) {
      console.log(err)
    }

  }, [response]);

  const singInFirebaseWithCredentials = async (auth, id_token) => {
    try{
      console.log('id_token',id_token)
      await SecureStore.setItemAsync('id_token',id_token);
      const credential = GoogleAuthProvider.credential(id_token);
      const res = await signInWithCredential(auth, credential)
      console.log(res.user);
      firebaseContext.setToken(res.user.accessToken)
      firebaseContext.setUserData(res.user)
    }catch(err){
      console.log(err,auth, credential);
    }

  }

  const requestExample = async () => {
    try {
      const res = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${response.params.id_token}`)
      console.log(res)
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <CustomButton
      disabled={!request}
      title="LOGIN WITH GOOGLE ACCOUNT"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}