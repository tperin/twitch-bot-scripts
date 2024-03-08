# `!codes` Nightbot Command Documentation

## Overview

The `!codes` command is designed for use in Twitch chat through Nightbot, enabling the automatic fetching and formatting of the latest Fallout 76 nuke codes directly from a GraphQL database. This command simplifies the process of obtaining nuke codes by executing a custom script to format and display the codes in chat, providing a seamless experience for viewers.

## Command Details

### Trigger Command

The command trigger for initiating the nuke code fetch and display process is:

```!codes```

### Command Code

The Nightbot command code for `!codes` is as follows:

```$(eval var dashboard=$(urlfetch json https://t.ly/nukacrypt); data=$(urlfetch json https://t.ly/tim892x-nukes); eval(data.script); formatNukeCodes(dashboard))```

This command performs several operations:

1. **Fetch Dashboard Data:** Retrieves the latest nuke codes data from a predefined GraphQL database URL using `$(urlfetch json https://t.ly/nukacrypt)`.

2. **Fetch Formatting Script:** Downloads a custom JavaScript script from `https://t.ly/tim892x-nukes` that contains the `formatNukeCodes` function. This function is responsible for formatting the fetched nuke codes into a readable string.

3. **Execute Script and Format Codes:** Evaluates the fetched script and calls the `formatNukeCodes` function, passing the dashboard data as its argument. The function returns a string formatted according to the specified logic within the script.

4. **Display Formatted Codes:** The formatted nuke codes string is then automatically displayed in the Twitch chat, allowing viewers to easily access the latest codes.

## Usage

To use the `!codes` command, simply type ```!codes``` in the chat during a Twitch stream where Nightbot is active. The command will automatically execute the steps outlined above and display the latest Fallout 76 nuke codes in chat.

## Customization

- **Command and URLs:** The URLs used in the command (`https://t.ly/nukacrypt` and `https://t.ly/tim892x-nukes`) point to the data source and the formatting script, respectively. These can be updated or customized as needed to point to different data sources or scripts.
  
- **Formatting Function:** The behavior of the `formatNukeCodes` function can be modified by adjusting the nightbot code to add more arguments for custom separators, prefixes, or brackets.
