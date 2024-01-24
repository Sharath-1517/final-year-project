import { Login } from "../contracts/login";
// import { AppwriteException, account } from "@repo/appwrite-config";

export const LoginHandler = async (formData: Login) => {
  try {
    // const session = await account.createEmailSession(
    //   formData.email,
    //   formData.password
    // );
    // const token = await account.createJWT();
    // return token.jwt;
    return Promise;
  } catch (error) {
    // if (error instanceof AppwriteException) return error;
    // else throw error;
  }
};
