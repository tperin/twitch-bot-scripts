import { formatMinervaSale } from './minerva-formatting.service';
import salesData from '../data/minerva.data.json';

/**
 * Calculates and formats sales information for a given sale ID or finds the current sale based on the date.
 * 
 * @param saleId The ID of the sale to calculate information for, or null to find the current sale.
 * @param data The data containing all sales.
 * 
 * @returns The formatted sales information or a message indicating no data or the need for an update.
 */
 export function calcMinerva(saleIdStr: string = ""): string | null {
    const now = new Date();
    let saleId: number;
    if (saleIdStr.replace("#","").replace("null","").length > 0){
        saleId = parseInt(saleIdStr.replace("#",""));
    }
    else {
        saleId = -1;
    }

    // If saleId is null or negative, find the current or next upcoming sale.
    if (saleId == null || saleId < 0) {
        const currentOrNextSale = salesData.sales.find(sale => {
            const start = new Date(sale.start);
            const end = new Date(sale.end);
            return now <= end;
        });

        if (currentOrNextSale) {
            return formatMinervaSale(currentOrNextSale);
        } else {
            return "Unknown, data needs to be updated";
        }
    } else {
        // Find the sale with the matching ID.
        const sale = salesData.sales.find(s => s.id === saleId);
        if (sale) {
            return formatMinervaSale(sale);
        } else {
            return "No data on this sale";
        }
    }
}

(globalThis as any).calcMinerva = calcMinerva