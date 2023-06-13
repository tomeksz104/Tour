import { createRouter } from "next-connect";

const router = createRouter();

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
  onNoMatch: (req, res) => {
    res.status(404).send("Page is not found");
  },
});

// import nc from "next-connect";

// function onError(err, req, res, next) {
//   console.error(err);
//   res.status(500).end(err.toString());
// }

// const handler = nc({
//   onError: onError,
//   onNoMatch: (req, res) => {
//     res.status(404).send("Page is not found");
//   },
// });

// export default handler;
