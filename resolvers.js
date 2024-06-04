const { Event, Performer } = require('./models');

const resolvers = {
  Query: {
    events: async () => {
      return await Event.findAll();
    },
    event: async (_, { id }) => {
      return await Event.findByPk(id);
    },
  },
  Mutation: {
    createEvent: async (_, { input }) => {
      return await Event.create(input);
    },
    updateEvent: async (_, { id, input }) => {
      const event = await Event.findByPk(id);
      if (!event) {
        throw new Error('Event not found');
      }
      return await event.update(input);
    },
    deleteEvent: async (_, { id }) => {
      const event = await Event.findByPk(id);
      if (!event) {
        throw new Error('Event not found');
      }
      await event.destroy();
      return true;
    },
  },
};

module.exports = resolvers;