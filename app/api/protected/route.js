import { hasTokenMiddleware } from "@/libs/checkUser";
import router from "@/utils/handler";

router.use(hasTokenMiddleware).get(protectedAPI);

async function protectedAPI(req, res, next) {
  res.status(200).send("Success!");
}

export default router;
