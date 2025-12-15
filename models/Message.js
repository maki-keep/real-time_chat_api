const BaseModel = require('./BaseModel');

class Message extends BaseModel {
  static get tableName() {
    return 'messages';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['content', 'conversation_id'],
      properties: {
        id: { type: 'string' },
        conversation_id: { type: 'string' },
        author_id: { type: 'string' },
        content: { type: 'string' },
        metadata: { type: ['object', 'null'] }
      }
    };
  }

  static get relationMappings() {
    const User = require('./User');
    const Conversation = require('./Conversation');

    return {
      author: {
        relation: BaseModel.BelongsToOneRelation || BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'messages.author_id',
          to: 'users.id'
        }
      },
      conversation: {
        relation: BaseModel.BelongsToOneRelation || BaseModel.BelongsToOneRelation,
        modelClass: Conversation,
        join: {
          from: 'messages.conversation_id',
          to: 'conversations.id'
        }
      }
    };
  }
}

module.exports = Message;
