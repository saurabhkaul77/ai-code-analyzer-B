const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();

// CORS configuration
app.use(cors());

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware - ADD THIS
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.path}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/ai', aiRoutes);

// 404 handler - ADD THIS
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        path: req.originalUrl
    });
});

// Error handler - ADD THIS
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(500).json({ 
        error: err.message || 'Internal server error' 
    });
});

module.exports = app;