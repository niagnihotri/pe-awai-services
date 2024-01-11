import { findChatByConversationIdCall, insertChatletDataCall, updateChatletDataCall, deleteChatletDataCall } from "../service/chatlet-service";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import response from "../utils/response";
import { User } from "../entities/user";



export async function findChatByConversationId(event: APIGatewayProxyEvent): Promise<any> {
  let conversation_id = null;
  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    if (body.conversation_id)
    conversation_id = body.conversation_id;
    const result = await findChatByConversationIdCall(conversation_id);
    return response.ok(result);
  }
  else {
    return response.error(500, "Somethning wromg with request");
  }


}

export async function chatletData(event: APIGatewayProxyEvent): Promise<any> {
  switch (event.httpMethod) {
    case ("GET"):
      {
        let conversation_id = null;
        console.log("inside GET====");
        if (event.pathParameters !== null && event.pathParameters !== undefined) {
          if (event.pathParameters.conversation_id)
          conversation_id = event.pathParameters.conversation_id;
          const result = await findChatByConversationIdCall(conversation_id);

          return response.ok(result);
        }
        else {
          return response.error(500, "Something wromg with request");
        }
      }
      break;
    case ("POST"): {
      let conversation_id = null;
      let docLet_id = null;
      let login_id =null;
      let char_question =null;
      let char_answer = null;
      let chat_response_time=null;
      let inputTokenCount=null;
      let outputTokenCount=null;
      if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if ((body.conversation_id || body.docLet_id) && body.login_id) {
            conversation_id = body.conversation_id;
            docLet_id = body.docLet_id;
            login_id = body.login_id;
            char_question=body.char_question;
            char_answer=body.char_answer;
            chat_response_time= body.chat_response_time;
            inputTokenCount = body.inputTokenCount;
            outputTokenCount= body.outputTokenCount;
        }
        else {
          return response.error(400, "No required informain in request");
        }
        const result = await insertChatletDataCall(conversation_id, docLet_id,login_id,char_question,char_answer,chat_response_time,inputTokenCount,outputTokenCount);
        if (result) {
          return response.ok(result);
        }
        else {
          return response.error(400, "Error while inserting record");
        }
      }
      else {
        return response.error(500, "Something wromg with request");
      }
    }
    break;
    case ("PUT"): {
        let id = null;
        let chatlet_id=null;
        let conversation_id = null;
        let docLet_id = null;
        let login_id =null;
        let char_question =null;
        let char_answer = null;
        let chat_response_time=null;
        let inputTokenCount=null;
        let outputTokenCount=null;
      if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.id) {
            id= body.id;
            chatlet_id = body.chatlet_id;
            conversation_id = body.conversation_id;
            docLet_id = body.docLet_id;
            login_id = body.login_id;
            char_question=body.char_question;
            char_answer=body.char_answer;
            chat_response_time= body.chat_response_time;
            inputTokenCount = body.inputTokenCount;
            outputTokenCount= body.outputTokenCount;
        }
        else {
          return response.error(400, "No required informain in request");
        }
        const result = await updateChatletDataCall(id,chatlet_id , conversation_id, docLet_id,login_id,char_question,char_answer,chat_response_time,inputTokenCount,outputTokenCount);

        if (result) {
          return response.ok("Updated Successfully");
        }
        else {
          return response.error(400, "Error while inserting record");
        }
      }
      else {
        return response.error(500, "Something wromg with request");
      }
    }
    break;
    case ("DELETE"): {
      let chatlet_id = null;
      if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.chatlet_id) {
            chatlet_id = body.chatlet_id;
        }
        else {
          return response.error(400, "No Id value in request");
        }
        const result = await deleteChatletDataCall(chatlet_id);

        if (result) {
          return response.ok("Deleted Successfully");
        }
        else {
          return response.error(400, "Error while delete record");
        }
      }
      else {
        return response.error(500, "Something wromg with request");
      }

    }
    break;
  }

}

