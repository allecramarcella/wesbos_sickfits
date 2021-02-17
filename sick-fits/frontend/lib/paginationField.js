

export default function paginationField(){
  return {
    keyArgs: false, //tells apollo we will take care of everything
    read(excisting = [], { args, cache }){
      // first thing it does it asks the read function for those items.

      // we can either do one of two things:

      // 1. we can do is return the items because they are already in the cache

      // 2. we can do is to return false from here, (network request)
    },
    merge(){
      // this runs when the apollo client comes back from the netwrok with our product
    },
  }
}