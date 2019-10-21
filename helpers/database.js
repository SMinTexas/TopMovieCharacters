const pgp = require("pg-promise")();
const db = pgp("postgres://localhost:5432/favorite_characters");

function getCharacters() {
    var query = `SELECT id, name, description, franchise_id
                 FROM characters 
                 ORDER BY franchise_id, id`;
    return db.any(query);
}

function getCharacter(id) {
    var query = `SELECT c.name, description, image1, image2, image3, quote1,
                 quote2, quote3, a.name AS ally, e.name AS enemy, 
                 f.name AS family, (cr.name || ' ' || cr.year) AS creator,
                 p.name AS performer, w.name AS weapon, t.titles 
                 FROM characters c 
                 INNER JOIN images i ON i.character_id = c.id 
                 INNER JOIN quotes q ON q.character_id = c.id 
                 INNER JOIN allies a ON a.character_id = c.id
                 INNER JOIN enemies e ON e.character_id = c.id
                 INNER JOIN families f ON f.character_id = c.id
                 INNER JOIN creators cr ON cr.character_id = c.id
                 INNER JOIN performers p ON p.character_id = c.id
                 INNER JOIN weapons w ON w.character_id = c.id
                 INNER JOIN appearances t ON t.character_id = c.id
                 WHERE c.id = $1`;
    return db.one(query, [id]);
}

function getMovies() {
    return db.any("SELECT id, title FROM movies;");
}

function getFavorites(userId) {
    return db.any(
        "SELECT title FROM favorites INNER JOIN movies ON(favorites.movie_id = movies.id) WHERE user_id = $1;", [userId]
    );
}

function getMovie(id) {
    return db.one("SELECT * FROM movies WHERE id = $1;", [id]);
}

function addFavorite(userId, movieId) {
    return db.none("INSERT INTO favorites (user_id, movie_id) VALUES ($1, $2)", [
        userId,
        movieId
    ]);
}

module.exports = {
    getCharacters: getCharacters,
    getCharacter: getCharacter,
    getMovies: getMovies,
    getMovie: getMovie,
    addFavorite: addFavorite,
    getFavorites: getFavorites
};