const objection = require("objection")

const Model = require("./Model")

class Meme extends Model {
  static get tableName() {
    return "memes"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "image"],
      properties: {
        title: { type: "string" },
        image: { type: "string" },
        userId: { type: ["integer", "string"] }
      }
    }
  }

  static get relationMappings() {
    const { User } = require("./index")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "memes.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Meme