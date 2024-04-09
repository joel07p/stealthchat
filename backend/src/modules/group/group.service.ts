import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authentication } from 'src/auth/authentication.entity';
import { Repository } from 'typeorm';
import { UserRole } from '../user/user-role.enum';
import { User } from '../user/user.entity';
import { GroupType } from './group-type.enum';
import { CreateGroupDTO, JoinGroupDTO, LeaveGroupDTO } from './group.dto';
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

    async getGroups(user: any) {
        const thisUser = await this.userRepository.findOne({ where: {id: user.sub}, relations: ['authentication'] })

        const groups = await this.groupRepository
            .createQueryBuilder('group')
            .innerJoinAndSelect(UserOnGroups, 'userOnGroups', 'userOnGroups.groupId = group.id')
            .where('userOnGroups.userId = :userId', { userId: thisUser.id })
            .getMany()
        
        const transformedGroups = await Promise.all(groups.map(async group => {
            const thisUserOnGroup = await this.userOnGroupsRepository.findOne({
                where: {
                    user: {
                        id: thisUser.id
                    },
                    group: {
                        id: group.id
                    }
                }
            })
    
            return {
                id: group.id,
                name: group.name,
                type: group.type,
                role: thisUserOnGroup ? thisUserOnGroup.role : null,
                users: 0,//group.userOnGroups.length,
                rooms: 0//group.userOnGroups.length,
            };
        }))

        return transformedGroups
    }
    //make save to bad data
    async createGroup(user: any, data: CreateGroupDTO) {
        const thisUser = await this.userRepository.findOne({ where: {id: user.sub}, relations: ['authentication'] })

        const { name, description, users } = data

        const type = users.length < 3 ? GroupType.SINGLE : GroupType.MULTI

        const group = new Group(name, description, type)

        await this.groupRepository.save(group)

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
                throw new BadRequestException("No auth found")
            }
        }

        const group1 = await this.groupRepository.findOne({where: {id: group.id}})
        console.log(group1)

        console.log(thisUser.id)

        const thisUserOnGroup = await this.userOnGroupsRepository.findOne({
            where: {
                user: {
                    id: thisUser.id
                },
                group: {
                    id: group1.id
                }
            }
        })

        console.log(thisUserOnGroup)

        return {
            id: group.id,
            name: group.name,
            type: group.type,
            role: thisUserOnGroup.role,
            users: 0,
            rooms: 0
        }
    }

    async joinGroup(user: any, data: JoinGroupDTO) {
        const { joinCode } = data

        const group = await this.groupRepository.findOne({
            where: {
                joinCode
            }
        })

        if(!group) throw new BadRequestException("Invalid join code")

        const userOnGroup = await this.userOnGroupsRepository.create({
            user,
            group,
            role: UserRole.USER
        })

        await this.userOnGroupsRepository.save(userOnGroup)
    }

    async leaveGroup(user: any, data: LeaveGroupDTO) {
        const { groupId } = data

        const group = await this.groupRepository.findOne({
            where: {
                id: groupId
            }
        })

        if(!group) throw new NotFoundException("Group not found")

        const userOnGroup = await this.userOnGroupsRepository.findOne({
            where: {
                user,
                group
            }
        })

        if(!userOnGroup) throw new NotFoundException("Relation not found")

        await this.userOnGroupsRepository.remove(userOnGroup)
    }
}