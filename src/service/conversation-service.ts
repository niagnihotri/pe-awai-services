import { createPool, Pool} from 'mysql';
import { DATA_SOURCES } from  '../utils/vars';
import { execute } from "../utils/mysql_connector";
import {ConversationModel} from "../model/conversation-model"
import { ConversationQueries } from "../utils/ConversationQueries";
const dataSource = DATA_SOURCES.mySqlDataSource;

let pool: Pool;

/**
 * generates pool connection to be used throughout the app
 */
export async function fetchConversationDataCall(): Promise<any>{
    return execute<[]>(ConversationQueries.GetConversation, []);
}
