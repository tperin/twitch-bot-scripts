# Fallout 76 News Nightbot Commands Documentation

## Overview

This document provides details on four Nightbot commands designed for Fallout 76 communities to fetch the latest updates directly from Bethesda's official sources. Each command targets a specific type of update: Patch Notes, Atomic Shop updates, Inside the Vault articles, and the latest news articles of any type.

## Commands and Descriptions

### 1. !patchnotes

Fetches the latest patch notes for Fallout 76.

#### Command Code

```$(eval d=$(urlfetch json https://t.ly/76n1).entries.concat($(urlfetch json https://t.ly/76nn2).entries).concat($(urlfetch json https://t.ly/76nn3).entries);data=$(urlfetch json https://t.ly/77pl_);eval(data.script); calcFallout76UpdateNotes({'entries':d});)```

### 2. !atomicshop

Fetches the latest Atomic Shop updates.

#### Command Code

```$(eval d=$(urlfetch json https://t.ly/76n1).entries.concat($(urlfetch json https://t.ly/76nn2).entries).concat($(urlfetch json https://t.ly/76nn3).entries);data=$(urlfetch json https://t.ly/tim892x-news);eval(data.script); calcFallout76AtomicShop({'entries':d});)```

### 3. !itv

Fetches the latest Inside the Vault article.

#### Command Code

```$(eval d=$(urlfetch json https://t.ly/76n1).entries.concat($(urlfetch json https://t.ly/76nn2).entries).concat($(urlfetch json https://t.ly/76nn3).entries);data=$(urlfetch json https://t.ly/tim892x-news);eval(data.script); calcFallout76ITV({'entries':d});)```

### 4. !news

Fetches the latest article of any type related to Fallout 76.

#### Command Code

```$(eval d=$(urlfetch json https://t.ly/76n1).entries.concat($(urlfetch json https://t.ly/76nn2).entries).concat($(urlfetch json https://t.ly/76nn3).entries);data=$(urlfetch json https://t.ly/tim892x-news);eval(data.script); calcFallout76Latest({'entries':d});)```

## Implementation Details

Each command utilizes the ```$(eval ...)``` function of Nightbot to execute JavaScript code. The process involves fetching JSON data from multiple sources, aggregating entries, and then processing this data through a custom function specific to each command's purpose. The Bethesda API only allows 6 entries to be received at a time, so we hit it 3 times to make sure we get enough entries. This function formats the fetched data into a concise summary suitable for chat display.

## Usage Guidelines

- **Trigger Commands:** Type the command (e.g., ```!patchnotes```) in chat.
- **Response Limitations:** Due to chat length restrictions, summaries may truncate or simplify details.
