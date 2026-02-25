import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleDestination } from '@commonjs/schemas/role.schema';

@Module({
  imports: [MongooseModule.forFeature([RoleDestination])],
  controllers: [],
  providers: [],
})
export class RoleModule {}
