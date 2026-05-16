import { Router, type IRouter } from "express";
import healthRouter from "./health";
import otaRouter from "./ota";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/ota", otaRouter);

export default router;
