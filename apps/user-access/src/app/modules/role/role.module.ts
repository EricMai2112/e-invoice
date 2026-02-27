import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleDestination } from '@commonjs/schemas/role.schema';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { RoleRepository } from './repositories/role.repository';
import { MongoProvider } from '@common/configuration/mongo.config';

@Module({
  imports: [MongoProvider, MongooseModule.forFeature([RoleDestination])],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
})
export class RoleModule {}
