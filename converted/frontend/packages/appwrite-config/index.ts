import { Client, Account, AppwriteException } from "appwrite";

const client = new Client();

export const appwriteClientFunction = client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65857a3780a5fb107bd8");

export const account = new Account(client);
export { ID } from "appwrite";
export { AppwriteException };
