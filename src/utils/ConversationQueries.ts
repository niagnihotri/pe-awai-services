export const ConversationQueries = {
    GetConversation: `
    SELECT conversation_id, login_id, conversation_name, conversation_time, conversation_text
FROM awai.ConversationDetails;

    `,
  
    GetConversationById: `
    SELECT conversation_id, login_id, conversation_name, conversation_time, conversation_text
FROM awai.ConversationDetails as t
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