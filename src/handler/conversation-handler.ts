import { fetchConversationDataCall, fetchConversationSpecificDataCall, insertConversationDataCall, updateConversationDataCall, deleteConversationDataCall } from "../service/conversation-service";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import response from "../utils/response";

export async function findAllConversations(event: APIGatewayProxyEvent): Promise<any> {

  let login_id = null;
  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    if (body.login_id) {
      login_id = body.login_id;
      const result = await fetchConversationDataCall(login_id);
      return response.ok(result);
    }
    else {
      return response.error(500, "No Id present in request");
    }
  }
  else {
    return response.error(500, "Sometning wromg with request");
  }
}

export async function findConversationById(event: APIGatewayProxyEvent): Promise<any> {
  let id = null;
  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    if (body.id) {
      id = body.id;
      const result = await fetchConversationSpecificDataCall(id);
      return response.ok(result);
    }
    else {
      return response.error(500, "No Id present in request");
    }
  }
  else {
    return response.error(500, "Sometning wromg with request");
  }
}


export async function conversationData(event: APIGatewayProxyEvent): Promise<any> {
  if (event.httpMethod === "POST") {
    let login_id = null;
    let conversation_name = null;
    let conversation_type_id = null;
    if (event.body !== null && event.body !== undefined) {
      let body = JSON.parse(event.body)
      if (body.login_id && body.conversation_name && body.conversation_type_id) {
        login_id = body.login_id;
        conversation_name = body.conversation_name;
        conversation_type_id = body.conversation_type_id;
        const result = await insertConversationDataCall(login_id, conversation_name, conversation_type_id);
        if (result) {
         return response.ok(result);
        }
        else {
          return response.error(400, "Error while inserting record");
        }
      }
      else {
        return response.error(500, "Request is mismatched");
      }
    }
    else {
      return response.error(500, "Sometning wromg with request");
    }

  }
  else if (event.httpMethod === "PUT") {
    console.log("Inside update")
    let id = null;
    let conversation_id = null;
    let login_id = null;
    let conversation_name = null;
    let conversation_type_id = null;
    if (event.body !== null && event.body !== undefined) {
      let body = JSON.parse(event.body)
      if (body.id) {
        id=body.id;
        conversation_id= body.conversation_id;
        login_id = body.login_id;
        conversation_name = body.conversation_name;
        conversation_type_id = body.conversation_type_id;
        const result = await updateConversationDataCall(id, conversation_id, login_id, conversation_name,
          conversation_type_id);
        if (result) {
         return response.ok(result);
        }
        else {
          return response.error(400, "Error while inserting record");
        }
      }
      else {
        return response.error(500, "Request is mismatched, Id must be passed to update");
      }
    }
    else {
      return response.error(500, "Sometning wromg with request");
    }
  }
  else if (event.httpMethod === "DELETE") {
    let conversation_id = null;
    if (event.body !== null && event.body !== undefined) {
      let body = JSON.parse(event.body)
      if (body.conversation_id) {
        conversation_id = body.conversation_id;
        const result = await deleteConversationDataCall(conversation_id);;
        if (result) {
          return response.ok(result);
        }
        else {
          return response.error(400, "Error while deleting record");
        }
      }
      else {
        return response.error(500, "No conversation_id present in request");
      }
    }
    else {
      return response.error(500, "Sometning wromg with request");
    }
  }
}
/*
export async function updateConversationData(event: APIGatewayProxyEvent): Promise<any> {
  const result = await updateConversationDataCall(event.pathParameters.id, event.pathParameters.conversation_id, event.pathParameters.login_id, event.pathParameters.conversation_name,
    event.pathParameters.conversation_type_id);
  if (result) {
    response.ok(result);
  }
  else {
    return response.error(400, "Error while Updating record");
  }

}

export async function deleteConversationData(event: APIGatewayProxyEvent): Promise<any> {
  const result = await deleteConversationDataCall(event.pathParameters.conversation_id);
  if (result) {
    response.ok(result);
  }
  else {
    return response.error(400, "Error while deleting record");
  }

}*/