import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    console.log('Starting: '.green.inverse, 'Import All Data'.yellow)
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUserId = createdUsers[0]._id
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUserId }
        })

        await Product.insertMany(sampleProducts)

        console.log('Imported: '.green.inverse, 'All Data'.yellow)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    console.log('Starting: '.green.inverse, 'Destroy All Data'.yellow)
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Destroyed: '.red.inverse, 'All Data'.yellow)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const importProducts = async () => {
    console.log('Starting: '.green.inverse, 'Import Products'.yellow)
    try {
        await Product.deleteMany()
        const admins = await User.find({ 'isAdmin': true })

        // const createdUsers = await User.insertMany(users)
        const adminUserId = admins[0]._id
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUserId }
        })

        await Product.insertMany(sampleProducts)

        console.log('Imported: '.green.inverse, 'New Products List'.yellow)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyProducts = async () => {
    console.log('Starting: '.green.inverse, 'Destroy Products'.yellow)
    try {
        await Product.deleteMany()

        console.log('Destroyed: '.red.inverse, 'Products'.yellow)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyOrders = async () => {
    console.log('Starting: '.green.inverse, 'Destroy Orders'.yellow)
    try {
        await Order.deleteMany()

        console.log('Destroyed: '.red.inverse, 'Orders'.yellow)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d' && process.argv[3] === '-o') {
    destroyOrders()
} else if (process.argv[2] === '-d' && process.argv[3] === '-p') {
    destroyProducts()
} else if (process.argv[2] === '-p') {
    importProducts()
} else if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}