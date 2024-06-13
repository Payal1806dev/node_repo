import { Express } from "express";
import { validationResult } from "express-validator";
import { body } from "express-validator";

export const registrationSchema = [
    body('username').notEmpty().isLength({ min: 5, max: 10 }).withMessage('Username must be at least 5 characters long'),
    body('email').isEmail().withMessage('Invalid email address').isLength({ min: 5, max: 10 }).withMessage('Email address must be at least 5 characters long'),  
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('dob').optional().isDate().withMessage('Invalid Date of Birth'),
    body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender')
];
export const loginSchema = [

    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];