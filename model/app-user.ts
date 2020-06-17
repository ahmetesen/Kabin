import { firestore } from "firebase";

type AppUser = {
    dName:string;
    uid:string;
    about?:string;
    block?:string[];
    firm:firestore.DocumentReference;
    mail:string;
    verified:boolean;
    locked?:boolean;
    rooms?:firestore.DocumentReference[];
};

export default AppUser;