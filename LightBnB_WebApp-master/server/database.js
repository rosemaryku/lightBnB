const properties = require('./json/properties.json');
const users = require('./json/users.json');
const db = require('./db/index');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */ 
 const getUserWithEmail = function (email) {
  const queryString = `SELECT * FROM users WHERE email = $1`;
  return db
    .query(queryString, [email])
    .then(res => res.rows[0])
    .catch(err => console.error(err.message));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryStr = `SELECT * FROM users WHERE id = $1;`
  return db
    .query(queryStr, [id])
    .then(res => res.rows[0])
    .catch(err => console.log(err.message))
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addUser = function(user) {
  const values = [`${user.name}`, `${user.email}`, `${user.password}`]
  const queryStr = `INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3) RETURNING *;`

  return db
  .query(queryStr, values)
  .then(res => res.rows[0])
  .catch(err => console.log(err.message))
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const values = [`${guest_id}`, `${limit}`]
  const queryStr = `
    SELECT *
    FROM reservations 
    JOIN properties ON property_id = properties.id 
    WHERE guest_id = $1 
    LIMIT $2;`
  return db
    .query(queryStr, values)
    .then(res => res.rows)
    .catch(err => console.log(err.message))
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id LIKE $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `AND cost_per_night >= $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `AND cost_per_night <= $${queryParams.length}`;
  }

  queryString += `
  GROUP BY properties.id `;
  
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }
  
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return db.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

  const queryParams = [`${property.owner_id}`,`${property.title}`,`${property.description}`,`${property.thumbnail_photo_url}`,`${property.cover_photo_url}`,`${property.cost_per_night}`,`${property.street}`,`${property.city}`,`${property.province}`,`${property.post_code}`,`${property.country}`,`${property.parking_spaces}`,`${property.number_of_bathrooms}`, `${property.number_of_bedrooms}`]

  const queryString = `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`

  return db
    .query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => err.message);
}
exports.addProperty = addProperty;
