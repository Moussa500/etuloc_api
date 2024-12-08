import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PasswordHelper{
    async hashPassword(password: string):Promise<string> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    async comparePassword(password:string,hash:string):Promise<Boolean> {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
}