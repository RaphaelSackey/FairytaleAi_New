import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function verifyPassword(plainPassword:string, hashedPassword:string) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}