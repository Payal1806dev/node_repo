import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from 'express';
import { pathParamsSchema, queryParamsSchema } from "../features/products/JoiValidation";

export function validateQueryParams(req:Request, res:Response, next:NextFunction) {
    const { error } = queryParamsSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
}

export function validatePathParams(req:Request, res:Response, next:NextFunction) {
    const { error } = pathParamsSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
}
