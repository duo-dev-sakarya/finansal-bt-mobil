import { createContext, useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite'

export const DbContext = createContext();

const DbContextProvider = ({ children }) => {

  const db = SQLite.openDatabase("listie.db")

  const [lastTransaction, setLastTransaction] = useState(new Date())

  useEffect(() => {
    db.transaction(async tx => {
      await tx.executeSql(
        'CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, created_at INT, updated_at INT, is_active INT)'
      )
      await tx.executeSql(
        `CREATE TABLE IF NOT EXISTS list_contents (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT, created_at INT, 
          updated_at INT, 
          is_active INT,
          list_id INTEGER, 
          is_checked INT,
          FOREIGN KEY (list_id) REFERENCES lists(id)
          )`
      )
    })
  }, [])

  return (
    <DbContext.Provider value={{ db, lastTransaction, setLastTransaction }}>
      {children}
    </DbContext.Provider>
  )
}

export default DbContextProvider