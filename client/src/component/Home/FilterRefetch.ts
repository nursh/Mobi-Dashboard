type Quarter = '1st' | '2nd' | '3rd';

interface Filter {
  status?: string;
  request?: string;
  quarter?: string;
}

export function createFilter(filters: Filter): Filter {
  let item: keyof Filter;

  for (item in filters) {
    if (filters[item] === 'All')
      delete filters[item];
  }

  return filters;
}