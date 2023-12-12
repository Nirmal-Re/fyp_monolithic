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


export const startAndEndOfDay = () => {
    return [new Date(new Date().setHours(0,0,0,0)), new Date(new Date().setHours(23,59,59,999))]; //[startofday, endofday]
}


export const areSetsEqual = (setA: Set<any>, setB: Set<any>): boolean => {
    if (setA.size !== setB.size) return false;
    for (let elem of setA) {
        if (!setB.has(elem)) return false;
    }
    return true;
}