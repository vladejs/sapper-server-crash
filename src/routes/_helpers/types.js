import Task from 'data.task'

export const Box = x =>
  ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
  })

export const Right = x =>
  ({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    concat: o =>
      o.fold(
        e => Left(e),
        r => Right(x.concat(r))),
    inspect: () => `Right(${x})`,
  })

export const Left = x =>
  ({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x),
    concat: o => Left(x),
    inspect: () => `Left(${x})`
  })

export const fromNullable = x => x != null ? Right(x) : Left(x)

export const ID = x => x
export const Null = _ => null

export const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e);
  }
}

export const Sum = x =>
  ({
    x,
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`
  })

Sum.empty = () => Sum(0)


export const All = x =>
  ({
    x,
    concat: ({x: y}) => All(x && y),
    inspect: () => `All(${x})`
  })

All.empty = () => All(true)

export const First = x =>
  ({
    x,
    concat: _ => First(x),
    inspect: () => `First(${x})`
  })

export const Product = x =>
  ({
    x,
    concat: ({x: y}) => Product(x * y),
    inspect: () => `Product(${x})`
  })

Product.empty = () => Product(1)

export const Any = x =>
  ({
    x,
    concat: ({x: y}) => Any(x || y),
    inspect: () => `First(${x})`
  })

Any.empty = () => Any(false)

export const Min = x =>
  ({
    x,
    concat: ({x: y}) => Min(x < y ? x : y),
    inspect: () => `Min(${x})`
  })

Min.empty = () => Min(Infinity)

export const Max = x =>
  ({
    x,
    concat: ({x: y}) => Max(x > y ? x : y),
    inspect: () => `Max(${x})`
  })

Max.empty = () => Max(-Infinity)

export const trace = tag => x => {
  console.log(tag);

  console.log(x);
  return x;
}

export const eitherToTask = either =>
  either.fold(Task.rejected, Task.of);
