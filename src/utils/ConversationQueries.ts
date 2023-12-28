export const ConversationQueries = {
    GetConversation: `
    SELECT Id, conversation_id, login_id, conversation_name, conversation_type_id, conversation_time, createdTimeStamp, updatedTimestamp
FROM awai.Conversation `,
  
    GetConversationById: `
    SELECT Id, conversation_id, login_id, conversation_name, conversation_type_id, conversation_time, createdTimeStamp, updatedTimestamp
FROM awai.Conversation as t
    WHERE
    conversation_id = ?
    `,
  
    AddConversationm: `
    INSERT INTO teams_system.teams (name, league, isActive)
      VALUES (?, ?, true);
    `,
  
    UpdateConversationById: `
    UPDATE teams_system.teams
    SET name = ?,
        league = ?
    WHERE
      id = ?
    `,
  
    DeleteConversationById: `
    UPDATE teams_system.teams
    SET isActive = false
    WHERE
      id = ?
    `
  };