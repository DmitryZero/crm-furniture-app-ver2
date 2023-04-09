type Result<T> = {result: true, data: T, statusCode: number} | {result: false, error: string, statusCode: number};

export default Result;