import { getRepository } from "typeorm";
import { User } from "../entities/user";
import {connectionFactory} from "../utils/database"
import { getRandomUUID } from "../utils/UUIDGeneration";

/*
export async function fetchUesrDataCall(): Promise<any>{
    // initialize
await connectionFactory.initialize();
console.log("conn estbl");
let tenant=  await connectionFactory.getRepository(App).findOneBy({
    client_id: "1"
}); 
 console.log("tenant=="+JSON.stringify(tenant));
// destroy the connection
await connectionFactory.destroy()
}*/

export async function fetchUesrDataCall(): Promise<any>{

    // initialize
    await connectionFactory.initialize();
    console.log("conn estbl");
    try{
    let allUser = await connectionFactory.getRepository(User).find();
    console.log("allUser==" + JSON.stringify(allUser));
    return allUser
    }
    catch(errors){
        console.log("issue while fetching data");
        return "";
    }
    finally{
         // destroy the connection
    await connectionFactory.destroy()
    }
}



export async function insertUserDataCall(username:string,email:string): Promise<any> {
    // initialize
    await connectionFactory.initialize();
    console.log("conn estbl");
    const userObj = new User();
    userObj.login_id = getRandomUUID();
    userObj.username = username;
    userObj.email = email;
    userObj.loginTimestamp = new Date();
    userObj.createdTimeStamp = new Date();
    
    try{
    await connectionFactory.getRepository(User).save(userObj)
    console.log("Saved successfully");
        return true
    }
    catch(errors){
        console.log("issue while saving data");
        return false;
    }
    finally{
         // destroy the connection
    await connectionFactory.destroy()
    }
   
}

export async function updateUserDataCall(id:number,username:string,email:string): Promise<any> {
    // initialize
    await connectionFactory.initialize();
    console.log("conn estbl");
    const userObj = new User();
    userObj.id=id
    userObj.login_id = getRandomUUID();
    userObj.username = username;
    userObj.email = email;
    userObj.loginTimestamp = new Date();
    userObj.createdTimeStamp = new Date();
    try{
    await connectionFactory.getRepository(User).save(userObj);
    console.log("Updated successfully");
        return true
    }
    catch(errors){
        console.log("Issue while updating data");
        return false;
    }
    finally{
         // destroy the connection
    await connectionFactory.destroy()
    }
   
}


export async function deleteUserDataCall(login_id:number): Promise<any> {
  // initialize
  await connectionFactory.initialize();
  console.log("conn estbl");
  try{
  let userObj = await connectionFactory.getRepository(User).findOneBy({
    login_id: login_id,
});
    await connectionFactory.getRepository(User).remove(userObj);
  console.log("User Removed");
  return true;
  }
  catch(errors){
      console.log("issue while saving data");
      return false;
  }
  finally{
       // destroy the connection
  await connectionFactory.destroy()
  }
}

export async function fetchUserSpecificDataCall(login_id:number): Promise<any> {

     // initialize
  await connectionFactory.initialize();
  console.log("conn estbl");
  try{
  let userObj = await connectionFactory.getRepository(User).findOneBy({
    login_id: login_id,
});
  console.log("User Object"+userObj);
  return userObj;
  }
  catch(errors){
      console.log("issue while fetching data");
      return "";
  }
  finally{
       // destroy the connection
  await connectionFactory.destroy()
  }
}
