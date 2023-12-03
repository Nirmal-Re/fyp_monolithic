import {addItem, getItemsByCriteria, deleteItemsByCriteria, updateItem} from './db';

export const createUser = async (user:any) => {
   return addItem('t_user_login_data', user);
}

export const getUserIDByEmail = async (email:string):Promise<any> => {
   return await getItemsByCriteria('t_user_login_data',["user_id"], {email});
}

export const getUserDataByEmail = async (email:string) => {
    return await getItemsByCriteria('t_user_login_data',["user_id", "first_name", "last_name", "hashed_password"], {email});
}

export const getUserByUsername = (username:string) => {
    getItemsByCriteria('t_user_login_data',["user_id"], {username});
}

export const checkUserExistsByEmail = async (email:string) => {
 return typeof await getUserIDByEmail(email) === 'undefined' ? false : true;
}

export const deleteUserByID = (id:string) => {
    deleteItemsByCriteria('t_user_login_data', {id});
}

export const updateUserByID = (id:string, user:any) => {
    updateItem('t_user_login_data', id, user);
}