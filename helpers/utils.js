module.exports = {

  /**
   * Generates a random arbitrary number within range
   */
  randomNum: function (min, max) {
    return Math.random() * (max - min) + min;
  },

  /**
   * Generates a random integer within range
   */
  randomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Turns a regular old string into a slug (e.g. 'My Name is John' => 'my-name-is-john')
   */
  slugify: function (text) {
    return text.toLowerCase()
      .replace(/[^\w ]+/g,'')
      .replace(/ +/g,'-');
  }

};