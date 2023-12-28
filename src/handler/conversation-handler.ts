import { fetchConversationDataCall , fetchConversationSpecificDataCall, insertConversationDataCall , updateConversationDataCall , deleteConversationDataCall } from "../service/conversation-service";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import response from "../utils/response";

export async function getConversationData(): Promise<any> {
  const result = await fetchConversationDataCall();
  return response.ok(result);
}


export async function getConversationSpecificData(event: APIGatewayProxyEvent): Promise<any> {
  const result = await fetchConversationSpecificDataCall(event.pathParameters.conversation_id);
  return response.ok(result);
}


export async function postConversationData( event: APIGatewayProxyEvent): Promise<any> {
  const result = await insertConversationDataCall(event.pathParameters.login_id, event.pathParameters.conversation_name,
    event.pathParameters.conversation_type_id);
    if(result){
      response.ok(result);
    }
    else{
      return response.error(400,"Error while inserting record");
    }
    
}

export async function updateConversationData(event: APIGatewayProxyEvent): Promise<any> {
  const result = await updateConversationDataCall(event.pathParameters.id,event.pathParameters.conversation_id,event.pathParameters.login_id, event.pathParameters.conversation_name,
    event.pathParameters.conversation_type_id);
    if(result){
      response.ok(result);
    }
    else{
      return response.error(400,"Error while Updating record");
    }
    
}

export async function deleteConversationData(event: APIGatewayProxyEvent): Promise<any> {
  const result = await deleteConversationDataCall(event.pathParameters.conversation_id);
  if(result){
    response.ok(result);
  }
  else{
    return response.error(400,"Error while deleting record");
  }
  
}