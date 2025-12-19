import BaseModel from './BaseModel.ts';

export default class Role extends BaseModel {
  rolename!: string;

  static get tableName() {
    return 'roles';
  }

  static get jsonSchema() {
    return super.mergeJsonSchema({
      required: ['rolename'],
      properties: {
        rolename: { type: 'string' }
      }
    });
  }

  static async createRole(rolename: string) {
    return await this.query().insert({ rolename });
  }

  static async getById(id: string) {
    return await this.query().findById(id);
  }

  static async list() {
    const items = await this.query().orderBy('rolename', 'asc');
    return { items, total: items.length };
  }
}
