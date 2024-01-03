import {connectionFactory} from "../utils/database"
import {Conversation} from "../entities/conversation"
import { Timestamp } from "typeorm";
import {getRandomUUID} from "../utils/UUIDGeneration"

const mysql = require('mysql');


export async function fetchConversationDataCall(login_id:string): Promise<any> {
    console.log("inside function fetchConversationDataCall")
   // initialize
    await connectionFactory.initialize();
    console.log("conn established");
    try{
    let allConversations = await connectionFactory.getRepository(Conversation).findOneBy({login_id: Number(login_id)});
    console.log("allConversations==" + JSON.stringify(allConversations));
    return allConversations
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

export async function insertConversationDataCall(login_id:string,conversation_name:string,conversation_type_id:string): Promise<any> {
    // initialize
    await connectionFactory.initialize();
    console.log("conn established");
    const convObj = new Conversation();
    convObj.conversation_id= getRandomUUID();
    convObj.login_id = Number(login_id);
    convObj.conversation_name = conversation_name!=null ? conversation_name :"Default_Conversation";
    convObj.conversation_type_id=Number(conversation_type_id);
    convObj.conversation_time = new Date();
    convObj.createdTimeStamp = new Date();
    try{
    await connectionFactory.getRepository(Conversation).save(convObj)
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

export async function updateConversationDataCall(id:string,conversation_id:string,login_id:string,conversation_name:string,conversation_type_id:string): Promise<any> {
    // initialize
    await connectionFactory.initialize();
    console.log("conn established");
    const convObj = new Conversation();
    convObj.id = Number(id);
    convObj.conversation_id = Number(conversation_id);
    convObj.login_id = Number(login_id);
    convObj.conversation_name = conversation_name;
    convObj.conversation_type_id=Number(conversation_type_id);
    convObj.updatedTimestamp = new Date();
    //convObj.createdTimeStamp = new Date();
    console.log("Boj before update=="+JSON.stringify(convObj));
    try{
    await connectionFactory.getRepository(Conversation).save(convObj)
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


export async function deleteConversationDataCall(conversation_id:string): Promise<any> {
  // initialize
  await connectionFactory.initialize();
  console.log("conn established");
  try{
  let conversationObj = await connectionFactory.getRepository(Conversation).findOneBy({
    conversation_id: Number(conversation_id),
});
    await connectionFactory.getRepository(Conversation).remove(conversationObj);
  console.log("conversation Removed");
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

export async function fetchConversationSpecificDataCall(id:string): Promise<any> {

     // initialize
  await connectionFactory.initialize();
  console.log("conn established");
  try{
  let conversationObj = await connectionFactory.getRepository(Conversation).findOneBy({
    id: Number(id),
});

  console.log("conversation Object"+conversationObj);
  return conversationObj;
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
