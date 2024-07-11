import { Client, Storage } from "node-appwrite";
import config from "./config.mjs";

const initializeStorage = () => {
    try {
        const client = new Client()
            .setEndpoint(config.appwriteStorage.apiEndpoint)
            .setProject(config.appwriteStorage.projectID);
        
        return new Storage(client);
    } catch (error) {
        console.error('Error initializing Appwrite storage:', error);
        throw error;
    }
};

export default initializeStorage;


