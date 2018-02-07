export const addMaxResults = (max) => `max_results=${max}`

export const addPage = (page) => `page=${page}`

export const addWhere = (prop, value) => `where=${encoding('{')}"${prop}"${encoding(':')}"${value}"${encoding('}')}`

// 'https://zgcheckout.herokuapp.com/api/products?where=%7B%22name%22%3A%22Amaciante%22%7D'
// 'https://zgcheckout.herokuapp.com/api/products?where=%7B%27name%27%3A%27%27%7D'
export const encoding = (char) => {
	switch (char) {
		case '{':
			return '%7B'
		case '}':
			return '%7D'
		case ':':
			return '%3A'
		default:
			return char
	}
}