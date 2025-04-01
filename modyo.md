# modyo

Modyo - Memory

Create project 
Vite - React - TypeScript

2.1 Pantallas

1. Display modal requesting for player name
- The name must be stored in the cache so that if the page is refreshed, the name is retained (The rest of the session will be saved later).

2. remove modal y and show card board only
3. Initial state: {
        1. clickedID0 = null
        2. clickedID1 = null
        3. totalPairs = entries.length
        4. availablePairs = entries.length
        5. Incorrect = 0
        6. Correct = 0
    }
4. Counter correct - incorrect,
    1. On a click, have a listener such that. 
    2. On click id (nameId) i.e. -> clicked0 = id.slug looking for -> clicked1 = id.slug where id0.slug === id1.slug
    3. If clickedID0.slug !== clickedID1.slug -> Then, clickedID0 & ID1 - reset and incorrect++
    4. If clickedID0.slug === clickedID1.slug -> Then, clickedID0 & ID1 - reset AND correct++ AND availablePairs— — 
5. Display both correct and incorrect counters in the screen. 
6. Have a counter that stores the total number of pairs.
7. Have a counter that stores the available number of pairs
8. When availablePairs = 0, THEN -> CONGRATULATIONS modal.
9. Add reset button.
10. (API CALL) From entry we just need... => entry.meta.name, entry.fields -> entry.fields.image, url …….
LOGIC COMPLETED


2. Styles
3. Tailwind

4. 
