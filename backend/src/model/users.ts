import {addItem} from './db';

export const addUser = (user:any) => {
    addItem('t_user_login_data', user);
}