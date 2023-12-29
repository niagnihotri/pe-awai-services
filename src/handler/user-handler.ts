import { fetchUesrDataCall , fetchUserSpecificDataCall , insertUserDataCall , updateUserDataCall , deleteUserDataCall  } from "../service/user-service";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import response from "../utils/response";



export async function getUesrData(): Promise<any> {
  const response = await fetchUesrDataCall();
  return response;
}


export async function getUserSpecificData(event: APIGatewayProxyEvent): Promise<any> {
    const result = await fetchUserSpecificDataCall(event.pathParameters.login_id);
    return response.ok(result);
  }
  
  
  export async function postUserData( event: APIGatewayProxyEvent): Promise<any> {
    const result = await insertUserDataCall(event.pathParameters.username, event.pathParameters.email);
      if(result){
        response.ok("Saved successfully");
      }
      else{
        return response.error(400,"Error while inserting record");
      }
      
  }
  
  export async function updateUserData(event: APIGatewayProxyEvent): Promise<any> {
    const result = await updateUserDataCall(event.pathParameters.id,event.pathParameters.username, event.pathParameters.email);
      if(result){
        response.ok(result);
      }
      else{
        return response.error(400,"Error while Updating record");
      }
      
  }
  
  export async function deleteUserData(event: APIGatewayProxyEvent): Promise<any> {
    const result = await deleteUserDataCall(event.pathParameters.login_id);
    if(result){
      response.ok(result);
    }
    else{
      return response.error(400,"Error while deleting record");
    }
    
  }