import { IsNotEmpty, IsNumber } from "class-validator";

export class ContractRequest {
    @IsNumber()
    @IsNotEmpty()
    value : number;
}