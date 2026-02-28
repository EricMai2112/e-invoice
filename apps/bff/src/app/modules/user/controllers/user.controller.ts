import { TCP_SERVICES } from '@common/configuration/tcp.config';
import { ResponseDTO } from '@common/interfaces/gateway/response.interface';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { Controller, Inject, Post, Body, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto, UserResponseDto } from '@common/interfaces/gateway/user';
import { ProcessId } from '@common/decorators/processId.decorator';
import { CreateUserTcpRequest, UserTcpResponseType } from '@common/interfaces/tcp/user';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { map } from 'rxjs';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(@Inject(TCP_SERVICES.USER_ACCESS_SERVICE) private readonly userAccessClient: TcpClient) {}

  @Post()
  @ApiOkResponse({ type: ResponseDTO<string> })
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() body: CreateUserRequestDto, @ProcessId() processId: string) {
    return this.userAccessClient
      .send<string, CreateUserTcpRequest>(TCP_REQUEST_MESSAGE.USER.CREATE, {
        data: body,
        processId,
      })
      .pipe(map((data) => new ResponseDTO(data)));
  }

  @Get()
  @ApiOkResponse({ type: ResponseDTO<UserResponseDto[]> })
  @ApiOperation({ summary: 'Get a list user' })
  getList(@ProcessId() processId: string) {
    return this.userAccessClient
      .send<UserTcpResponseType[]>(TCP_REQUEST_MESSAGE.USER.GET_ALL, {
        processId,
      })
      .pipe(map((data) => new ResponseDTO(data)));
  }
}
