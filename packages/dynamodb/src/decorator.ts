export function table(tableName: string): ClassDecorator {
  // this is the decorator factory
  return function(target) {
    console.log('this is the table decorator!', target, tableName)
    // this is the decorator
    // do something with 'target' and 'value'...
  }
}
