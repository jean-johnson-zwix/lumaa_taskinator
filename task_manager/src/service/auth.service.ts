import {
  Injectable,
  NotFoundException,
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
  //private jwtService;
  private logger = new Logger();

  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
  }

  authenticate(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Unauthorized: No token provided');
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

  async registerUser(user: User): Promise<UserEntity> {
    try {
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
      const userEntity = await this.userRepository.create(user);
      return await this.userRepository.save(userEntity);
    } catch (err) {
      if (err.code == 23505) {
        this.logger.error(err.message, err.stack);
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
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
        throw new HttpException('User not found', 404);
      }
      if (await verifyPassword(user.password, userEntity.password)) {
        const payload = {
          sub: user.id,
          username: user.userName,
        };
        const accessToken = this.jwtService.sign(payload);
        return new AuthResponse(accessToken, user.userName, userEntity.id);
      } else {
        throw new HttpException(
          'Incorrect username or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (err) {
      this.logger.error(err.message, err.stack);
      throw new InternalServerErrorException(
        'Something went wrong, Try again!',
      );
    }
  }
}
