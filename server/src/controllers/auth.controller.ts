import axios from "axios";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import md5 from "md5";
type Request = express.Request;
type Response = express.Response;
const authRouter = express.Router();

//api url
const apiUrl = process.env.SERVER_API;
const endPoint = process.env.GLOBAL_API_CHOIXANH_ENPOINT;
/*-----Router----- */
authRouter.post(`/login`, async (req, res) => {
  await login(req, res);
});
authRouter.get("/check", async (req, res) => {
  await checkauth(req, res);
});
export default authRouter;
/*----------controller--------*/
//login
const login = async (req: Request, res: Response) => {
  try {
    const { userid, pass } = req.body;

    if (!userid || !pass) {
      return res
        .status(404)
        .json({ mess: "You are not login or mail and password is not define" });
    }

    const result = await axios.post(
      `${apiUrl}/ww1/userlogin.${endPoint}?userid=${userid}&pass=${pass}`
    );
    const data = result.data[0];

    if (data.maloi !== "1") {
      return res.status(400).json({
        mess: "Đăng nhập không thành công!",
        result: {
          resultCode: 0,
          userid: "",
          pass: "",
        },
      });
    }

    const hashpass = md5(pass);
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      result: {
        resultCode: 1,
        userid: userid,
        pass: hashpass,
      },
    });
  } catch (error) {
    return res.status(500).json({
      mess: `SERVER ERROR::${error}`,
      result: {
        resultCode: 0,
        userid: "",
        pass: "",
      },
    });
  }
};
//check  auth
const checkauth = async (req: Request, res: Response) => {
  try {
    const { userid, pass } = req.query;

    if (!userid || !pass) {
      return res
        .status(401)
        .json({ mess: "You are not login or mail and password is not define" });
    }

    const result = await axios.get(
      `${apiUrl}/ww1/thongtinthanhvien.${endPoint}`,
      { params: { userid, pass } }
    );
    const data = result.data[0];
    if (data.maloi !== "1") {
      return res.status(400).json({
        mess: "Lỗi lấy thông tin thành viên",
        result: {
          resultCode: 0,
          user: "",
          memberid: "",
          chucnang: "",
          userForm: "",
        },
      });
    }
    return res.status(200).json({
      mess: "Thông tin thành viên",
      result: {
        resultCode: 1,
        user: data.user,
        memberid: data.memberid,
        chucnang: data.chucnang,
        userForm: data.thongtinthanhvien,
      },
    });
  } catch (error) {
    return res.status(500).json({
      mess: `SERVER ERROR::${error}`,
      result: {
        resultCode: 0,
        user: "",
        memberid: "",
        chucnang: "",
        userForm: "",
      },
    });
  }
};
//export
