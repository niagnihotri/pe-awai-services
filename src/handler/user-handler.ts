import { getAllUesrsCall, getUserByLoginIdCall, fetchUserByEmailCall, insertUserDataCall, updateUserDataCall, deleteUserDataCall } from "../service/user-service";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import response from "../utils/response";
import { User } from "../entities/user";



export async function findAllUesrs(): Promise<any> {
  const result = await getAllUesrsCall();
  return response.ok(result);
}


export async function findUserByLoginId(event: APIGatewayProxyEvent): Promise<any> {
  let login_id = null;
  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    if (body.login_id)
      login_id = body.login_id;
    const result = await getUserByLoginIdCall(login_id);
    return response.ok(result);
  }
  else {
    return response.error(500, "Somethning wromg with request");
  }


}

export async function findUserByEmail(event: APIGatewayProxyEvent): Promise<any> {

  let email = null;
  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    if (body.email)
      email = body.email;
      const result = await fetchUserByEmailCall(email);
      
      return response.ok(result);
  }
  else {
    return response.error(500, "Something wromg with request");
  }

}


export async function userData(event: APIGatewayProxyEvent): Promise<any> {
if(event.httpMethod==="POST"){
  let username =null;
  let email= null;
  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    if (body.username && body.email){
    username = body.username;
    email = body.email
    }
    else{
      return response.error(400, "No required informain in request");
    }
      const result = await insertUserDataCall(username, email);
      if (result) {
        return response.ok("Saved successfully");
      }
      else {
        return response.error(400, "Error while inserting record");
      }
  }
    else {
    return response.error(500, "Something wromg with request");
  }
}
else if(event.httpMethod==="PUT"){
  let id=null;
  let username =null;
  let email= null;
  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    if (body.id){
    id=body.id;
    username = body.username;
    email = body.email
    }
    else{
      return response.error(400, "No required informain in request");
    }
    const result = await updateUserDataCall(id, username, email);

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
else if(event.httpMethod==="DELETE"){
  let login_id=null;
  if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    if (body.login_id){
      login_id=body.login_id
    }
    else{
      return response.error(400, "No Id value in request");
    }
    const result = await deleteUserDataCall(login_id);

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

}

/*
export async function updateUserData(event: APIGatewayProxyEvent): Promise<any> {
  const result = await updateUserDataCall(event.pathParameters.id, event.pathParameters.username, event.pathParameters.email);
  if (result) {
    return response.ok(result);
  }
  else {
    return response.error(400, "Error while Updating record");
  }

}

export async function deleteUserData(event: APIGatewayProxyEvent): Promise<any> {
  const result = await deleteUserDataCall(event.pathParameters.login_id);
  if (result) {
    return response.ok(result);
  }
  else {
    return response.error(400, "Error while deleting record");
  }

}
*/
