import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderResponse } from './order/create-order.dto';
import { SignInResponse } from './auth/sign-in.dto';

export { SignInDecorator, SignUpDecorator, CreateOrderDecorator };

const CreateOrderDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create Order',
    }),
    ApiResponse({
      status: 200,
      description: 'Success',
      type: CreateOrderResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'invalid',
    })
    // ApiResponse({ status: 403, description: 'Forbidden.' })
  );
};

const SignInDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Sign In',
    }),
    ApiResponse({
      status: 200,
      description: 'Success',
      type: SignInResponse,
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
