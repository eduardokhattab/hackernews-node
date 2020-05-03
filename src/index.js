const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => 'This is the API of Hackernews',
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }

      links.push(link)
      return link
    },

    updateLink: (_, args) => {
      element = links.find(l => l.id == args.id)

      if (element !== undefined) {
        elementIndex = links.indexOf(element)

        links[elementIndex].description = args.description
        links[elementIndex].url = args.url

        return links[elementIndex]
      }
      else {
        throw new UserInputError('Form Arguments invalid', {
          invalidArgs: Object.keys(args),
        });
      }
    },

    deleteLink: (_, args) => {
      element = links.find(l => l.id == args.id)

      if (element !== undefined) {
        links.splice(links.indexOf(element), 1)
        return element
      }
      else {
        throw new UserInputError('Form Arguments invalid', {
          invalidArgs: Object.keys(args),
        });
      }
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on localhost:4000`))