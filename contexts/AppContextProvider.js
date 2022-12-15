import React from 'react';
import FirebaseContextProvider from './FirebaseContextProvider';
import DbContextProvider from './DbContextProvider';
import { combineComponents } from '../utils/combineComponents';

const providers = [
  DbContextProvider,
  FirebaseContextProvider,
]
const AppContextProvider = combineComponents(...providers);

export default AppContextProvider;