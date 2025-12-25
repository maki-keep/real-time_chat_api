import { Model } from 'objection';
import type { UUID } from 'node:crypto';

import BaseModel from './BaseModel.js';
import User from './User.js';
import Conversation from './Conversation.js';

export default class Message extends BaseModel {
  author_id!: UUID;
  content!: string;
  conversation_id!: UUID;
  metadata?: any;

  static get tableName() {
    return 'messages';
  }

  static get jsonSchema() {
    return super.mergeJsonSchema({
      required: [
        'author_id',
        'content',
        'conversation_id'
      ],
      properties: {
        author_id: { type: 'string' },
        content: { type: 'string' },
        conversation_id: { type: 'string' },
        metadata: { type: [
          'object',
          'null'
        ] }
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

  static async createMessage(authorId: UUID, content: string, conversationId: UUID, metadata?: any) {
    return await this
      .query()
      .insert({
        author_id: authorId,
        content,
        conversation_id: conversationId,
        metadata
      });
  }

  static async listByConversation(conversationId: UUID, options: {
    limit?: number;
    offset?: number;
    by?: string;
    q?: string;
    since?: string;
  } = {}) {
    const limit = options.limit || 50;
    const offset = options.offset || 0;

    const qb = this
      .query()
      .where('conversation_id', conversationId);
    if (options.by) {
      qb.where('author_id', 'like', `%${options.by}%`);
    }
    if (options.q) {
      qb.where('content', 'like', `%${options.q}%`);
    }
    if (options.since) {
      qb.where('created_at', '>', options.since);
    }
    qb
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', 'desc');

    const items = await qb;

    return {
      items,
      limit,
      offset,
      total: items.length
    };
  }

  static async getById(id: UUID) {
    return await this
      .query()
      .findById(id);
  }

  static async updateById(id: UUID, data: Partial<Message>) {
    return await this
      .query()
      .patchAndFetchById(id, data);
  }

  static async deleteById(id: UUID) {
    return await this
      .query()
      .deleteById(id);
  }

}
