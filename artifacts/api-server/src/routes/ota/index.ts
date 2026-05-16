import { Router, type IRouter } from "express";
import publicRouter from "./public";
import ownerRouter from "./owner";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use("/", publicRouter);
router.use("/owner", ownerRouter);
router.use("/admin", adminRouter);

export default router;
