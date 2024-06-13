import { Express } from "express";
import Joi from "joi";
export const queryParamsSchema = Joi.object({
    page: Joi.number().integer().min(1).required(),
    limit: Joi.number().integer().min(1).required(),
    filter: Joi.string().allow('').optional(),
});
export const pathParamsSchema = Joi.object({
    id: Joi.string().alphanum().required(),
});