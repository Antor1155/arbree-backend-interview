const Event = require("../models/Event");

module.exports = {
  createEvent: async (body) => {
    try {
      const data = await Event.create(body);

      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },

  getEvent: async (filter, option, populate) => {
    try {
      const data = await Event.findOne(filter, option).populate(populate);

      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },

  updateEvent: async (filter, body) => {
    try {
      const data = await Event.findOneAndUpdate(filter, body, {
        new: true,
      });

      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },

  deleteEvent: async (filter) => {
    try {
      const data = await Event.findOneAndDelete(filter);

      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },

  findEvent: async (filter, sort, skip, limit) => {
    try {
      const data = await Event.find(filter).sort(sort).skip(skip).limit(limit);

      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },

  listEvent: async ({
    offset,
    limit,
    currentPage,
    sort_by,
    sort_order,
    title,
  }) => {
    try {
      const filter = {
        $match: {},
      };

      if (title) {
        filter.$match.title = { $regex: title, $options: "i" };
      }

      const pipeline = [
        filter,
        {
          $sort: {
            [sort_by ? sort_by : "_id"]: sort_order === "asc" ? 1 : -1,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            results: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            _id: 0,
            total: 1,
            results: { $slice: ["$results", offset, limit] },
          },
        },
      ];

      let docs = await Event.aggregate(pipeline);

      if (docs.length === 0) {
        return {
          results: [],
        };
      }

      docs = docs[0];

      const last_page = Math.ceil(docs.total / limit);
      return {
        first_page: currentPage === 1 ? null : 1,
        previous: currentPage === 1 ? null : currentPage - 1,
        next: offset + limit >= docs.total ? null : currentPage + 1,
        last_page: last_page === currentPage ? null : last_page,
        size: Array.isArray(docs.results) ? docs.results.length : null,
        ...docs,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
