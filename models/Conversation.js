const BaseModel = require('./BaseModel');

class Conversation extends BaseModel {
  static get tableName() {
    return 'conversations';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        is_private: { type: 'boolean' }
      }
    };
  }

  static get relationMappings() {
    const Message = require('./Message');
    const Member = require('./Member');
    const User = require('./User');

    return {
      messages: {
        relation: BaseModel.HasManyRelation || BaseModel.HasManyRelation,
        modelClass: Message,
        join: {
          from: 'conversations.id',
          to: 'messages.conversation_id'
        }
      },
      members: {
        relation: BaseModel.ManyToManyRelation || BaseModel.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'conversations.id',
          through: {
            from: 'conversation_members.conversation_id',
            to: 'conversation_members.user_id'
          },
          to: 'users.id'
        }
      },
      membershipRows: {
        relation: BaseModel.HasManyRelation || BaseModel.HasManyRelation,
        modelClass: Member,
        join: {
          from: 'conversations.id',
          to: 'members.conversation_id'
        }
      }
    };
  }
}

module.exports = Conversation;
