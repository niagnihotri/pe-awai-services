import { User } from "../entities/user";
import { Chatlet } from "../entities/chatlet";
import { connectionFactory } from "../utils/database"
import { getRandomUUID } from "../utils/UUIDGeneration";




export async function insertChatletDataCall(conversation_id :string, docLet_id:string,login_id:string,char_question:string,char_answer:string,chat_response_time:string,inputTokenCount:string,outputTokenCount:string): Promise<any> {
   
    // initialize
    await connectionFactory.initialize();
    console.log("conn established");
    const chatletObj = new Chatlet();
    chatletObj.chatlet_id = getRandomUUID();
    chatletObj.conversation_id = Number(conversation_id);
    chatletObj.docLet_id = Number(docLet_id);
    chatletObj.login_id = Number(login_id);
    chatletObj.char_question = char_question;
    chatletObj.char_answer = char_answer
    chatletObj.chat_response_time = Number(chat_response_time);
    chatletObj.inputTokenCount = Number(inputTokenCount);
    chatletObj.outputTokenCount = Number(outputTokenCount);
    chatletObj.createdTimeStamp = new Date();
    console.log("Object to save==" + JSON.stringify(chatletObj));

    try {
            await connectionFactory.getRepository(Chatlet).save(chatletObj)
            console.log("Saved successfully");
            return "Saved successfully";
        
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

export async function updateChatletDataCall(id: string, chatlet_id: string, conversation_id :string, docLet_id:string,login_id:string,char_question:string,char_answer:string,chat_response_time:string,inputTokenCount:string,outputTokenCount:string): Promise<any> {
    // initialize
    await connectionFactory.initialize();
    console.log("conn established");
    const chatletObj = new Chatlet();
    chatletObj.id=Number(id);
    chatletObj.chatlet_id = Number(chatlet_id);
    chatletObj.conversation_id = Number(conversation_id);
    chatletObj.docLet_id = Number(docLet_id);
    chatletObj.login_id = Number(login_id);
    chatletObj.char_question = char_question;
    chatletObj.char_answer = char_answer
    chatletObj.chat_response_time = Number(chat_response_time);
    chatletObj.inputTokenCount = Number(inputTokenCount);
    chatletObj.outputTokenCount = Number(outputTokenCount);
    chatletObj.updatedTimestamp = new Date();
    try {
        await connectionFactory.getRepository(Chatlet).save(chatletObj);
        console.log("Updated successfully");
        return true
    }
    catch (errors) {
        console.log("Issue while updating data");
        return false;
    }
    finally {
        // destroy the connection
        await connectionFactory.destroy();
    }

}


export async function deleteChatletDataCall(chatlet_id: string): Promise<any> {
    // initialize
    await connectionFactory.initialize();
    console.log("conn established");
    try {
        let chatletObj = await connectionFactory.getRepository(Chatlet).findOneBy({
            chatlet_id: Number(chatlet_id),
        });
        await connectionFactory.getRepository(Chatlet).remove(chatletObj);
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

export async function findChatByConversationIdCall(conversation_id: string): Promise<any> {

    // initialize
    await connectionFactory.initialize();
    console.log("conn established");
    try {
        let chatletObj = await connectionFactory.getRepository(Chatlet).findBy({
            conversation_id: Number(conversation_id),
        });
        console.log("Chatlet Object" + chatletObj);
        if (chatletObj) {
            return chatletObj;
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