import { IsString, IsOptional, IsBoolean, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { Exclude } from 'class-transformer';

export class User {

    id: number;

    @IsString()
    @IsNotEmpty({ message: 'Username cannot be empty' })
    userName: string;

    @IsString()
    @MinLength(6, { message: 'Password length must exceed 6' })
    @MaxLength(20, { message: 'Password length must not exceed 20' })
    @IsNotEmpty({ message: 'Password cannot be empty' })
    password: string;
    
}