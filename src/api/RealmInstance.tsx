import Realm from "realm";
import UsuarioType from "../models/UsuarioType";

const getRealm =async () => 
    await Realm.open({
        path: 'serraRealm',
        schema: [UsuarioType],
    })
export default getRealm;