import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Types
type Request = express.Request;
type Response = express.Response;

// Router khởi tạo
const appContentRouter = express.Router();
// Env API
const serverApiUrl = process.env.SERVER_API;
const productApiUrl = process.env.PRODUCT_API;
const newsApiUrl = process.env.NEWS_API;
const productDetailApiUrl = process.env.PRODUCT_DETAIL_API;
const choixanhApiUrl = process.env.CHOIXANH_API;
const endPointChoixanh = process.env.GLOBAL_API_CHOIXANH_ENPOINT;
/* ========== ROUTER ========== */
appContentRouter.get("/get-product", async (req, res) => {
  await getProduct(req, res);
});
appContentRouter.get("/get-product-detail", async (req, res) => {
  await getProductDetail(req, res);
});
appContentRouter.get("/get-page-categories", async (req, res) => {
  await getPageCategories(req, res);
});
appContentRouter.get("/get-content-header", async (req, res) => {
  await getContentHeader(req, res);
});
appContentRouter.get("/get-home-content", async (req, res) => {
  await getHomePageContent(req, res);
});
appContentRouter.get("/get-wrap-content", async (req, res) => {
  await getWarpContent(req, res);
});
appContentRouter.post("/save-cart", async (req, res) => {
  await addToCart(req, res);
});
appContentRouter.post("/save-wishlist", async (req, res) => {
  await addToWishList(req, res);
});
appContentRouter.get("/get-news", async (req, res) => {
  await getNews(req, res);
});
appContentRouter.get("/get-cart", async (req, res) => {
  await getCart(req, res);
});
appContentRouter.get("/get-wishlist", async (req, res) => {
  await getWishList(req, res);
});
appContentRouter.post("/oder", async (req, res) => {
  await oderFunction(req, res);
});
appContentRouter.get("/get-filter", async (req, res) => {
  await getFilter(req, res);
});
appContentRouter.get("/get-contact-form", async (req, res) => {
  await getContactPageContent(req, res);
});
/* ========== CONTROLLERS ========== */
const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const response = await axios.get(`${productApiUrl}?id=${id}`);
    console.log("hello");
    const product = response.data;
    if (!product || product.length === 0) {
      return res.status(400).json({ mess: "Không có sản phẩm" });
    }
    return res.status(200).json({ mess: "Product is defined", product });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res
        .status(500)
        .json({ mess: "Lỗi axios", error: `${error.toString()}` });
    }
    return res.status(500).json({ mess: `SERVER ERROR: ${error}` });
  }
};

const getProductDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const response = await axios.get(`${productDetailApiUrl}?id=${id}`);
    console.log(`${productDetailApiUrl}?id=${id}`);
    return res
      .status(200)
      .json({ mess: "Chi tiết sản phẩm", product: response.data });
  } catch (error) {
    return res.status(500).json({ mess: `SERVER ERROR: ${error}` });
  }
};

const getPageCategories = async (_req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${choixanhApiUrl}/ww2/app.menu.dautrang.${endPointChoixanh}`
    );
    return res.status(200).json({ mess: "Menu top page", menu: response.data });
  } catch (error) {
    return res.status(500).json({ mess: `SERVER: ${error}` });
  }
};

const getContentHeader = async (_req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${choixanhApiUrl}/ww2/app.menu.top.${endPointChoixanh}`
    );
    const response2 = await axios.get(
      `${choixanhApiUrl}/ww2/web.banner.${endPointChoixanh}`
    );
    const data_header = response2.data[0];
    return res.status(200).json({
      mess: "header content",
      header_content: { menu: response.data, content: data_header },
    });
  } catch (error) {
    return res.status(500).json({ mess: `SERVER: ${error}` });
  }
};

const getHomePageContent = async (_req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${choixanhApiUrl}/ww2/web.trangchu.module.content.${endPointChoixanh}`
    );
    return res
      .status(200)
      .json({ mess: "Home page content", content: response.data });
  } catch (error) {
    return res.status(500).json({ mess: `SERVER: ${error}` });
  }
};

const getWarpContent = async (_req: Request, res: Response) => {
  try {
    const [leftRes, rightRes] = await Promise.all([
      // axios.get(`https://4f25-115-78-226-125.ngrok-free.app/api/web.vitritrai.php`),
      // axios.get(`https://4f25-115-78-226-125.ngrok-free.app/api/web.vitriphai.php}`),
      axios.get(`https://choixanh.com.vn/ww2/web.vitritrai.asp`),
      axios.get(`https://choixanh.com.vn/ww2/web.vitriphai.asp`),
    ]);
    // const leftData: [
    //   {
    //     recordsTotal: number;
    //     noidung: Array<{
    //       id: string;
    //       tieude: string;
    //       hinhdaidien: string;
    //       url: any;
    //     }>;
    //   }
    // ] = leftRes.data;
    // const rightData: [
    //   {
    //     recordsTotal: number;
    //     noidung: Array<{
    //       id: string;
    //       tieude: string;
    //       hinhdaidien: string;
    //       url: any;
    //     }>;
    //   }
    // ] = rightRes.data;
    //left
    const leftapi = leftRes.data[0].noidung;
    //right
    const rightapi = rightRes.data[0].noidung;
    return res
      .status(200)
      .json({ mess: "Wrap content", content: { leftapi, rightapi } });
  } catch (error) {
    return res.status(500).json({ mess: `SERVER: ${error}` });
  }
};

const addToCart = async (req: Request, res: Response) => {
  try {
    const { userid, pass, id } = req.body;
    const response = await axios.post(
      `${choixanhApiUrl}/ww1/save.addcart.${endPointChoixanh}?userid=${userid}&pass=${pass}&id=${id}`
    );
    return res
      .status(200)
      .json({ mess: "Thao tác thêm vào giỏ hàng", result: response.data[0] });
  } catch (error) {
    return res.status(500).json({ mess: `SERVER ERROR: ${error}` });
  }
};

const addToWishList = async (req: Request, res: Response) => {
  try {
    const { userid, pass, id } = req.body;
    const response = await axios.post(
      `${choixanhApiUrl}/ww1/save.wishlist.${endPointChoixanh}?userid=${userid}&pass=${pass}&id=${id}`
    );
    return res
      .status(200)
      .json({ mess: "Thao tác thêm vào yêu thích", result: response.data[0] });
  } catch (error) {
    return res.status(500).json({ mess: `SERVER ERROR: ${error}` });
  }
};

const getNews = async (req: Request, res: Response) => {
  console.log("api url", newsApiUrl);
  try {
    const { id, sl, page } = req.query;
    const response = await axios.get(
      `${newsApiUrl}?id=${id}&sl=${sl}&pageid=${page}`
    );
    return res.status(200).json({ mess: "Found!", news: response.data });
  } catch (error) {
    return res.status(500).json({ mess: `SERVER ERROR: ${error}` });
  }
};

const getCart = async (req: Request, res: Response) => {
  try {
    const { userid, pass } = req.query;
    const response = await axios.get(
      `${choixanhApiUrl}/ww1/member.1/Quanlydanhmucsanphamgiohang.${endPointChoixanh}?userid=${userid}&pass=${pass}&pageid=all`
    );
    return res.status(200).json({ mess: "Lấy giỏ hàng", cart: response.data });
  } catch (error) {
    return res.status(500).json({ mess: `SERVER ERROR: ${error}` });
  }
};

const getWishList = async (req: Request, res: Response) => {
  try {
    const { userid, pass } = req.query;
    const response = await axios.get(
      `${choixanhApiUrl}/ww1/member.1/Quanlydanhmucquantam.${endPointChoixanh}?userid=${userid}&pass=${pass}&pageid=all`
    );
    return res
      .status(200)
      .json({ mess: "Lấy danh sách yêu thích", wishlist: response.data });
  } catch (error) {
    return res.status(500).json({ mess: `SERVER ERROR: ${error}` });
  }
};

const oderFunction = async (req: Request, res: Response) => {
  try {
    const { userid, pass, id } = req.body;
    const response = await axios.get(
      `${choixanhApiUrl}/ww1/save.cart.${endPointChoixanh}?userid=${userid}&pass=${pass}&id=$${id}`
    );
    return res.status(200).json({ response: response.data[0] });
  } catch (error) {
    return res.status(500).json({ mess: `SERVER ERROR: ${error}` });
  }
};

const getFilter = async (_req: Request, res: Response) => {
  try {
    const filterMaster = await axios.get(
      `${choixanhApiUrl}/ww2/crm.boloc.master.${endPointChoixanh}`
    );
    const details = await Promise.all(
      filterMaster.data.map((item: any) =>
        axios.get(`${choixanhApiUrl}/ww2/crm.boloc.chitiet?id=${item.id}`)
      )
    );
    const all = details.flatMap((detail) => detail.data);
    if (all.length === 0) {
      return res.status(404).json({ mess: "Không tìm thấy filter" });
    }
    return res.status(200).json({ mess: "Filter OK", filter: all });
  } catch (error) {
    return res.status(500).json({ mess: `SERVER ERROR: ${error}` });
  }
};

const getContactPageContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const response = await axios.get(
      `${choixanhApiUrl}/ww2/module.Lienhe.${endPointChoixanh}?id=${id}`
    );
    return res.status(200).json({ mess: "Liên hệ", contact: response.data });
  } catch (error) {
    return res.status(500).json({ mess: `SERVER ERROR: ${error}` });
  }
};

/* ========== EXPORT ========== */
export default appContentRouter;
