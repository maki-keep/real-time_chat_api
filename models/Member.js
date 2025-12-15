const BaseModel = require('./BaseModel');

class Member extends BaseModel {
  static get tableName() {
    return 'members';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['conversation_id', 'user_id'],
      properties: {
        id: { type: 'string' },
        conversation_id: { type: 'string' },
        user_id: { type: 'string' },
        role_id: { type: ['string', 'null'] }
      }
    };
  }

  static get relationMappings() {
    const User = require('./User');
    const Conversation = require('./Conversation');
    const Role = require('./Role');

    return {
      user: {
        relation: BaseModel.BelongsToOneRelation || BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'conversation_members.user_id',
          to: 'users.id'
        }
      },
      conversation: {
        relation: BaseModel.BelongsToOneRelation || BaseModel.BelongsToOneRelation,
        modelClass: Conversation,
        join: {
          from: 'conversation_members.conversation_id',
          to: 'conversations.id'
        }
      },
      role: {
        relation: BaseModel.BelongsToOneRelation || BaseModel.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'conversation_members.role_id',
          to: 'roles.id'
        }
      }
    };
  }
}

module.exports = Member;
