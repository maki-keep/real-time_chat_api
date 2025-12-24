import { Model } from 'objection';
import type { UUID } from 'node:crypto';

import BaseModel from './BaseModel.ts';
import Conversation from './Conversation.ts';

export default class Role extends BaseModel {
  conversation_id!: UUID;
  rolename!: string;

  static get tableName() {
    return 'roles';
  }

  static get jsonSchema() {
    return super.mergeJsonSchema({
      required: [
        'conversation_id',
        'rolename'
      ],
      properties: {
        conversation_id: { type: 'string' },
        rolename: { type: 'string' }
      }
    });
  }

  static get relationMappings() {
    return {
      conversation: {
        relation: Model.BelongsToOneRelation,
        modelClass: Conversation,
        join: {
          from: 'roles.conversation_id',
          to: 'conversations.id'
        }
      }
    };
  }

  static async createRole(conversationId: UUID, rolename: string) {
    return await this
      .query()
      .insert({
        conversation_id: conversationId,
        rolename
      });
  }

  static async listByConversation(conversationId: UUID) {
    const items = await this
      .query()
      .where('conversation_id', conversationId)
      .orderBy('rolename', 'asc');
    return {
      items,
      total: items.length
    };
  }

  static async getById(id: UUID) {
    return await this
      .query()
      .findById(id);
  }

  static async deleteById(id: UUID) {
    return await this
      .query()
      .deleteById(id);
  }

}
