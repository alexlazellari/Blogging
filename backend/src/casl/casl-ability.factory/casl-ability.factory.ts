import { Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { Article } from 'src/articles/entities/article.entity';
import { User } from 'src/users/entities/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: { username: string; id: number }) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    can(Action.Read, 'all');
    can(Action.Create, Article);
    can(Action.Update, Article, { userId: user.id });
    cannot(Action.Delete, Article, { userId: user.id });

    return build();
  }
}
