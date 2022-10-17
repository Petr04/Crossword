# Crossword component for SuperKid

![](https://i.ibb.co/jZcZcSy/crossword.png)

## Run demo
```
npm start
```

## Integration with the main project

### Frontend
The main game component can be found at `src/components/GameLayout.jsx`. It contains only elements\
related directly to the game (crossword grid, clues, etc). For instance, it doesn't provide any background image.
`src/App.js` exists only for demonstration purposes.

### Backend
The file for realization of interaction with backend can be found at `src/api/CrosswordAPI.js`.\
At the moment methods in it return sample values.
