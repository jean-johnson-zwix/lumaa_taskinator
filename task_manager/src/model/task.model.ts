import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class Task {
  constructor(
    id: number,
    title: string,
    description: string,
    isComplete: boolean,
    userName: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isComplete = isComplete;
    this.userName = userName;
  }

  id: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  isComplete: boolean;

  @IsString()
  @IsOptional()
  userName: string;
}
