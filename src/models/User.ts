import { Model } from 'objection';
import BaseModel from './BaseModel.ts';
import Message from './Message.ts';
import Member from './Member.ts';

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
      required: ['username', 'password_hash'],
      properties: {
        username: { type: 'string' },
        password_hash: { type: ['string', 'null'] },
        avatar_url: { type: ['string', 'null'] },
        bio: { type: ['string', 'null'] },
        display_name: { type: ['string', 'null'] }
      }
    });
  }

  static get relationMappings() {
    return {
      messages: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: 'users.id',
          to: 'messages.author_id'
        }
      },
      members: {
        relation: Model.HasManyRelation,
        modelClass: Member,
        join: {
          from: 'users.id',
          to: 'members.user_id'
        }
      }
    };
  }

  static async createUser(username: string, passwordHash: string, additionalData: { avatar_url?: string; bio?: string; display_name?: string; } | undefined) {
    const inserted: any = await this.query().insert({
      username,
      password_hash: passwordHash,
      ...additionalData
    });
    if (inserted && inserted.password_hash) delete inserted.password_hash;
    return inserted;
  }

  static async getById(id: string): Promise<User | undefined> {
    return await this.query().findById(id).select('id', 'username', 'avatar_url', 'bio', 'display_name', 'created_at', 'updated_at');
  }

  static async updateById(id: string, data: Partial<User>): Promise<User | undefined> {
    const updated: any = await this.query().patchAndFetchById(id, data);
    if (updated && updated.password_hash) delete updated.password_hash;
    return updated;
  }

  static async deleteById(id: string) {
    return await this.query().deleteById(id);
  }

  static async list(options: { limit?: number; offset?: number; q?: string } = {}) {
    const limit = options.limit || 20;
    const offset = options.offset || 0;
    const q = options.q;

    const qb = this.query().select('id', 'username', 'avatar_url', 'bio', 'display_name', 'created_at', 'updated_at');
    if (q) qb.where('username', 'like', `%${q}%`).orWhere('display_name', 'like', `%${q}%`);
    qb.limit(limit).offset(offset).orderBy('created_at', 'desc');

    const items = await qb;
    return { items, limit, offset, total: items.length };
  }

  static async findByUsername(username: string): Promise<User | undefined> {
    return await this.query()
      .where('username', username)
      .select('id', 'username', 'avatar_url', 'bio', 'display_name', 'created_at', 'updated_at')
      .first();
  }
}
