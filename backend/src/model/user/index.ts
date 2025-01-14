import mongoose, { CallbackError, Model } from "mongoose";
import bcrypt from "bcrypt";
import user_schema, { IUser } from "./schema";

interface IUserModel extends Model<IUser> {
    add({ first_name, last_name, email, password }: { first_name: string, last_name: string, email: string, password: string }): Promise<any>
    verify({ email, password }: { email: string, password: string }): Promise<any>
    user({ email }: { email: string }): Promise<any>
}

// Middleware to hash the password before saving the user document
user_schema.pre<IUser>("save", async function (next) {
    if (this.isModified("password")) {
        try {
            // Generate a salt with 10 rounds
            const salt = await bcrypt.genSalt(10);
            // Hash the password using the salt
            this.password = await bcrypt.hash(this.password, salt)
        } catch (err) {
            next(err as CallbackError);  // Pass any error to the next middleware
        }
    }
    next();
});

// Method to compare the candidate password with the hashed password
user_schema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    try {
        // Compare the candidate password with the stored hashed password
        return await bcrypt.compare(candidatePassword, this.password)
    } catch (err) {
        throw new Error("Password comparison failed");
    }
};

// Method to compare the candidate password with the hashed password
user_schema.statics.add = async function ({ first_name, last_name, email, password }): Promise<any> {
    const result = await this.findOne({
        email
    })
    if (result) {
        return {
            state: false,
            msg: "Email is already used by other user."
        }
    } else {
        const users = await this.find()
        const is_admin = users.length === 0
        const model = new User({
            first_name,
            last_name,
            email,
            password,
            is_admin
        })
        try {
            await model.save()
            return {
                state: true,
                msg: "Your sign up is successful."
            }
        } catch (error: any) {
            return {
                state: false,
                msg: error.message
            }
        }
    }
};

// Method to compare the candidate password with the hashed password
user_schema.statics.verify = async function ({ email, password }): Promise<any> {
    const result = await this.findOne({
        email
    })
    if (result) {
        if (await result.comparePassword(password)) {
            return {
                state: true,
                msg: "Log in is successful."
            }
        } else {
            return {
                state: false,
                msg: "Your password is incorrect."
            }
        }
    } else {
        return {
            state: false,
            msg: "Email is not exists."
        }
    }
};

// Method to compare the candidate password with the hashed password
user_schema.statics.user = async function ({ email }): Promise<any> {
    const result = await this.findOne({
        email
    })
    if (result) {
        return {
            state: true,
            msg: {
                email: result.email,
                first_name: result.first_name,
                last_name: result.last_name,
                is_admin: result.is_admin
            }
        }
    } else {
        return {
            state: false,
            msg: "Email is not exists."
        }
    }
};

const User = mongoose.model<IUser, IUserModel>('User', user_schema)

export default User