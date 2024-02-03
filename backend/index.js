import bcrypt, { hash } from "bcrypt";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import fs from "fs";
import https from "https";
import mongoose from "mongoose";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

const app = express();
const port = 3000;

// const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: "http://localhost:3001",
    credentials: true,
  })
);

// app.use(
//   session({
//     secret: "This is a secret key.",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl:
//         "mongodb+srv://admin-manthos:Ym3023mzWlBDK1ly@cluster0.yguea7t.mongodb.net/reactStore?retryWrites=true&w=majority&appName=AtlasApp", // replace with your MongoDB connection string
//       collection: "sessions",
//       // ttl: 24 * 60 * 60,
//     }),
//     cookie: {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//       domain: "localhost:3001",
//       // maxAge: 8 * 60 * 60 * 1000,
//     },
//   })
// );

app.use(
  session({
    secret: "This is a secret key.",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://admin-manthos:Ym3023mzWlBDK1ly@cluster0.yguea7t.mongodb.net/reactStore?retryWrites=true&w=majority&appName=AtlasApp",
    }),
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      domain: "localhost",
      maxAge: 8 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  "mongodb+srv://admin-manthos:Ym3023mzWlBDK1ly@cluster0.yguea7t.mongodb.net/reactStore?retryWrites=true&w=majority&appName=AtlasApp"
);

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
    ratings: [
      {
        author: Object,
        rating: Number,
        message: String,
        date: String,
        edit: { edited: Boolean, date: String },
      },
    ],
  },
  available: Number,
});
const Product = mongoose.model("Product", productSchema);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  cart: [productSchema],
  reviews: [
    {
      rating: Number,
      message: String,
      date: String,
      productID: String,
      edit: { edited: Boolean, date: String },
    },
  ],
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const product20 = new Product({
  id: 20,
  title: "DANVOUY Womens T Shirt Casual Cotton Short",
  price: 12.99,
  description:
    "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
  category: "women's clothing",
  image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product19 = new Product({
  id: 19,
  title: "Opna Women's Short Sleeve Moisture",
  price: 7.95,
  description:
    "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
  category: "women's clothing",
  image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product1 = new Product({
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product2 = new Product({
  id: 2,
  title: "Mens Casual Premium Slim Fit T-Shirts ",
  price: 22.3,
  description:
    "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  category: "men's clothing",
  image:
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product3 = new Product({
  id: 3,
  title: "Mens Cotton Jacket",
  price: 55.99,
  description:
    "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product4 = new Product({
  id: 4,
  title: "Mens Casual Slim Fit",
  price: 15.99,
  description:
    "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product5 = new Product({
  id: 5,
  title:
    "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  price: 695,
  description:
    "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
  category: "jewelery",
  image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product6 = new Product({
  id: 6,
  title: "Solid Gold Petite Micropave ",
  price: 168,
  description:
    "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
  category: "jewelery",
  image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product7 = new Product({
  id: 7,
  title: "White Gold Plated Princess",
  price: 9.99,
  description:
    "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
  category: "jewelery",
  image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product8 = new Product({
  id: 8,
  title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
  price: 10.99,
  description:
    "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
  category: "jewelery",
  image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product9 = new Product({
  id: 9,
  title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
  price: 64,
  description:
    "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
  category: "electronics",
  image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product10 = new Product({
  id: 10,
  title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
  price: 109,
  description:
    "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
  category: "electronics",
  image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product11 = new Product({
  id: 11,
  title:
    "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
  price: 109,
  description:
    "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
  category: "electronics",
  image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product12 = new Product({
  id: 12,
  title:
    "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
  price: 114,
  description:
    "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
  category: "electronics",
  image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product13 = new Product({
  id: 13,
  title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
  price: 599,
  description:
    "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
  category: "electronics",
  image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product14 = new Product({
  id: 14,
  title:
    "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
  price: 999.99,
  description:
    "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
  category: "electronics",
  image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product15 = new Product({
  id: 15,
  title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
  price: 56.99,
  description:
    "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
  category: "women's clothing",
  image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product16 = new Product({
  id: 16,
  title:
    "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
  price: 29.95,
  description:
    "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
  category: "women's clothing",
  image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product17 = new Product({
  id: 17,
  title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
  price: 39.99,
  description:
    "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
  category: "women's clothing",
  image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product18 = new Product({
  id: 18,
  title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
  price: 9.85,
  description:
    "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
  category: "women's clothing",
  image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
  rating: {
    rate: 0,
    count: 0,
  },
  available: Math.round(Math.random() * 100),
});

const product21 = new Product({
  id: 21,
  title: "Opna Women's Short Sleeve Moisture",
  price: 7.95,
  description:
    "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
  category: "women's clothing",
  image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
  rating: {
    rate: 4,
    count: 1,
    ratings: [
      { author: "azukho", rating: 4, message: "really good", date: "2015-..." },
    ],
  },
  available: Math.round(Math.random() * 100),
});

const initialProducts = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
  product9,
  product10,
  product11,
  product12,
  product13,
  product14,
  product15,
  product16,
  product17,
  product18,
  product19,
  product20,
  product21,
];

app.get("/", (req, res) => {
  res.send("UP AND RUNNING!");
});

app.get("/api/products", async function (req, res) {
  let productsFromDB = await Product.find({});

  if (productsFromDB.length === 0) {
    await Product.insertMany(initialProducts);

    productsFromDB = await Product.find({});
  }

  res.send(productsFromDB);
});

app.get("/api/products/:id", async function (req, res) {
  const id = parseInt(req.params.id);

  const result = await Product.findOne({ id: id });

  res.send(result);
});

app.get("/api/category/:category", async function (req, res) {
  const category = req.params.category;

  const items = await Product.find({ category: category });

  res.send(items);
});

app.post("/api/register", async function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordValidation = req.body.passwordValidation;

  // console.log(name, email, password, passwordValidation);

  // if (
  //   name !== null &&
  //   email !== null &&
  //   password !== null &&
  //   password.length > 6 &&
  //   passwordValidation === password
  // ) {
  //   bcrypt.hash(password, saltRounds, function (err, hash) {
  //     const user = new User({
  //       username: name,
  //       password: hash,
  //       email: email,
  //       cart: [],
  //       reviews: [],
  //     });
  //     user.save();
  //   });

  //   res.redirect("http://localhost:3001");
  // } else {
  //   console.log("Error");
  // }

  const newUser = new User({
    username: username,
    email: email,
    cart: [],
    reviews: [],
  });

  User.register(newUser, password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("localhost:3001/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("http://localhost:3001/");
      });
    }
  });
});

// await User.findOne({ email: email }).then((foundUser) => {
//   if (foundUser) {
//     bcrypt.compare(password, foundUser.password, function (err, result) {
//       // result == true
//       if (result === true) {
//         res.redirect("http://localhost:3001");
//       } else {
//         res.redirect("http://localhost:3001/signIn");
//       }
//     });
//   }
// });
app.post("/api/signIn", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username);
  console.log(password);

  if (username === undefined || password === undefined) {
    return;
  }

  const user = await User.findOne({ username: username });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.redirect("http://localhost:3001/signin");
    } else {
      passport.authenticate("local")(req, res, function () {
        req.session.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(req.user);
            res.redirect("http://localhost:3001/");
          }
        });
      });
    }
  });
});

app.post("/api/signOut", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3001/");
  });
});

app.get("/api/check-auth", (req, res) => {
  // console.log("Session:", req.session);
  // console.log("User:", req.user);

  if (req.isAuthenticated()) {
    // User is authenticated
    res.json({ authenticated: true, user: req.user });
  } else {
    // User is not authenticated
    res.json({ authenticated: false });
  }
});

app.post("/api/addRating", async (req, res) => {
  const itemID = req.body.itemID;
  const userID = req.body.userID;
  const username = req.body.username;
  const rating = req.body.rating;
  const message = req.body.message;

  if (!itemID || !userID || !username || !rating || !message) {
    console.log("Something missing");
    res.sendStatus(200);
  }

  await User.updateOne(
    { _id: userID },
    {
      $push: {
        reviews: {
          rating: rating,
          message: message,
          date: new Date().toLocaleDateString("en-GB"),
          productID: itemID,
        },
      },
    }
  );

  // Step 1: Push the new rating
  await Product.updateOne(
    { id: itemID },
    {
      $push: {
        "rating.ratings": {
          author: { username, userID },
          rating: rating,
          message: message,
          date: new Date().toLocaleDateString("en-GB"),
        },
      },
    }
  );

  // Step 2: Update the average rating and count
  const updatedProduct = await Product.findOneAndUpdate(
    { id: itemID },
    [
      {
        $set: {
          rating: {
            $mergeObjects: [
              "$rating",
              {
                rate: {
                  $cond: {
                    if: { $eq: [{ $size: "$rating.ratings" }, 0] },
                    then: 0, // If size is 0, set rate to 0
                    else: {
                      $divide: [
                        { $sum: "$rating.ratings.rating" },
                        { $size: "$rating.ratings" },
                      ],
                    },
                  },
                },
              },
              { count: { $add: ["$rating.count", 1] } },
            ],
          },
        },
      },
    ],
    { new: true, runValidators: true }
  );

  res.sendStatus(200);
});

app.post("/api/deleteRating", async (req, res) => {
  const productId = req.body.productId;
  const ratingId = req.body.ratingId;
  const rating = req.body.rating;
  const message = req.body.message;
  const date = req.body.date;
  const userId = req.body.author;

  await Product.updateOne(
    { _id: productId, "rating.ratings._id": ratingId },
    {
      $pull: { "rating.ratings": { _id: ratingId } },
      $inc: { "rating.count": -1 },
    }
  )
    .exec()
    .then(async (res) => {
      console.log(res);

      // Find the product again after the rating has been removed
      const product = await Product.findOne({ _id: productId });

      // Recalculate the average rating
      let avgRating = 0;
      if (product.rating.ratings.length > 0) {
        avgRating =
          product.rating.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
          product.rating.ratings.length;
      }

      // Update the average rating
      await Product.updateOne({ _id: productId }, { "rating.rate": avgRating });
    })
    .catch((err) => {
      console.log(err);
    });

  // Assuming you have some criteria to identify the review
  let criteria = { rating: rating, message: message, date: date };

  await User.findOne({ _id: userId }) // replace someUsername with the actual username
    .then((user) => {
      let review = user.reviews.find(
        (review) =>
          review.rating === criteria.rating &&
          review.message === criteria.message &&
          review.date === criteria.date
      );

      if (review) {
        async function updateUserReviews() {
          await User.updateOne(
            { _id: userId },
            { $pull: { reviews: { _id: review._id } } }
          )
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }

        updateUserReviews(); // Call the function here
      } else {
        console.log("No matching review found");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  res.sendStatus(200);
});

app.post("/api/editRating", async (req, res) => {
  const itemID = req.body.itemID;
  const userID = req.body.userID;
  const username = req.body.username;
  const rating = req.body.rating;
  const message = req.body.message;

  // Get the current date
  const currentDate = new Date().toLocaleDateString("en-GB");

  let currentMessage = await Product.findOne({
    id: itemID,
    "rating.ratings.author.userID": userID,
  });
  currentMessage = currentMessage.rating.ratings[0].message;

  console.log(currentMessage);

  await User.updateOne(
    { _id: userID, "reviews.message": currentMessage },
    {
      $set: {
        "reviews.$.rating": rating,
        "reviews.$.message": message,
        "reviews.$.edit.edited": true,
        "reviews.$.edit.date": currentDate,
      },
    }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  // Update the rating
  await Product.updateOne(
    { id: itemID, "rating.ratings.author.userID": userID },
    {
      $set: {
        "rating.ratings.$.rating": rating,
        "rating.ratings.$.message": message,
        "rating.ratings.$.edit.edited": true,
        "rating.ratings.$.edit.date": currentDate,
      },
    }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  // Find the product again after the rating has been removed
  const product = await Product.findOne({ id: itemID });

  // Recalculate the average rating
  let avgRating = 0;
  if (product.rating.ratings.length > 0) {
    avgRating =
      product.rating.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
      product.rating.ratings.length;
  }

  // Update the average rating
  await Product.updateOne({ id: itemID }, { "rating.rate": avgRating });

  res.sendStatus(200);
});

const options = {
  key: fs.readFileSync("C:/Users/PC/private.key"),
  cert: fs.readFileSync("C:/Users/PC/public.crt"),
};

https.createServer(options, app).listen(port, () => {
  console.log("Server listening on port " + port);
});
