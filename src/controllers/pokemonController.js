const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM pokemon', (err, pokemons) => {
            if (err) {
                res.json(err);
            }
            res.render('pokemons', {
                data: pokemons
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO pokemon SET ?', [data], (err, pokemons) => {
            res.redirect('/');
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM pokemon WHERE id = ?', [id], (err, pokemons) => {
            
            res.render('pokemon_edit', {
                data: pokemons[0]
            });
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM pokemon WHERE id = ?', [id], (err, pokemons) => {
            res.redirect('/');
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newPokemon = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE pokemon set ? WHERE id = ?', [newPokemon, id], (err, pokemons) => {
            res.redirect('/');
        });
    });
};

module.exports = controller;
