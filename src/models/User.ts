import { Model } from 'objection';
import type { UUID } from 'node:crypto';

import BaseModel from './BaseModel.js';
import Member from './Member.js';
import toPublicUser from './toPublicUser.js';

export default class User extends BaseModel {
  username!: string;
  password_hash!: string;
  avatar_url?: string;
  bio?: string;
  display_name?: string;

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return super.mergeJsonSchema({
      required: [
        'username',
        'password_hash'
      ],
      properties: {
        username: { type: 'string' },
        password_hash: { type: [
          'string',
          'null'
        ] },
        avatar_url: { type: [
          'string',
          'null'
        ] },
        bio: { type: [
          'string',
          'null'
        ] },
        display_name: { type: [
          'string',
          'null'
        ] }
      }
    });
  }

  static get relationMappings() {
    return {
      memberships: {
        relation: Model.HasManyRelation,
        modelClass: Member,
        join: {
          from: 'users.id',
          to: 'members.user_id'
        }
      }
    };
  }

  static async createUser(username: string, passwordHash: string) {
    const user = await this
      .query()
      .insert({
        username,
        password_hash: passwordHash
      });
    return toPublicUser(user);
  }

  static async findByUsername(username: string) {
    // select full user only for signup and login
    // do not return full user to client
    return await this
      .query()
      .where('username', username)
      .first();
  }

  static async list(options: {
    limit?: number;
    offset?: number;
    q?: string;
  } = {}) {
    const limit = options.limit || 20;
    const offset = options.offset || 0;

    // query builder select without password_hash
    const qb = this.query();
    if (options.q) {
      qb
        .where('username', 'like', `%${options.q}%`)
        .orWhere('display_name', 'like', `%${options.q}%`);
    }
    qb
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', 'desc');

    const items = await qb;

    // convert all users into public users without password_hash
    const publicItems = items.map(u => toPublicUser(u));

    return {
      items: publicItems,
      limit,
      offset,
      total: items.length
    };
  }

  static async getById(id: UUID) {
    const user = await this
      .query()
      .findById(id);
    if (user) return toPublicUser(user);
  }

  static async updateById(id: UUID, data: Partial<User>) {
    const user = await this
      .query()
      .patchAndFetchById(id, data);
    return toPublicUser(user);
  }

  static async deleteById(id: UUID) {
    return await this
      .query()
      .deleteById(id);
  }

}
