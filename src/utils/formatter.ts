export const dateFormatter = new Intl.DateTimeFormat('en-US')

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})
