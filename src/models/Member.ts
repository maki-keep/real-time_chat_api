import { Model } from 'objection';
import BaseModel from './BaseModel.ts';
import User from './User.ts';
import Conversation from './Conversation.ts';
import Role from './Role.ts';

export default class Member extends BaseModel {
  conversation_id!: string;
  user_id!: string;
  role_id?: string | null;

  static get tableName() {
    return 'members';
  }

  static get jsonSchema() {
    return super.mergeJsonSchema({
      required: ['conversation_id', 'user_id'],
      properties: {
        conversation_id: { type: 'string' },
        user_id: { type: 'string' },
        role_id: { type: ['string', 'null'] }
      }
    });
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'conversation_members.user_id',
          to: 'users.id'
        }
      },
      conversation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Conversation,
        join: {
          from: 'conversation_members.conversation_id',
          to: 'conversations.id'
        }
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'conversation_members.role_id',
          to: 'roles.id'
        }
      }
    };
  }

  static async addMember(conversationId: string, userId: string, roleId?: string | null) {
    return await this.query().insert({ conversation_id: conversationId, user_id: userId, role_id: roleId });
  }

  static async removeById(id: string) {
    return await this.query().deleteById(id);
  }

  static async getById(id: string) {
    return await this.query().findById(id);
  }

  static async listByConversation(conversationId: string) {
    const items = await this.query().where('conversation_id', conversationId);
    return { items, total: items.length };
  }

}
