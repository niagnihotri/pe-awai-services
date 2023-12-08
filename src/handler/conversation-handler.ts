import { fetchConversationDataCall } from "../service/conversation-service";


export async function fetchConversationData(): Promise<any> {
  const response = await fetchConversationDataCall();
  return response;
}