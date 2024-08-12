import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderResponseType } from './order/create-order.dto';

export { SignInDecorator, SignUpDecorator, CreateOrderDecorator };

const CreateOrderDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create Order',
    }),
    ApiResponse({
      status: 200,
      description: 'Success',
      type: CreateOrderResponseType,
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
