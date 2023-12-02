import {addItem, getItemsByCriteria} from './db';

export const addUser = (user:any) => {
    addItem('t_user_login_data', user);
}

export const getUserByEmail = (email:string) => {
    getItemsByCriteria('t_user_login_data',["user_id"], {email});
}

export const getUserByUsername = (username:string) => {
    getItemsByCriteria('t_user_login_data',["user_id"], {username});
}