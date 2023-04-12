import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

// using SetMetadata decorator to attach custom metadata to rout handlers
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
