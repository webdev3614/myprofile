import mongoose, { CallbackError, Model } from "mongoose";
import bcrypt from "bcrypt";
import user_schema, { IUser } from "./schema";

interface IUserModel extends Model<IUser> {
    add({ first_name, last_name, email, password }: { first_name: string, last_name: string, email: string, password: string }): Promise<boolean>;
}

// Middleware to hash the password before saving the user document
user_schema.pre<IUser>("save", async function (next) {
    if (this.isModified("password")) {
        try {
            // Generate a salt with 10 rounds
            const salt = await bcrypt.genSalt(10);
            // Hash the password using the salt
            this.password = await bcrypt.hash(this.password, salt);
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
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        throw new Error("Password comparison failed");
    }
};

// Method to compare the candidate password with the hashed password
user_schema.statics.add = async function ({first_name,last_name,email,password}): Promise<boolean> {
    const result =await this.findOne({
        email
    })
    if(result){
        return false
    }else{
        const model = new User({
            first_name,
            last_name,
            email,
            password
        })
        model.save()
        return true
    }
};

const User = mongoose.model<IUser,IUserModel>('User', user_schema)

export default User