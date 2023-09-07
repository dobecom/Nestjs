import { UserEntity } from './domain/user.entity';
import { Injectable } from '@nestjs/common';
import { UserResponse } from './dto/response/user.response';
import { User } from '@prisma/client';
import { Mapper } from '@app/common/ddd';
import { UserRoles } from './domain/user.types';

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
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      email: copy.email,
      // country: copy.address.country,
      // postalCode: copy.address.postalCode,
      // street: copy.address.street,
      role: copy.role,
      type: '',
      hash: '',
      name: '',
      gender: '',
      age: 0,
      phone: '',
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
        name: record.name,
        email: record.email,
        role: record.role as UserRoles,
        // address: new Address({
        //   street: record.street,
        //   postalCode: record.postalCode,
        //   country: record.country,
        // }),
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
