import { NotFoundException } from "@nestjs/common";
import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
	catch(exception: NotFoundException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const message = exception.message;

		return response.redirect("/404");
	}
}
