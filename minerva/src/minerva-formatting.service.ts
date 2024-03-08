import { Sale, SalesData } from './minerva.types';
import { formatDate, getTimeSinceInDaysHours, getTimeRemainingInDaysHours } from './date-time.utils';

/**
 * Formats the Minerva sale information into a string.
 * @param sale The sale object.
 * @returns The formatted string.
 */
export function formatMinervaSale(sale: Sale): string {
    const now = new Date();
    const startTime = new Date(sale.start);
    const endTime = new Date(sale.end);

    let formattedSale = "Minerva ";

    if (now > endTime) {
        formattedSale += `was at ${sale.location} ${getTimeSinceInDaysHours(now, endTime)} ago at ${formatDate(endTime)}`; // Sale has already ended
    } else if (now < startTime) {
        formattedSale += `will be at ${sale.location} in ${getTimeRemainingInDaysHours(now, startTime)} at ${formatDate(startTime)}`; // Sale has not started yet
    } else {
        formattedSale += `is at ${sale.location} for another ${getTimeRemainingInDaysHours(now, endTime)} until ${formatDate(endTime)}`; // Sale is currently ongoing
    }
    let formattedItems = sale.items.map(item => {
        return item
            .replace(/right leg/i, 'RL')
            .replace(/left leg/i, 'LL')
            .replace(/right arm/i, 'RA')
            .replace(/left arm/i, 'LA')
            .replace(/chest piece/i, 'T');
    })
    formattedSale += ` [Sale ${sale.id}${sale.isSuper ? " SUPER SALE" : ""}] Items: [${formattedItems.join("][")}]`;

    return formattedSale;
}
