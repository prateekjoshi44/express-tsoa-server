

import { BaseController } from "../BaseController";
import { Get, Route, Tags } from "tsoa";

@Tags("Authentication")
@Route("auth")
export class AuthController extends BaseController {
    @Get("login")
    public async login(): Promise<{ message: string }> {
        return this.msgRes("Login successful");
    }

    @Get("register")
    public async register(): Promise<{ message: string }> {
        return this.msgRes("Registration successful");
    }
}
