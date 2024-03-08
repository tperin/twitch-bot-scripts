import { ApiResponse } from './falloutnews.types';
// Generic function to find and format a news entry based on a title prefix
/**
 * Formats a news entry from the API response.
 * 
 * @param response - The API response containing the news entries.
 * @param prefix - The prefix used to filter the news entries.
 * @param notFoundMessage - The message to return when no matching news entry is found.
 * @returns The formatted news entry string or the not found message.
 */
export function formatNewsEntry(response: ApiResponse, prefix: string, notFoundMessage: string): string {
    const firstMatch = response.entries.find(entry => entry.title.startsWith(prefix));

    if (!firstMatch) {
        return notFoundMessage;
    }

    // Calculate the base length excluding the blurb length
    const baseLength = `[${firstMatch.date}] ${firstMatch.title} -  - https://fallout.bethesda.net${firstMatch.url}`.length;
    const maxLength = 400 - baseLength; // Maximum length available for the blurb

    let blurb = firstMatch.blurb;
    // Check if the total length exceeds 400 characters
    if (blurb.length > maxLength) {
        // If it does, shorten the blurb to fit, leaving space for "..."
        blurb = blurb.substring(0, maxLength - 3) + '...';
    }

    return `[${firstMatch.date}] ${firstMatch.title} - ${blurb} - https://fallout.bethesda.net${firstMatch.url}`;
}

// Specific functions utilizing the generic function
/**
 * Calculates the Fallout 76 update/patch notes based on the provided API response.
 * If the latest update is not found, it returns a default message.
 * 
 * @param response - The API response containing the update notes.
 * @returns The formatted Fallout 76 update notes or a default message if not found.
 */
function calcFallout76UpdateNotes(response: ApiResponse): string {
    return formatNewsEntry(response, "Fallout 76 Update Notes", "Could not find latest update");
}
(globalThis as any).calcFallout76UpdateNotes = calcFallout76UpdateNotes

/**
 * Calculates the Fallout 76 Inside the Vault news entry based on the provided API response.
 * If the latest ITV is not found in the response, it returns a default error message.
 * 
 * @param response The API response containing the news entries.
 * @returns The formatted Fallout 76 Inside the Vault news entry or an error message.
 */
function calcFallout76ITV(response: ApiResponse): string {
    return formatNewsEntry(response, "Fallout 76 Inside the Vault", "Could not find latest ITV");
}
(globalThis as any).calcFallout76ITV = calcFallout76ITV


/**
 * Calculates the Fallout 76 Atomic Shop response.
 * 
 * @param response - The API response.
 * @returns The formatted news entry for the Atomic Shop Weekly Update, or a default message if the update is not found.
 */
function calcFallout76AtomicShop(response: ApiResponse): string {
    return formatNewsEntry(response, "Atomic Shop Weekly Update", "Could not find latest Atomic Shop update");
}
(globalThis as any).calcFallout76AtomicShop = calcFallout76AtomicShop


/**
 * Calculates the latest Fallout 76 news based on the provided API response.
 * @param response - The API response containing the news entries.
 * @returns A string representing the latest Fallout 76 news, including the date, title, blurb, and URL.
 * If no latest post is found, returns "Could not find latest post".
 */
function calcFallout76Latest(response: ApiResponse): string {
    return formatNewsEntry(response, "", "Could not find latest update");
}
(globalThis as any).calcFallout76Latest = calcFallout76Latest

function get_response(offset: number) {
    const url = `https://fallout.bethesda.net/_api/v1/components/news?tag=&games=&exclude=&offset=${offset}-0&lang=en`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9',
            // Add other headers as necessary
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        throw error; // Rethrow to ensure calling code can handle the failure
    });
}

async function fetchItems(totalItems: number) {
    const itemsPerPage = 10; // Given by the API
    const results = [];
    for (let offset = 0; results.length < totalItems; offset += itemsPerPage) {
        const response = await get_response(offset);
        // Assuming response.entries holds the items
        results.push(...response.entries);
        // Break if we fetched all items or if there are no more items to fetch
        if (response.entries.length < itemsPerPage) break;
    }
    // Truncate the array to the desired totalItems in case we fetched more
    return results.slice(0, totalItems);
}

// Usage example
// fetchItems(30).then((items) => {
//     const res = calcFallout76Latest({ entries: items });
//     console.log(res); // Process the fetched items
// });

// Usage
// Assuming `sampleResponse` is the variable holding the JSON response