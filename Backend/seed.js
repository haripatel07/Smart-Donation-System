const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Category = require("./models/Category");
const Donation = require("./models/Donation");
const connectDB = require("./config/db");

const seedData = async () => {
    try {
        await connectDB();
        console.log("Connected to database");

        // Clear existing data
        await User.deleteMany();
        await Category.deleteMany();
        await Donation.deleteMany();

        // Create users
        const hashedPassword = await bcrypt.hash("password123", 10);
        const users = await User.insertMany([
            {
                name: "Admin User",
                email: "admin@example.com",
                password: hashedPassword,
                role: "admin",
                phone: "9876543210",
                address: "12 MG Road, Bengaluru"
            },
            {
                name: "Rahul Sharma",
                email: "rahul.sharma@example.com",
                password: hashedPassword,
                role: "user",
                phone: "9123456789",
                address: "45 Nehru Nagar, Delhi"
            },
            {
                name: "Priya Iyer",
                email: "priya.iyer@example.com",
                password: hashedPassword,
                role: "user",
                phone: "9988776655",
                address: "78 Anna Salai, Chennai"
            },
            {
                name: "Arjun Mehta",
                email: "arjun.mehta@example.com",
                password: hashedPassword,
                role: "user",
                phone: "9011223344",
                address: "22 CG Road, Ahmedabad"
            },
            {
                name: "Neha Verma",
                email: "neha.verma@example.com",
                password: hashedPassword,
                role: "user",
                phone: "9099887766",
                address: "56 Park Street, Kolkata"
            }
        ]);

        console.log("Users created");

        // Create categories
        const categories = await Category.insertMany([
            {
                name: "Food",
                description: "Non-perishable food items and groceries"
            },
            {
                name: "Clothing",
                description: "Clothes, shoes, and accessories"
            },
            {
                name: "Books",
                description: "Educational and recreational books"
            },
            {
                name: "Medical Supplies",
                description: "First aid kits, medicines, and medical equipment"
            },
            {
                name: "Household Items",
                description: "Furniture, appliances, and home essentials"
            },
            {
                name: "Toys",
                description: "Children’s toys and games"
            },
            {
                name: "Electronics",
                description: "Small gadgets and electronic devices"
            },
            {
                name: "Stationery",
                description: "Notebooks, pens, art and craft materials"
            }
        ]);

        console.log("Categories created");

        // Create donations
        const donations = await Donation.insertMany([
            {
                donorName: "Rahul Sharma",
                userId: users[1]._id,
                item: "Rice Bags",
                category: categories[0]._id,
                quantity: 15,
                status: "Approved"
            },
            {
                donorName: "Priya Iyer",
                userId: users[2]._id,
                item: "Sarees",
                category: categories[1]._id,
                quantity: 6,
                status: "Approved"
            },
            {
                donorName: "Rahul Sharma",
                userId: users[1]._id,
                item: "Engineering Books",
                category: categories[2]._id,
                quantity: 12,
                status: "Pending"
            },
            {
                donorName: "Priya Iyer",
                userId: users[2]._id,
                item: "First Aid Kits",
                category: categories[3]._id,
                quantity: 25,
                status: "Approved"
            },
            {
                donorName: "Rahul Sharma",
                userId: users[1]._id,
                item: "Steel Utensils",
                category: categories[4]._id,
                quantity: 10,
                status: "Rejected"
            },
            {
                donorName: "Arjun Mehta",
                userId: users[3]._id,
                item: "Toy Cars",
                category: categories[5]._id,
                quantity: 20,
                status: "Approved"
            },
            {
                donorName: "Neha Verma",
                userId: users[4]._id,
                item: "Mobile Phones (used)",
                category: categories[6]._id,
                quantity: 3,
                status: "Pending"
            },
            {
                donorName: "Arjun Mehta",
                userId: users[3]._id,
                item: "Sketchbooks & Crayons",
                category: categories[7]._id,
                quantity: 40,
                status: "Approved"
            },
            {
                donorName: "Neha Verma",
                userId: users[4]._id,
                item: "Bedsheets",
                category: categories[4]._id,
                quantity: 12,
                status: "Approved"
            }
        ]);

        console.log("Donations created");

        console.log("Database seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedData();
