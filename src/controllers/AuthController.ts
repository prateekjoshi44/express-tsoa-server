

import { BaseController } from "../BaseController";
import { Get, Route, Tags } from "tsoa";

@Tags("Authentication")
@Route("auth")
export class AuthController extends BaseController {
    @Get("login")
    public async login(): Promise<string> {
        return this.msgRes("Login successful").message;
    }
}
