
interface DB_Interface { 
    host: string;
    user: string;
    name: string;
    // password: string;
}

export const DB:DB_Interface = {
    host: "mongodb://localhost:27017",
    user: "root",
    name: "test",
    // password: ""
};