const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');

const productRoutes = require('./routes/product.routes');
const customerRoutes = require('./routes/customer.routes');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');
const reportRoutes = require('./routes/report.routes')

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
  credentials: true
}));
app.use(express.json());
app.use('/auth', authRoutes);

app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/reports',reportRoutes);


module.exports = app;