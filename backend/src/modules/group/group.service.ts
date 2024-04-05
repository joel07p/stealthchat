import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authentication } from 'src/auth/authentication.entity';
import { Repository } from 'typeorm';
import { UserRole } from '../user/user-role.enum';
import { User } from '../user/user.entity';
import { GroupType } from './group-type.enum';
import { CreateGroupDTO } from './group.dto';
import { Group } from './group.entity';
import { UserOnGroups } from './user-on-group.entity';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group) private groupRepository: Repository<Group>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(UserOnGroups) private userOnGroupsRepository: Repository<UserOnGroups>,
        @InjectRepository(Authentication) private authenticationRepository: Repository<Authentication>
    ) {}

    async createGroup(data: CreateGroupDTO) {
        const { name, description, users } = data

        const type = users.length < 2 ? GroupType.SINGLE : GroupType.MULTI

        const group = new Group(name, description, type)

        for (const identityCode of users) {
            const authentication = await this.authenticationRepository.findOne({
                where: {
                    identityCode
                },
                relations: ['user']
            });
            if (authentication) {
              const newUserOnGroups = this.userOnGroupsRepository.create({
                user: authentication.user,
                group,
                role: UserRole.ADMIN
              });
              await this.userOnGroupsRepository.save(newUserOnGroups);
            } else {
                throw new BadRequestException()
            }
        }
    }
}
