import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export { SignInDecorator, SignUpDecorator };

const SignInDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Sign In',
    }),
    ApiResponse({
      status: 200,
      description: 'Success',
    })
    // ApiResponse({ status: 403, description: 'Forbidden.' })
  );
};

const SignUpDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Sign Up',
    }),
    ApiResponse({
      status: 200,
      description: 'Success',
      // type: SuccessDtoResponse,
    }),
    ApiResponse({
      status: 500,
      description: 'sign up failed',
    })
  );
};
