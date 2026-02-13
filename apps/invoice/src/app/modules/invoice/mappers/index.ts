import { CreateInvoiceTcpRequest } from '@common/interfaces/tcp/invoice';
import { Invoice } from '@commonjs/schemas/invoice.schema';

export const invoiceRequestMapping = (data: CreateInvoiceTcpRequest): Partial<Invoice> => {
  return {
    ...data,
    totalAmount: data.items.reduce((acc, item) => acc + item.total, 0),
    vatAmout: data.items.reduce((acc, item) => acc + item.unitPrice * item.quantity * (item.vatRate / 100), 0),
  };
};
