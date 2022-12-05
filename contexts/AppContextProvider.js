import React from 'react';
import UserContextProvider from './UserContextProvider';
import FirebaseContextProvider from './FirebaseContextProvider';
import DbContextProvider from './DbContextProvider';
import { combineComponents } from '../utils/combineComponents';

const providers = [
  UserContextProvider,
  DbContextProvider,
  FirebaseContextProvider,
]
const AppContextProvider = combineComponents(...providers);

export default AppContextProvider;