const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const morgan = require('morgan'); // <--- AÑADIDO

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // <--- AÑADIDO

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado exitosamente a la base de datos MySQL.');
});

app.get('/', (req, res) => {
    res.send('¡Hola! Esta es la API de tareas.');
});

app.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener tareas:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(results);
    });
});

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM tasks WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener tarea:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(result[0]);
    });
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'El título (title) es requerido' });
    }

    const sql = 'INSERT INTO tasks (title) VALUES (?)';
    
    db.query(sql, [title], (err, result) => {
        if (err) {
            console.error('Error al crear tarea:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(201).json({ id: result.insertId, title: title, completed: false });
    });
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (title === undefined && completed === undefined) {
        return res.status(400).json({ error: 'Se requiere al menos un campo (title o completed) para actualizar' });
    }

    let sql = 'UPDATE tasks SET ';
    const params = [];

    if (title !== undefined) {
        sql += 'title = ?';
        params.push(title);
    }

    if (completed !== undefined) {
        if (params.length > 0) sql += ', ';
        sql += 'completed = ?';
        params.push(completed);
    }

    sql += ' WHERE id = ?';
    params.push(id);

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error al actualizar tarea:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea actualizada exitosamente' });
    });
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar tarea:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea eliminada exitosamente' });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});