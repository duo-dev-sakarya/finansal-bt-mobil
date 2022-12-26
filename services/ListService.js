import { useContext, useState } from "react"
import { DbContext } from "../contexts/DbContextProvider"
const useListService = () => {

  const { db, lastTransaction,setLastTransaction } = useContext(DbContext)

  const addList = async (name) => {
    const currentDate = new Date()
    return new Promise(async (resolve, reject) =>
      await db.transaction(async tx => {
        await tx.executeSql('INSERT INTO lists (name, created_at, updated_at, is_active) values (?, ?, ?, ?)', [name, currentDate.toISOString(), currentDate.toISOString(), 1],
          (txObj, resultSet) => {
            resolve(resultSet.insertId)
            setLastTransaction(new Date())
          },
          (txObj, error) => { console.log('Error', error), reject() })
      })
    )
  }

  const fetchList = async () => {
    return new Promise(async (resolve, reject) =>
      await db.transaction(async tx => {
        // sending 4 arguments in executeSql
        await tx.executeSql('SELECT * FROM lists', null, // passing sql query and parameters:null
          // success callback which sends two things Transaction object and ResultSet Object
          (txObj, { rows: { _array } }) => resolve(_array),
          // failure callback which sends two things Transaction object and Error
          (txObj, error) => { console.log('Error ', error); reject() }
        ) // end executeSQL
      }) // end transaction
    )
  }

  const deleteList = async (listId) => {
    const currentDate = new Date()
    return new Promise(async (resolve, reject) =>
      await db.transaction(tx => {
        tx.executeSql(`DELETE FROM lists WHERE id = ?`,
          [listId],
          (txObj, resultSet) => {
            resolve(resultSet.insertId)
            setLastTransaction(new Date())
          },
          (txObj, error) => { console.log('Error', error), reject() })
      })
    )
  }

  return {
    addList,
    fetchList,
    deleteList,
    lastTransaction
  }
}

export default useListService


