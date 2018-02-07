export const currency = (price = null) => `R$ ${price.toFixed(2)}`

export const lower = (text = null) => {
	return text ? text.toLowerCase() : ''
}