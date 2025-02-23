import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from 'src/model/user.model';
import { AuthResponse } from 'src/model/auth.response.model';
import { hashPassword, verifyPassword } from 'src/util/auth.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private userRepository;
  private logger = new Logger();

  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  authenticate(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.split(' ')[1];
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async registerUser(user: User){
    try {
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
      const userEntity = await this.userRepository.create(user);
      const savedEntity = await this.userRepository.save(userEntity);
      return {
        id: savedEntity.id,
        userName: savedEntity.userName
      }
    } catch (err) {
      if (err.code == 23505) {
        this.logger.error(err.message, err.stack);
        throw new HttpException('Username is not available', HttpStatus.CONFLICT);
      }
      this.logger.error(err.message, err.stack);
      throw new InternalServerErrorException(
        'Something went wrong, Try again!',
      );
    }
  }

  async loginUser(user: User): Promise<AuthResponse> {
    try {
      const userName = user.userName;
      const userEntity = await this.userRepository.findOneBy({ userName });
      if (userEntity == null) {
        throw new BadRequestException('User does not exist');
      }
      if (await verifyPassword(user.password, userEntity.password)) {
        const payload = {
          sub: user.id,
          username: user.userName,
        };
        const accessToken = this.jwtService.sign(payload);
        return new AuthResponse(accessToken, user.userName, userEntity.id);
      } else {
        throw new UnauthorizedException('The password is incorrect');
      }
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err;
      } else {
        this.logger.error(err.message, err.stack);
        throw new InternalServerErrorException(
          'Something went wrong, Try again!',
        );
      }
    }
  }
}
