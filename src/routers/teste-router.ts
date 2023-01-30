import { teste } from "@/controllers";
import { Router } from "express";

const testeRouter = Router();

testeRouter.get("/", teste);

export { testeRouter };
