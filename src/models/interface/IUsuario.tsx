import { ObjectSchema } from "realm";

export interface IUsuario {
    _id: number;
    email: string;
    expiration: Date;
    token: string;
}

export type IUsuarioObject = IUsuario & Realm.Object;