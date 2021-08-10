/*
 * NOTE: Why the file is named (renamed) ts and not tsx?
 * https://github.com/microsoft/TypeScript/issues/15713
 * This is a limitation cased by the use of <T> for generic type parameter declarations. 
 * combined with JSX grammar, it makes such components ambiguous to parse.
 * The workaround is to use a function expression instead: 
 * OR rename the file to ts. Another hack is to use a comma in your type 
 * definition (<T,>). E.g:
*/

// type of generic function type (gnf)
type fn_gft = (el: any, index: number | undefined, array: any[] | undefined) => any

type single<T> = (el: T) => T
type double<T> = (el: T, index: number) => T
type triple<T> = (el: T, index: number, array: T[]) => T
type tripleOptional<T> = (el: T, index?: number, array?: T[]) => any

type sortFn = (a: any, b: any) => number

const map2 = function<T>(fn: tripleOptional<T>) { // fn_gft
  return function (array: T []): T[] { return array.map(fn) }
}

function tap<T>(arg: T, fn: (el: T) => void): T {
  fn(arg) // data mutation
  return arg
}

declare function map3<T>(name: string): T;

const map4 = <T>(fn: tripleOptional<T>) => (array: T[]) => array.map(fn);

// map:: fn -> [a] -> [a]
const map = (fn: fn_gft) => (array: any[]) => array.map(fn)
// filter:: fn -> [a] -> [a]
const filter = (fn: fn_gft) => (array: any[]) => array.filter(fn)
// sort:: fn -> [a] -> [a]
const sort = (fn?: sortFn) => (array: any[]) => array.sort(fn)

const find = (fn: fn_gft) => (array: any[]) => array.find(fn)

const isNumber = (value:string): boolean => /^\d+$/.test(value);

const compareObjByName = (objA: {name: string}, objB: {name: string}) => {
    if (objA.name < objB.name) {
      return -1
    }
    if (objA.name > objB.name) {
      return 1
    }
    return 0
}
  
const sortByName = sort(compareObjByName)

export { map, filter, sort, find, isNumber, sortByName };