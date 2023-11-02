import bcrypt from 'bcrypt';


const createHashedPassword = async (password:string) => {
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch {
        return {error: "Error with hashing password"};
    }
}

export {createHashedPassword};