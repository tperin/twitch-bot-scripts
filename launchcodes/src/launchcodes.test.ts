import { formatNukeCodes } from './launchcodes'; // Adjust the import path as necessary
import { DashboardData } from './launchcodes.types';

describe('formatNukeCodes', () => {
  // Test 1: Default Formatting
  it('should format nuke codes with default settings', () => {
    const dashboardData: DashboardData = {
      data: {
        dashboard: {
          results: {
            nukecodes: {
              range: ['2023-01-01T00:00:00Z', '2023-01-08T00:00:00Z'],
              codes: [
                { alpha: '123' },
                { bravo: '456' },
                { charlie: '789' },
              ],
            },
          },
        },
      },
    };

    const result = formatNukeCodes(dashboardData);
    expect(result).toBe('Nuke codes for 2023-01-01 to 2023-01-08 [ALPHA] 123 [BRAVO] 456 [CHARLIE] 789');
  });

  // Test 2: Custom Separator and Brackets
  it('should format nuke codes with custom separator and brackets', () => {
    const dashboardData: DashboardData = {
        data: {
          dashboard: {
            results: {
              nukecodes: {
                range: ['2023-01-01T00:00:00Z', '2023-01-08T00:00:00Z'],
                codes: [
                  { alpha: '123' },
                  { bravo: '456' },
                  { charlie: '789' },
                ],
              },
            },
          },
        },
      };
    const result = formatNukeCodes(dashboardData, '|', '{}', 'Nuke codes', true);
    expect(result).toBe('Nuke codes for 2023-01-01 to 2023-01-08 {A}|123 {B}|456 {C}|789');
  });

  // Test 3: Missing Codes
  it('should handle missing nuke codes gracefully', () => {
    const dashboardData: DashboardData = {
      data: {
        dashboard: {
          results: {
            nukecodes: {
              range: ['2023-01-01T00:00:00Z', '2023-01-08T00:00:00Z'],
              codes: [{}, {}, {}], // Empty codes
            },
          },
        },
      },
    };

    const result = formatNukeCodes(dashboardData);
    expect(result).toBe('Nuke codes for 2023-01-01 to 2023-01-08 [ALPHA]  [BRAVO]  [CHARLIE] '); // Adjust the expected result based on function behavior
  });
});
