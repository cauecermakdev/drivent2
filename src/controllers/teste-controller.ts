
import { Request, Response } from "express";

export async function teste(_req: Request, res: Response) {
  console.log("teste function");
  return res.send("rodou teste controller");
}
