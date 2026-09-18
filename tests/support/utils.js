
export const parseMoeda = (valor) => Number(valor.replace('R$', '').replace(/\./g, '').replace(',', '.'))
