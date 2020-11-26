function moneyFormatter(raw) {
  if (!raw) return '-';
  return raw.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
}

export default {
  methods: {
    moneyFormatter,
  },
  filters: {
    moneyFormatter,
  },
};
