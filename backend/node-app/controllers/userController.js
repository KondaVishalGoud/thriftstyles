const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const Users = mongoose.model('Users', {
    username: String,
    mobile: String,
    email: String,
    password: String,
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    cartedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    
});

module.exports.likeProducts = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'liked success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
}


module.exports.cartProducts = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $addToSet: { cartedProducts: productId } })
        .then(() => {
            res.send({ message: 'Added to cart success.' });
        })
        .catch(() => {
            res.send({ message: 'Server err' });
        });
}


module.exports.removeProductFromCart = async (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $pull: { cartedProducts: productId } })
        .then(() => {
            res.send({ message: 'Item removed.' });
        })
        .catch(() => {
            res.send({ message: 'Server err' });
        });
  };
  


module.exports.signup = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const user = new Users({ username: username, password: password, email, mobile });
    user.save()
        .then(() => {
            res.send({ message: 'saved success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

}

module.exports.myProfileById = (req, res) => {
    let uid = req.params.userId

    Users.findOne({ _id: uid })
        .then((result) => {
            res.send({
                message: 'success.', user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

    return;

}

module.exports.getUserById = (req, res) => {
    const _userId = req.params.uId;
    Users.findOne({ _id: _userId })
        .then((result) => {
            res.send({
                message: 'success.', user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
}


module.exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Users.findOne({ username: username })
        .then((result) => {
            if (!result) {
                res.send({ message: 'user not found.' })
            } else {
                if (result.password == password) {
                    const token = jwt.sign({
                        data: result
                    }, 'MYKEY', { expiresIn: '1h' });
                    res.send({ message: 'find success.', token: token, userId: result._id })
                }
                if (result.password != password) {
                    res.send({ message: 'password wrong.' })
                }

            }

        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

}

module.exports.likedProducts = (req, res) => {

    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then((result) => {
            res.send({ message: 'success', products: result.likedProducts })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
}


module.exports.cartedProducts = (req, res) => {

    Users.findOne({ _id: req.body.userId }).populate('cartedProducts')
        .then((result) => {
            res.send({ message: 'success', products: result.cartedProducts })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
}

module.exports.removeAllProductsFromCart = async (req, res) => {
    let userId = req.body.userId;

    try {
        await Users.updateOne({ _id: userId }, { $set: { cartedProducts: [] } });
        res.send({ message: 'Cart emptied.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
};


// module.exports.emptyCart = async (req, res) => {
//     try {
//       // Get the user from the database
//       const user = await Users.findOne({ _id: req.body.userId });
  
//       // Check if the user exists
//       if (!user) {
//         return res.status(404).send({ message: 'User not found' });
//       }
  
//       // If the user exists, get their carted products
//       const cartedProducts = await Products.find({ _id: { $in: user.cartedProducts } });
  
//       // Check if the carted products exist
//       if (cartedProducts.length === 0) {
//         return res.status(404).send({ message: 'Carted products not found' });
//       }
  
//       // Iterate through the carted products and remove each one from the user's cartedProducts field
//       // and from the products collection
//       for (const product of cartedProducts) {
//         user.cartedProducts.pull(product._id);
//         await product.remove();
//       }
  
//       // Save the updated user
//       await user.save();
  
//       // Return a success message
//       res.send({ message: 'Cart successfully emptied' });
//     } catch (err) {
//       // Return an error message
//       console.error(err);
//       res.status(500).send({ message: 'Server error' });
//     }
//   };
  