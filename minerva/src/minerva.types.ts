/**
 * Represents a Minerva sale.
 */
export type Sale = {
    /**
     * The Fallout 76 location of the sale.
     */
    location: string;
    /**
     * The ID of the sale.
     */
    id: number;
    /**
     * Indicates if the sale is a super sale.
     */
    isSuper: boolean;
    /**
     * The items available for sale.
     */
    items: string[];
    /**
     * The start time of the sale.
     */
    start: string;
    /**
     * The end time of the sale.
     */
    end: string;
};

export type SalesData = {
    sales: Sale[];
};