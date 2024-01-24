import {
  addItem,
  getItemsByCriteria,
  deleteItemByID,
  updateItem,
} from "./sqlDB";

export const createUser = async (user: any) => {
  return addItem("t_user_login_data", user);
};

export const getUserIDByEmail = async (email: string): Promise<any> => {
  return await getItemsByCriteria("t_user_login_data", ["id"], { email });
};

export const getUserDataByEmail = async (email: string) => {
  return await getItemsByCriteria(
    "t_user_login_data",
    ["id", "first_name", "last_name", "hashed_password"],
    { email }
  );
};

export const getUserByUsername = (username: string) => {
  getItemsByCriteria("t_user_login_data", ["id"], { username });
};

export const checkUserExistsByEmail = async (email: string) => {
  return typeof (await getUserIDByEmail(email)) === "undefined" ? false : true;
};

export const deleteUserByID = async (user_id: string) => {
  return await deleteItemByID("t_user_login_data", user_id);
};

export const updateUserByID = async (id: string, changes: any) => {
  return await updateItem("t_user_login_data", id, changes);
};

// export const getAllUserIDs = async () => {
//   return await getSpecificItems("t_user_login_data", ["id"]);
// };
