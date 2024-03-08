import { DashboardData, NukeCode } from './launchcodes.types';

/**
 * Formats the nuke codes based on the provided dashboard data.
 * 
 * @param dashboardData - The dashboard data containing the nuke codes.
 * @param separator - The separator to use between the nuke codes (default: ' ').
 * @param brackets - The brackets to use around each nuke code (default: '[]').
 * @param prefix - The prefix to add before the nuke codes (default: 'Nuke codes').
 * @param useSiloLetters - Indicates whether to use silo letters (e.g., ALPHA, BRAVO, CHARLIE) or single letters (e.g., A, B, C) for the silo labels (default: false).
 * @returns The formatted nuke codes as a string.
 */
export function formatNukeCodes(
    dashboardData: DashboardData,
    separator: string = ' ',
    brackets: string = '[]',
    prefix: string = 'Nuke codes',
    useSiloLetters: boolean = false
): string {
    const { range, codes } = dashboardData.data.dashboard.results.nukecodes;
    const formatDate = (date: string): string => date.split('T')[0];

    const [openBracket, closeBracket] = brackets.length === 2 ? brackets : ['[', ']']; // Ensures custom brackets are correctly formatted
    const siloLabels = !useSiloLetters ? ['ALPHA', 'BRAVO', 'CHARLIE'] : ['A', 'B', 'C'];

    const formattedCodes = siloLabels.map((label, i) => {
        const codeKey = ['ALPHA', 'BRAVO', 'CHARLIE'][i].toLowerCase() as keyof NukeCode;
        const codeValue = codes[i][codeKey] ?? ''; // Use the nullish coalescing operator to fall back to an empty string if the value is undefined
        return `${openBracket}${label}${closeBracket}${separator}${codeValue}`;
    }).join(' ');

    return `${prefix} for ${formatDate(range[0])} to ${formatDate(range[1])} ${formattedCodes}`;
}
(globalThis as any).formatNukeCodes = formatNukeCodes