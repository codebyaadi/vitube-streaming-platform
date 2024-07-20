import mongoose from "mongoose";

const connectDB = async (mongoURI) => {
    try {
        if (!mongoURI) {
            throw new Error("MongoDB URI is not provided");
        }

        const loadingAnimation = [".", "..", "..."];
        let animationIndex = 0;

        const loadingInterval = setInterval(() => {
            process.stdout.write(
                `Connecting to MongoDB${loadingAnimation[animationIndex]}\r`
            );
            animationIndex = (animationIndex + 1) % loadingAnimation.length;
            if (animationIndex == 3) {
                animationIndex = 0;
            }
        }, 500);

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        clearInterval(loadingInterval); // Clear the loading animation
        console.log("\nConnected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

export default connectDB;
