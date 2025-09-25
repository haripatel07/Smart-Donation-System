require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function run() {
    await connectDB();

    const args = process.argv.slice(2);
    const email = args[0] || process.env.ADMIN_EMAIL;
    const password = args[1] || process.env.ADMIN_PASSWORD || 'admin123';
    const name = args[2] || process.env.ADMIN_NAME || 'Administrator';

    if (!email) {
        console.error('Usage: node create_admin.js <email> [password] [name]');
        process.exit(1);
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            if (user.role === 'admin') {
                console.log('Admin user already exists:', email);
                process.exit(0);
            }
            user.role = 'admin';
            await user.save();
            console.log('Existing user promoted to admin:', email);
            process.exit(0);
        }

        const hashed = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashed, role: 'admin' });
        await user.save();
        console.log('Admin user created:', email);
        process.exit(0);
    } catch (err) {
        console.error('Error creating admin:', err);
        process.exit(1);
    }
}

run();
