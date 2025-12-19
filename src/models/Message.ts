import { Model } from 'objection';
import BaseModel from './BaseModel.ts';
import User from './User.ts';
import Conversation from './Conversation.ts';

export default class Message extends BaseModel {
  conversation_id!: string;
  author_id!: string;
  content!: string;
  metadata?: any;

  static get tableName() {
    return 'messages';
  }

  static get jsonSchema() {
    return super.mergeJsonSchema({
      required: ['content', 'conversation_id'],
      properties: {
        conversation_id: { type: 'string' },
        author_id: { type: 'string' },
        content: { type: 'string' },
        metadata: { type: ['object', 'null'] }
      }
    });
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'messages.author_id',
          to: 'users.id'
        }
      },
      conversation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Conversation,
        join: {
          from: 'messages.conversation_id',
          to: 'conversations.id'
        }
      }
    };
  }

  static async createMessage(conversationId: string, authorId: string, content: string, metadata?: any) {
    const message: any = await this.query().insert({
      conversation_id: conversationId,
      author_id: authorId,
      content,
      metadata
    });
    return message;
  }

  static async getById(id: string) {
    return await this.query().findById(id);
  }

  static async updateById(id: string, data: Partial<Message>) {
    return await this.query().patchAndFetchById(id, data);
  }

  static async deleteById(id: string) {
    return await this.query().deleteById(id);
  }

  static async listByConversation(conversationId: string, options: { limit?: number; offset?: number; since?: string } = {}) {
    const limit = options.limit || 50;
    const offset = options.offset || 0;
    const qb = this.query().where('conversation_id', conversationId).orderBy('created_at', 'asc').limit(limit).offset(offset);
    if (options.since) qb.where('created_at', '>', options.since);
    const items = await qb;
    return { items, limit, offset, total: items.length };
  }

}
