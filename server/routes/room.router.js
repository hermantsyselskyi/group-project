const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res)=>{
    const queryText =   `select 
                            room.id as id, 
                            room.room_name, 
                            room.duration_metric as metric, 
                            location_type.location_type as location_type 
                        from room
                        join location_type on room.location_type_id = location_type.id
                        group by room.id, location_type.location_type
                        order by room.id;`;
    pool.query(queryText)
        .then(result => res.send(result.rows))
        .catch(error=>{
            console.log("Error handling GET for rooms: ", error)
            res.sendStatus(404);
        });
});
    
router.post('/', (req, res)=>{
    const room = req.body;
    console.log(room);
    const queryText = 'insert into room ("room_name", "location_type_id", "duration_metric") values ($1, $2, $3);';
    pool.query(queryText, [room.room_name, room.location_type_id, room.duration_metric])
        .then(result => res.sendStatus(201))
        .catch(error => {
            console.log('Error handling POST for /api/room: ', error);
            res.sendStatus(500);
        });
});

router.get('/location', (req, res)=>{
    const queryText = 'select * from location_type;';
    pool.query(queryText)
        .then(result=>res.send(result.rows))
        .catch(error=>{
            console.log('Error handling GET for /api/room/location: ', error);
            res.sendStatus(404);
        });
});

router.post('/location', (req, res)=>{
    const location = req.body;
    const queryText = 'insert into location_type ("location_type") values ($1);';
    pool.query(queryText, [location.location_type])
        .then(result => res.sendStatus(201))
        .catch(error => {
            console.log('Error handling POST for /api/room/location: ', error);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res)=>{
    const queryText = 'delete from room where id = $1;';
    pool.query(queryText, [req.params.id])
        .then(result => res.sendStatus(200))
        .catch(error=>{
            console.log('Error handling DELETE for /api/room: ', error);
            res.sendStatus(403);
        });
});

module.exports = router;