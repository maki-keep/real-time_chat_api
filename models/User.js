const BaseModel = require('./BaseModel');

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username'],
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        password_hash: { type: ['string', 'null'] },
        avatar_url: { type: ['string', 'null'] },
        bio: { type: ['string', 'null'] },
        display_name: { type: ['string', 'null'] }
      }
    };
  }

  static get relationMappings() {
    const Message = require('./Message');
    const Member = require('./Member');

    return {
      messages: {
        relation: BaseModel.HasManyRelation || BaseModel.HasManyRelation,
        modelClass: Message,
        join: {
          from: 'users.id',
          to: 'messages.author_id'
        }
      },
      memberships: {
        relation: BaseModel.HasManyRelation || BaseModel.HasManyRelation,
        modelClass: Member,
        join: {
          from: 'users.id',
          to: 'members.user_id'
        }
      }
    };
  }
}

module.exports = User;
