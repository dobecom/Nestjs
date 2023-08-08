import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { Observable } from "rxjs";

@Injectable()
export class ClsInterceptor implements NestInterceptor {
    constructor(private readonly cls: ClsService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        // console.log(request.headers)
        const userIp = request.connection.remoteAddress;

        // Set Continuous Local Storage data
        this.cls.set('ip', userIp);
        return next.handle();
    }
}