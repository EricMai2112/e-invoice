import { Module } from '@nestjs/common';
import { AuthorizerController } from './controllers/authorizer.controller';
import { AuthorizerService } from './services/authorizer.service';
import { KeyCloakModule } from '../keycloak/keycloak.module';

@Module({
  imports: [KeyCloakModule],
  controllers: [AuthorizerController],
  providers: [AuthorizerService],
  exports: [],
})
export class AuthorizerModule {}
