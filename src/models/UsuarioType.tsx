import { ObjectSchema } from "realm";

const UsuarioType: ObjectSchema = {
  name: 'Usuario',
  properties: {
    _id: 'int',
    email: 'string',
    expiration: 'date'
  },
  primaryKey: 'id',
};

export default UsuarioType;