import { calcMinerva } from './minerva';

describe('calcMinerva', () => {
  // Test 1: Default case with no saleId provided
  it('should return the current or next upcoming sale', () => {
    const result = calcMinerva();
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).not.toBe("Unknown, data needs to be updated");
    expect(result).not.toBe("No data on this sale");
  });

  // Test 2: Case with valid saleId
  it('should return the sale with the matching ID', () => {
    const saleId = "16";
    const result = calcMinerva(saleId);
    expect(result).toBe("Minerva is at The Whitespring for another 3 days and 16 hours until Mar 11, 12:00 PM EST [Sale 16 SUPER SALE] Items: [All items from sales 13 14 and 15, use !minerva SALE for more details (e.g. !minerva 13)]");
    expect(result).not.toBeNull();
    expect(result).not.toBe("Unknown, data needs to be updated");
    expect(result).not.toBe("No data on this sale");
  });

  // Test 3: Case with invalid saleId
  it('should return "No data on this sale"', () => {
    const saleId = "100";
    const result = calcMinerva(saleId);
    expect(result).toBe("No data on this sale");
  });
});