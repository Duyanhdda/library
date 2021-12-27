import { InternalServerErrorException } from "@nestjs/common";
import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";

@Catch(InternalServerErrorException)
export class InternalServerErrorFilter implements ExceptionFilter {
	catch(exception: InternalServerErrorException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const message = exception.message;

		return response.redirect("/500");
	}
}
