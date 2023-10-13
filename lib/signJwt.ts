import * as jose from 'jose'

const signJwt = async({email}:{email:any}) => {
    const alg="HS256";
    const secret=new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
    
    const token=await new jose.SignJWT({email}).setProtectedHeader({alg}).setExpirationTime("24h").sign(secret);
    return token
}

export default signJwt