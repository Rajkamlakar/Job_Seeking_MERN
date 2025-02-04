import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";
const router = express.Router();
//get=to view something
router.get("/getall", getAllJobs);
//post=add new sonethinf
router.post("/post", isAuthorized, postJob);
router.get("/getmyJobs", isAuthorized, getMyJobs);
//put=update the existing something
router.put("/update/:id", isAuthorized, updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);
router.get("/:id", isAuthorized, getSingleJob);
export default router;
