import { UserEntity } from './domain/user.entity';
import { Injectable } from '@nestjs/common';
import { UserResponse } from './dto/response/user.response';
import { User } from '@prisma/client';
import { Gender, UserRoles } from './domain/user.types';
import { Passports } from '@app/common/presentations/enums/passport.enum';
import { Mapper } from '@app/common/ddd/base';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class UserMapper
  implements Mapper<UserEntity, User, UserResponse>
{
  toPersistence(entity: UserEntity): User {
    const copy = entity.getProps();
    const record: User = {
      ...copy,
      accessedAt: undefined,
      isDeleted: false
    };
    return record;
  }

  toDomain(record: User): UserEntity {
    const entity = new UserEntity({
      id: record.id.toString(),
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        ...record,
        role: record.role as UserRoles,
        type: record.type as Passports,
        gender: record.gender as Gender
      },
    });
    return entity;
  }

  toResponse(entity: UserEntity): UserResponse {
    const props = entity.getProps();
    const response = new UserResponse(entity);
    response.email = props.email;
    // response.country = props.address.country;
    // response.postalCode = props.address.postalCode;
    // response.street = props.address.street;
    return response;
  }

  /* ^ Data returned to the user is whitelisted to avoid leaks.
     If a new property is added, like password or a
     credit card number, it won't be returned
     unless you specifically allow this.
     (avoid blacklisting, which will return everything
      but blacklisted items, which can lead to a data leak).
  */
}
