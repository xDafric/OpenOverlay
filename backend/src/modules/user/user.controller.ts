import type { NextFunction, Request, Response } from "express";
import type { CreateUserDTO } from "./user.dto.js";
import { userService } from "./user.service.js";
import type { PaginationInput } from "@/utils/pagination.js";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: CreateUserDTO = req.body;
    const result = await userService.createUser(data);
    res.status(201).json({ success: true, message: "User created" });
  } catch (err) {
    next(err);
  }
};

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pagination: PaginationInput = {
      page_size: parseInt(req.query.page_size as string),
      cursor: req.query.cursor as string,
      sort_direction: req.query.sort_direction as "asc" | "desc",
      sort_field: req.query.sort_field as string,
    };
    const users = await userService.listUsers(pagination);
    res.json(users);
  } catch (err) {
    next(err);
  }
};
