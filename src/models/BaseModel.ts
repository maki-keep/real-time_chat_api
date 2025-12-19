import { Model } from 'objection';

export default class BaseModel extends Model {
  id!: string;
  created_at?: Date;
  updated_at?: Date;

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  // Helper to merge this model's jsonSchema with base json schema
  static mergeJsonSchema(schema: any) {
    const base = (this as any).__proto__.jsonSchema || {};
    return {
      type: 'object',
      required: [ ...(base.required || []), ...(schema.required || []) ],
      properties: {
        ...(base.properties || {}),
        ...(schema.properties || {})
      }
    };
  }
}
