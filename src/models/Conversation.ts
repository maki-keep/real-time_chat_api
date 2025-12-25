import { Model } from 'objection';
import type { UUID } from 'node:crypto';

import BaseModel from './BaseModel.js';
import Member from './Member.js';
import Role from './Role.js';

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
      members: {
        relation: Model.HasManyRelation,
        modelClass: Member,
        join: {
          from: 'conversations.id',
          to: 'members.conversation_id'
        }
      },
      roles: {
        relation: Model.HasManyRelation,
        modelClass: Role,
        join: {
          from: 'conversations.id',
          to: 'roles.conversation_id'
        }
      }
    };
  }

  static async createConversation(title: string, isPrivate = false) {
    return await this
      .query()
      .insert({
        title,
        is_private: isPrivate
      });
  }

  static async list(options: {
    limit?: number;
    offset?: number;
    q?: string;
  } = {}) {
    const limit = options.limit || 20;
    const offset = options.offset || 0;
    
    const qb = this.query();
    if (options.q) {
      qb.where('title', 'like', `%${options.q}%`);
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

  static async updateById(id: UUID, data: Partial<Conversation>) {
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
