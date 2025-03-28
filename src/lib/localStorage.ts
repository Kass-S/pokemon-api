const saveToFavorites = (pkmn: string) => {
    if (typeof window === 'undefined') return;
    
    let pkmnArr: string[] = getFromFavorites();

    if(!pkmnArr.includes(pkmn)){
        pkmnArr.push(pkmn);
    }
    localStorage.setItem('Favorite', JSON.stringify(pkmnArr));
}

const getFromFavorites = () => {
    if (typeof window === 'undefined') return [];

    let localStorageData = localStorage.getItem('Favorite');

    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
}

const removeFromFavorites = (pkmn: string) => {
    if (typeof window === 'undefined') return;

    let localStorageData = getFromFavorites();
    let pkmnIndex = localStorageData.indexOf(pkmn);

    localStorageData.splice(pkmnIndex, 1);

    localStorage.setItem('Favorite', JSON.stringify(localStorageData));
}


export { saveToFavorites, getFromFavorites, removeFromFavorites }