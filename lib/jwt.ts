import jwt, {JwtPayload} from "jsonwebtoken";

interface signOption{
    expiresIn?:string|number;
}

const DEFAULT_SIGN_OPTION:signOption={
    expiresIn:"1h",
};

export function signJwtAccessToken(payload:JwtPayload,options:signOption=DEFAULT_SIGN_OPTION){
    const secret_key=process.env.NEXTAUTH_SECRET;
    const token=jwt.sign(payload,secret_key,options);
    return token;
}

export function verifyJwt(token:string){
    try {
        const secret_key=process.env.NEXTAUTH_SECRET;
        const decoded=jwt.verify(token,secret_key);
        return decoded as JwtPayload;
    } catch (error) {
        console.log(error);
        return null;
    }
}