// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import restaurants from './Restaurants'
import dish from './Dish'
import featured from './Featured'
import category from './category'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    restaurants,
    category,
    dish,
    featured,
  ]),
})
