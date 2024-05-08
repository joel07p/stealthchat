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
import { UserService } from '../user/user.service';
import { log } from 'console';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group) private groupRepository: Repository<Group>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(UserOnGroups) private userOnGroupsRepository: Repository<UserOnGroups>,
        @InjectRepository(Authentication) private authenticationRepository: Repository<Authentication>,
        private readonly userService: UserService
    ) {}

    async getGroups(user: any) {
        const thisUser = await this.userService.getUserProperty(user.sub, null)

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
    async createGroup(userId: string, data: CreateGroupDTO) {
        const thisUser = await this.userRepository.findOne({ where: {id: userId}, relations: ['authentication'] })

        const { name, description, users } = data
        log(users)

        if(thisUser) users.push(thisUser.authentication.getIdentityCode())

        const type = users.length < 3 ? GroupType.SINGLE : GroupType.MULTI
        const joinCode = await this.generateJoinCode()

        const group = new Group(name, description, type, joinCode)

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
                role: identityCode === thisUser.authentication.getIdentityCode() ? UserRole.ADMIN : UserRole.USER
              });
              await this.userOnGroupsRepository.save(newUserOnGroups);
            } else {
                throw new BadRequestException("No auth found")
            }
        }

        const group1 = await this.groupRepository.findOne({where: {id: group.id}})

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

    async joinGroup(userId: string, data: JoinGroupDTO) {   
        const thisUser = await this.getUser(userId)
        const { joinCode } = data
        console.log(joinCode)

        const group = await this.groupRepository.findOne({
            where: {
                joinCode
            }
        })

        if(!group) throw new BadRequestException("Invalid join code")

        const userOnGroup = await this.userOnGroupsRepository.create({
            user: thisUser,
            group,
            role: UserRole.USER
        })

        await this.userOnGroupsRepository.save(userOnGroup)

        return {
            id: group.id,
            name: group.name,
            type: group.type,
            role: userOnGroup.role,
            users: 0,
            rooms: 0
        }
    }

    async leaveGroup(userId: string, data: LeaveGroupDTO) {
        const { groupId } = data
        console.log(groupId)
        console.log(userId)

        const group = await this.groupRepository.findOne({
            where: {
                id: groupId
            }
        })

        if(!group) throw new NotFoundException("Group not found")

        const userOnGroup = await this.userOnGroupsRepository.findOne({
            where: {
                user: {
                    id: userId
                },
                group: {
                    id: groupId
                }
            }
        })

        if(!userOnGroup) throw new NotFoundException("Relation not found")

        return await this.userOnGroupsRepository.remove(userOnGroup)
    }

    async getUserRole(userId: string, groupId: string) {
        const userOnGroup = await this.userOnGroupsRepository.findOne({
            where: {
                group: {
                    id: groupId
                },
                user: {
                    id: userId
                }
            }
        })
        log(userOnGroup)

        return userOnGroup.role
    }

    private async getUser(userId: string) {
        return await this.userRepository.findOne({
            where: {
                id: userId
            }
        })
    }

    private async generateJoinCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        let result = '#'
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }
}