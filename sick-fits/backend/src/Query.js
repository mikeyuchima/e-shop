const {forwardTo} = require('prisma-binding')

const Query = {
    items = forwardTo('db')
//   async items(parents, args, context, info) {
//     const items = await context.db.query.items();

//     return items;
//   },
};

module.exports = Query;
