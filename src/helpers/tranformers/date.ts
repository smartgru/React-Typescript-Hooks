import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const transformEntityISODateField = (entity: Record<string, unknown>, field: string, dateFormat: string) => {
  return { ...entity, [field]: format(parseISO(entity[field] as string), dateFormat) };
};
