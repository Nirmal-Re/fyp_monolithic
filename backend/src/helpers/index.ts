import bcrypt from 'bcrypt';


export const createHashedPassword = async (password:string) => {
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch {
        return {error: "Error with hashing password"};
    }
}

export const comparePassword = async (password:string, hashedPassword:string) => {
    try{
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch {
        return {error: "Error with comparing password"};
    }
}

export const createSessionToken = async (user_id:string) => {}


