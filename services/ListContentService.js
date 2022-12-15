import { useContext, useState } from "react"
import { DbContext } from "../contexts/DbContextProvider"
const useListContentService = () => {

  const { db, lastTransaction, setLastTransaction } = useContext(DbContext)

  const addListContent = async (listId, name) => {
    const currentDate = new Date()
    return new Promise(async (resolve, reject) =>
      await db.transaction(tx => {
        tx.executeSql(`INSERT INTO list_contents (name, created_at, updated_at, is_active, list_id, is_checked) values (?, ?, ?, ?, ?, ?)`,
          [name, currentDate, currentDate, 1, listId, 0],
          (txObj, resultSet) => {
            resolve(resultSet.insertId)
            setLastTransaction(new Date())
          },
          (txObj, error) => { console.log('Error', error), reject() })
      })
    )
  }

  const checkListContent = async (listContentId,check) => {
    const currentDate = new Date()
    return new Promise(async (resolve, reject) =>
      await db.transaction(tx => {
        tx.executeSql(`UPDATE list_contents SET is_checked = ?, updated_at = ? WHERE id = ?`,
          [check,currentDate, listContentId],
          (txObj, resultSet) => {
            resolve(resultSet.insertId)
            setLastTransaction(new Date())
          },
          (txObj, error) => { console.log('Error', error), reject() })
      })
    )
  }

  const deleteListContent = async (listContentId) => {
    const currentDate = new Date()
    return new Promise(async (resolve, reject) =>
      await db.transaction(tx => {
        tx.executeSql(`DELETE FROM list_contents WHERE id = ?`,
          [listContentId],
          (txObj, resultSet) => {
            resolve(resultSet.insertId)
            setLastTransaction(new Date())
          },
          (txObj, error) => { console.log('Error', error), reject() })
      })
    )
  }

  const fetchListContent = async (list_id) => {
    return new Promise(async (resolve, reject) =>
      await db.transaction(async tx => {
        // sending 4 arguments in executeSql
        await tx.executeSql('SELECT * FROM list_contents WHERE list_id = ?', [list_id], // passing sql query and parameters:null
          // success callback which sends two things Transaction object and ResultSet Object
          (txObj, { rows: { _array } }) => resolve(_array),
          // failure callback which sends two things Transaction object and Error
          (txObj, error) => { console.log('Error ', error); reject() }
        ) // end executeSQL
      }) // end transaction
    )
  }

  return {
    addListContent,
    fetchListContent,
    lastTransaction,
    checkListContent,
    deleteListContent
  }
}

export default useListContentService