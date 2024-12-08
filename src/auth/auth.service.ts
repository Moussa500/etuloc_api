import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, SignInDto } from "src/dto";
import { PasswordHelper } from "src/helpers";
import { Public } from "src/isPublic";
import { User } from "src/models";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService{
    constructor(private userService: UserService, private passwordHelper: PasswordHelper, private jwtService: JwtService) { }
    async signIn(signInDto: SignInDto):Promise<{access_token:string}> {
            const user = await this.userService.findByEmail(signInDto.email);
            if (user == null) {
                throw new NotFoundException("user Not Found")
            }
            const isMatch = await this.passwordHelper.comparePassword(signInDto.password, user.password)
            if (!isMatch) {
                throw new UnauthorizedException("Wrong Password, please try again");
            }
            const { password, ...result } = user;
            const payload = { sub: result };
            return {
                access_token: await this.jwtService.signAsync(payload)
            }
    }
    async signUp(createUserDto: CreateUserDto): Promise<{ access_token: string }>{
        const user = await this.userService.findByEmail(createUserDto.email);
        if (user) {
            throw new ConflictException("User already exists")
        }
        let createdUser:User;
        if (createUserDto.student==true) {
             createdUser = await this.userService.createStudent(createUserDto);
        } else {
             createdUser = await this.userService.createOwner(createUserDto);
        }
        const { password, ...result } = createdUser;
        const playload = { sub: result };
        return {
            access_token: await this.jwtService.signAsync(playload)
        }
    }
    }
