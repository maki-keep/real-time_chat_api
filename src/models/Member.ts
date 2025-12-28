import { Model } from 'objection';
import type { UUID } from 'node:crypto';

import BaseModel from './BaseModel.js';
import Conversation from './Conversation.js';
import User from './User.js';

export default class Member extends BaseModel {
  conversation_id!: UUID;
  user_id!: UUID;

  static get tableName() {
    return 'members';
  }

  static get jsonSchema() {
    return super.mergeJsonSchema({
      required: [
        'conversation_id',
        'user_id'
      ],
      properties: {
        conversation_id: { type: 'string' },
        user_id: { type: 'string' }
      }
    });
  }

  static get relationMappings() {
    return {
      conversation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Conversation,
        join: {
          from: 'members.conversation_id',
          to: 'conversations.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'members.user_id',
          to: 'users.id'
        }
      }
    };
  }

  static async addMember(conversationId: UUID, userId: UUID) {
    return await this
      .query()
      .insert({
        conversation_id: conversationId,
        user_id: userId
      });
  }

  static async listByParameter(parameter: 'conversation_id' | 'user_id', parameterId: UUID, options: {
    limit?: number;
    offset?: number;
  } = {}) {
    const limit = options.limit || 50;
    const offset = options.offset || 0;

    const qb = this
      .query()
      .where(parameter, parameterId);
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

  static async removeMember(conversationId: UUID, memberId: UUID) {
    return await this
      .query()
      .delete()
      .where('conversation_id', conversationId)
      .andWhere('id', memberId);
  }

  static async removeById(id: UUID) {
    return await this
      .query()
      .deleteById(id);
  }

}
