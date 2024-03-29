import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as humps from 'humps';
import { PrismaService } from 'src/prisma.service';
import { ChangePasswordStatusDef } from 'src/utils/const';
import {
  ChangePasswordInput,
  ChangePasswordResponse,
  User,
  UserGroupByDivision,
  UserKey,
  UserLoginInput,
  UserLoginResponse,
  UserUpsert,
  UserUpsertResponse,
} from './user.model';

const SALT_ROUNDS = 10;
@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findUnique(userId: number): Promise<User> {
    const data = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(data);
    console.log(humps.camelizeKeys(data));
    return humps.camelizeKeys(data) as User;
  }

  async findManyroupBy(): Promise<User[][]> {
    const data = await this.prisma.users.findMany({});

    const result = data.reduce((acc, curr) => {
      const { division } = curr;
      return {
        ...acc,
        [division]: [
          ...(acc[division] || []),
          humps.camelizeKeys(curr) as User,
        ],
      };
    }, {} as UserGroupByDivision);
    return Object.values(result);
  }

  /**
   * ユーザー登録・編集
   */
  async update(userInput: UserUpsert): Promise<UserUpsertResponse> {
    // パスワード生成
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    // パスワードがリクエストに含まれない場合は更新しないようにundefined
    const hash = userInput.password
      ? bcrypt.hashSync(userInput.password, salt)
      : undefined;

    const columnMapping = {
      given_name: userInput.givenName,
      family_name: userInput.familyName,
      given_kana: userInput.givenKana,
      family_kana: userInput.familyKana,
      email: userInput.email,
      password: hash,
      division: userInput.division,
      position: userInput.position,
      icon_path: userInput.iconPath,
      icon_name: userInput.iconName,
      description: userInput.description,
      theme: userInput.theme,
      is_admin:
        userInput.isAdmin === true
          ? 1
          : userInput.isAdmin == null
          ? undefined
          : 0,

      is_stop:
        userInput.isStop === true
          ? 1
          : userInput.isStop == null
          ? undefined
          : 0,
      last_update: new Date(),
    };

    const data = await this.prisma.users.update({
      where: {
        id: userInput.id,
        // email: userInput.email,
      },
      data: {
        ...columnMapping,
      },
      // create: { ...columnMapping },
    });

    return { id: data.id, email: data.email, password: data.password };
  }

  async create(userInput: UserUpsert): Promise<UserKey> {
    // パスワード生成
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(userInput.password, salt);

    const columnMapping = {
      given_name: userInput.givenName,
      family_name: userInput.familyName,
      given_kana: userInput.givenKana,
      family_kana: userInput.familyKana,
      email: userInput.email,
      password: hash,
      division: userInput.division,
      position: userInput.position,
      icon_path: userInput.iconPath,
      icon_name: userInput.iconName,
      description: userInput.description,
      theme: userInput.theme,
      is_admin: userInput.isAdmin === true ? 1 : 0,
      is_stop: userInput.isStop === true ? 1 : 0,
      last_update: new Date(),
    };

    const data = await this.prisma.users.create({
      data: columnMapping,
      select: {
        id: true,
      },
    });

    return { id: data.id };
  }

  async delete(userId: number): Promise<UserKey> {
    const data = await this.prisma.users.delete({
      where: {
        id: userId,
      },
    });
    return { id: data.id };
  }

  /** ユーザーログイン */
  async login({ email, password }: UserLoginInput): Promise<UserLoginResponse> {
    const user = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    console.log('email, password: ', email, password);
    console.log('user: ', user);

    if (!user) {
      throw new Error('ユーザー情報が間違っています。');
    }

    const compared = await bcrypt.compare(password, user.password);

    console.log('compared: ', compared);

    if (!compared) {
      throw new Error('ユーザー情報が間違っています。');
    }

    return {
      userId: user.id,
      email: user.email,
      isAdmin: Boolean(user.is_admin),
      iconPath: user.icon_path,
      iconName: user.icon_name,
    };
  }

  /** パスワード変更 */
  async changePassword({
    email,
    currentPassword,
    newPassword,
  }: ChangePasswordInput): Promise<ChangePasswordResponse> {
    // 前のパスワードと新パスワードが同じ場合
    const isSamePassword = await bcrypt.compare(newPassword, currentPassword);
    if (isSamePassword) {
      return { userId: 0, status: ChangePasswordStatusDef.ng };
    }

    const user = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    const compared = await bcrypt.compare(currentPassword, user.password);

    if (!compared) {
      return {
        userId: 0,
        status: ChangePasswordStatusDef.ng,
      };
    }

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);

    const hash = bcrypt.hashSync(newPassword, salt);
    const result = await this.prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
      },
    });

    return {
      userId: result.id,
      status: ChangePasswordStatusDef.ok,
    };
  }
}
