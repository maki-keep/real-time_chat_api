import { Model } from 'objection';
import BaseModel from './BaseModel.ts';
import Message from './Message.ts';
import Member from './Member.ts';
import User from './User.ts';

export default class Conversation extends BaseModel {
  title!: string;
  is_private?: boolean;

  static get tableName() {
    return 'conversations';
  }

  static get jsonSchema() {
    return super.mergeJsonSchema({
      required: ['title'],
      properties: {
        title: { type: 'string' },
        is_private: { type: 'boolean' }
      }
    });
  }

  static get relationMappings() {
    return {
      messages: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: 'conversations.id',
          to: 'messages.conversation_id'
        }
      },
      members: {
        relation: Model.ManyToManyRelation,
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
        relation: Model.HasManyRelation,
        modelClass: Member,
        join: {
          from: 'conversations.id',
          to: 'members.conversation_id'
        }
      }
    };
  }

  static async createConversation(title: string, isPrivate = false) {
    return await this.query().insert({ title, is_private: isPrivate });
  }

  static async getById(id: string) {
    return await this.query().findById(id);
  }

  static async updateById(id: string, data: Partial<Conversation>) {
    return await this.query().patchAndFetchById(id, data);
  }

  static async deleteById(id: string) {
    return await this.query().deleteById(id);
  }

  static async list(options: { limit?: number; offset?: number } = {}) {
    const limit = options.limit || 20;
    const offset = options.offset || 0;
    const items = await this.query().limit(limit).offset(offset).orderBy('created_at', 'desc');
    return { items, limit, offset, total: items.length };
  }

}
