const BaseModel = require('./BaseModel');

class Role extends BaseModel {
  static get tableName() {
    return 'roles';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['rolename'],
      properties: {
        id: { type: 'string' },
        rolename: { type: 'string' }
      }
    };
  }
}

module.exports = Role;
