import User from "../models/usermodel.js";
import createtokenandsavecookie from "../jwt/generatetoken.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        if (password != confirm_password) {
            return res.json({ message: "password do not match" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ message: "user already exists" })
        }

        const newuser = await new User({
            name,
            email,
            password
        });


        await newuser.save().then(() => {
            console.log("new user created");
            createtokenandsavecookie(newuser._id, res);
            return res.json({
                name: newuser.name,
                email: newuser.email,
                _id: newuser._id,
            });

        });

    } catch (error) {
        console.log(error);
        console.log("error in usercontroller")
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        let valid = 0;

        if (!user) {
            return res.json({ message: "User does not exist" });
        }
        if (password == user.password) {
            valid = 1;
        }
        if (valid == 0) {
            return res.json({ message: "password is wrong " });
        }
        console.log(user);

        createtokenandsavecookie(user._id, res);

        return res.json({
            name: user.name,
            email: user.email,
            _id: user._id,
        });

    } catch (error) {
        console.log(error);
        console.log("error in usercontroller (signin)")
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.json({ message: "logout successfully" });
    } catch (error) {
        console.log(error);
        console.log("error in usercontroller (logout)")
    }
}