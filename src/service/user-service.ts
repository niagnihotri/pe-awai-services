import { User } from "../entities/user";
import { connectionFactory } from "../utils/database"
import { getRandomUUID } from "../utils/UUIDGeneration";


export async function getAllUesrsCall(): Promise<any> {

    // initialize
    await connectionFactory.initialize();
    console.log("conn established");
    try {
        let allUser = await connectionFactory.getRepository(User).find();
        console.log("allUser==" + JSON.stringify(allUser));
        return allUser
    }
    catch (errors) {
        console.log("issue while fetching data");
        return "No Data available";
    }
    finally {
        // destroy the connection
        await connectionFactory.destroy()
    }
}



export async function insertUserDataCall(username: string, email: string): Promise<any> {
    console.log("Data username==" + username + "  email==" + email);
    // initialize
    await connectionFactory.initialize();
    console.log("conn established");
    const userObj = new User();
    userObj.login_id = getRandomUUID();
    userObj.username = username;
    userObj.email = email;
    userObj.loginTimestamp = new Date();
    userObj.createdTimeStamp = new Date();
    console.log("Object to save==" + JSON.stringify(userObj));

    try {
        let userObjResult = await connectionFactory.getRepository(User).findOneBy({
            email: email,
        });
        console.log("User Object" + userObjResult);
        if (userObjResult) {
            return "User already exist in Database";
        }
        else {

            await connectionFactory.getRepository(User).save(userObj)
            console.log("Saved successfully");
            return "Saved successfully";
        }
    }
    catch (errors) {
        console.log("Issue while saving data==" + errors);
        return false;
    }
    finally {
        // destroy the connection
        await connectionFactory.destroy()
    }

}

export async function updateUserDataCall(id: string, username: string, email: string): Promise<any> {
    // initialize
    await connectionFactory.initialize();
    console.log("conn established");
    const userObj = new User();
    userObj.id = Number(id);
    userObj.login_id = getRandomUUID();
    userObj.username = username;
    userObj.email = email;
    userObj.loginTimestamp = new Date();
    userObj.createdTimeStamp = new Date();
    try {
        await connectionFactory.getRepository(User).save(userObj);
        console.log("Updated successfully");
        return true
    }
    catch (errors) {
        console.log("Issue while updating data");
        return false;
    }
    finally {
        // destroy the connection
        await connectionFactory.destroy()
    }

}


export async function deleteUserDataCall(login_id: string): Promise<any> {
    // initialize
    await connectionFactory.initialize();
    console.log("conn established");
    try {
        let userObj = await connectionFactory.getRepository(User).findOneBy({
            login_id: Number(login_id),
        });
        await connectionFactory.getRepository(User).remove(userObj);
        console.log("User Removed");
        return true;
    }
    catch (errors) {
        console.log("issue while saving data");
        return false;
    }
    finally {
        // destroy the connection
        await connectionFactory.destroy()
    }
}

export async function getUserByLoginIdCall(login_id: string): Promise<any> {

    // initialize
    await connectionFactory.initialize();
    console.log("conn established");
    try {
        let userObj = await connectionFactory.getRepository(User).findOneBy({
            login_id: Number(login_id),
        });
        console.log("User Object" + userObj);
        if (userObj) {
            return userObj;
        }
        else {
            return false;
        }
    }
    catch (errors) {
        console.log("issue while fetching data");
        return "issue while fetching data`";
    }
    finally {
        // destroy the connection
        await connectionFactory.destroy()
    }
}


export async function fetchUserByEmailCall(email: string): Promise<any> {

    // initialize
    await connectionFactory.initialize();
    console.log("conn established =="+email);
    try {
        let userObj = await connectionFactory.getRepository(User).findOneBy({
            email: email,
        });
        console.log("User Object" + userObj);
        if (userObj) {
            return userObj;
        }
        else {
            return "No Data found";
        }
    }
    catch (errors) {
        console.log("issue while fetching data");
        return "Issue while fetching data`";
    }
    finally {
        // destroy the connection
        await connectionFactory.destroy()
    }
}