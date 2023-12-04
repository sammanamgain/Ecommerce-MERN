const crypto = require("crypto");
const Errorcreator = require("../utils/Error.js");
const catchAsync = require("../middleware/catchAsync.js");
const User = require("../Models/userModel.js");
const sendToken = require("../utils/jwToken.js");
const sendEmail = require("../utils/sendEmail.js");

exports.signUp = catchAsync(async (req, res, next) => {
    const {name, password, email} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {public_id: "sampleid", url: "jdklfjsl"},
    });
    sendToken(user, 200, res, next);
});

exports.logIn = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    console.log(password);
    if (!email || !password) {
        return next(new Errorcreator(400, "please Enter your email and password"));
    }
    // as we have made false to select property of password ,we have to explicitly select password field too
    const user = await User.findOne({email}).select("+password");
    if (!user) {
        return next(new Errorcreator(401, "Invalid email or password"));
    }
    console.log(user);

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        console.log("this should called");
        return next(new Errorcreator(401, "Invalid email or password"));
    }
    sendToken(user, 200, res, next);
});
exports.logout = catchAsync(async (req, res, next) => {
    res.cookie("token", null, {expires: new Date(Date.now()), httpOnly: true});
    res.status(200).json({
        success: true,
        message: "Logged out",
    });
});

//forget password
exports.forgetpassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if (!user || user.length === 0) {
        return next(new Errorcreator(401, "Couldn't find user with that Email"));
    }
    //Get reset password tokens
    const token = await user.getResetPasswordToken();

    //saving into db
    await user.save({validateBeforeSave: false});
    console.log(user.resetPasswordExpire);

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/password/reset/${token}`;
    const message = `your password Reset token is :- \n\n ${resetPasswordUrl} \n\n If you havenot requeset this,please skip this`;
    try {
        const data = await sendEmail({
            email: user.email,
            subject: "Ecommerce Password Recovery",
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (e) {
        user.resetPasswordToken = undefined;
        user.resetPasswordToken = undefined;
        await user.save({validateBeforeSave: false});
        return next(new Errorcreator(500, e.message));
    }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        // resetPasswordExpire: { $gt: Date.now() },
    });

    console.log(user.resetPasswordExpire);

    console.log(user);

    if (!user || user.length === 0) {
        return next(new Errorcreator(401, "Reset Password Token Expired"));
    }
    console.log(req.body.confirmpassword);
    console.log(req.body.password);
    if (req.body.password !== req.body.confirmpassword) {
        return next(new Errorcreator(401, "Password didnot match"));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    sendToken(user, 200, res, next);
});

//getting user details
exports.getUserDetails = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

//updating user password
exports.updateUserPassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldpassword);
    if (!isPasswordMatched) {
        return next(new Errorcreator(401, "Invalid email or password"));
    }
    if (req.body.newpassword !== req.body.confirmpassword) {
        return next(new Error(400, "Password does not match"));
    }
    user.password = req.body.newpassword;
    await user.save();
    sendToken(user, 200, res);
});


//updating user profile
exports.updateUserProfile = catchAsync(async (req, res, next) => {
    const body = {
        name: req.body.name,
        email: req.body.email

    };
    const user = await User.findByIdAndUpdate(req.user.id, body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({success: true, user})
});

//Get all users (admin)
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

//Get single user (admin)
exports.getSingleUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new Error(400, `user doesnot exist with id :${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    })
})

//updating user role --admin
exports.updateUserRole = catchAsync(async (req, res, next) => {
    const body = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role

    };
    console.log(req.body.role);
    const user = await User.findByIdAndUpdate(req.params.id, body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({success: true, user})
});


//delete user --admin
exports.deleteProfile = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user) {
        return next(400, new Error(`User doesnot exists with id :${req.params.id} `))
    }
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({success: true, message: "User deleted successfully"})
});
