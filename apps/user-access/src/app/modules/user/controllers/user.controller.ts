import { Controller, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { MessagePattern } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { RequestParams } from '@common/decorators/request-param.decorator';
import { CreateUserTcpRequest, UserTcpResponseType } from '@common/interfaces/tcp/user';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { HTTP_MESSAGE } from '@common/constants/enum/http-message.enum';
import { ProcessId } from '@common/decorators/processId.decorator';

@Controller('user')
@UseInterceptors(new TcpLoggingInterceptor())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(TCP_REQUEST_MESSAGE.USER.CREATE)
  async create(@RequestParams() data: CreateUserTcpRequest, @ProcessId() processId: string) {
    await this.userService.create(data, processId);

    return Response.success<string>(HTTP_MESSAGE.CREATED);
  }

  @MessagePattern(TCP_REQUEST_MESSAGE.USER.GET_ALL)
  async getAll() {
    const result = await this.userService.getList();

    return Response.success<UserTcpResponseType[]>(result);
  }
}
