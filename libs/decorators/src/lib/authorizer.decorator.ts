import { MetadataKeys } from '@common/constants/common.constant';
import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const Authorization = ({ secured = false }: { secured?: boolean }) => {
  const setMetadata = SetMetadata(MetadataKeys.SECURED, {
    secured,
  });

  if (secured) {
    //Dùng để hiển thị cái phần gắn bearer token vào swagger để test
    const decorators = [ApiBearerAuth()];

    return applyDecorators(...decorators, setMetadata);
  }

  return setMetadata;
};
