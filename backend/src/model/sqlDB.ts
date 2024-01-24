import mysql2, {
  RowDataPacket,
  ResultSetHeader,
  FieldPacket,
} from "mysql2/promise";

import { DB_mysql } from "../constants/config";

let conn: mysql2.Connection;

//connecting to mysql database
const sqlDbConnect = async () => {
  try {
    conn = await mysql2.createConnection({ ...DB_mysql });
    console.log("Connected as id " + conn.threadId);
  } catch (e: any) {
    console.log("Error with connection", e.stack);
  }
};
sqlDbConnect();

// conn.ping((err) => {console.log("Error with connection",err)})

export const excuteCustomQuery = (query: string) => {
  conn.query(query);
};

export const addItem = async (table: string, item: any): Promise<boolean> => {
  const [result] = (await conn.query(`INSERT INTO ${table} SET ?`, [item])) as [
    ResultSetHeader,
    FieldPacket[]
  ];
  const { affectedRows } = result;
  return affectedRows === 1 ? true : false;
};

export const addMultipleItems = (table: string, items: any[]) => {
  conn.query(`INSERT INTO ${table} SET ?`, [items]);
};

export const getAllItems = (table: string) => {
  conn.query(`SELECT * FROM ${table}`);
};

export const getItemByID = (table: string, id: string) => {
  conn.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
};

export const getItemsByCriteria = async (
  table: string,
  fields: string[],
  criteria: any
) => {
  const queryfields = fields.length === 0 ? "*" : fields.join(", ");
  const [row, _] = (await conn.query(
    `SELECT ${queryfields} FROM ${table} WHERE ?`,
    [criteria]
  )) as [RowDataPacket[], FieldPacket[]];
  return row[0];
};

export const updateItem = async (table: string, id: string, item: any) => {
  const [result] = (await conn.query(`UPDATE ${table} SET ? WHERE id = ?`, [
    item,
    id,
  ])) as [ResultSetHeader, FieldPacket[]];
  return result.affectedRows === 1 ? true : false;
};

export const updateItemsByCriteria = (
  table: string,
  criteria: any,
  item: any
) => {
  conn.query(`UPDATE ${table} SET ? WHERE ?`, [item, criteria]);
};

export const deleteItemByID = async (table: string, id: string) => {
  const [result] = (await conn.query(`DELETE FROM ${table} WHERE id = ?`, [
    id,
  ])) as [ResultSetHeader, FieldPacket[]];
  const { affectedRows } = result;
  return affectedRows === 1 ? true : false;
};

export const deleteItemsByCriteria = (table: string, criteria: any) => {
  conn.query(`DELETE FROM ${table} WHERE ?`, [criteria]);
};

export const deleteAllItems = (table: string) => {
  conn.query(`DELETE FROM ${table}`, []);
};

// export const getSpecificItems = async (table: string, fields: string[]) => {
//   const [data, field] = (await conn.query(
//     `SELECT ${fields.join(", ")} FROM ${table}`,
//     []
//   )) as [RowDataPacket[], FieldPacket[]];
//   return data;
// };
