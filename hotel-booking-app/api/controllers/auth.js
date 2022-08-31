import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import { createError } from "../utils/error.js";
export const register = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            city: req.body.city,
            country: req.body.country,

        })
        await newUser.save()
        res.status(200).send("user has been created")
    } catch (err) {
        next(err)
    }
}


export const login = async (req, res, next) => {
    try {
        console.log('hello')
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));
        console.log('user', user.password, 'and', req.body.password)
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        const { password, isAdmin, ...otherDetails } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({ ...otherDetails })
    } catch (err) {
        next(err)
    }
}
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};