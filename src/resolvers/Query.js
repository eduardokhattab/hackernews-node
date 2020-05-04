function feed(root, args, context, info) {
  return context.prisma.links()
}

function info(){ return "oi" }

module.exports = {
  feed,
  info,
}