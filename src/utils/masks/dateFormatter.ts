import moment from 'moment';

export function dateFormatter(data?: string | null) {
  if (data === null || data === undefined) return '##/##/####';

  let formattedData = moment(data).format('MM/DD/YYYY');

  return formattedData;
}
