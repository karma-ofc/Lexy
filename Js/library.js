function initLibraryPage() {
    renderRecommendedDecks();
    renderPopularDecks();
    renderNewDecks();
}

function renderRecommendedDecks() {
    const container = document.getElementById('recommendedDecks');
    if (!container) return;
    
    container.innerHTML = AppState.publicDecks.slice(0, 4).map(deck => `
        <div class="deck-card" onclick="addPublicDeck('${deck.id}')">
            <div class="deck-preview" style="background: linear-gradient(135deg, var(--accent), var(--accent-hover));">
                <div class="deck-actions">
                    <button class="btn-icon">+</button>
                </div>
            </div>
            <div class="deck-info">
                <div class="deck-name">${deck.name}</div>
                <div class="deck-meta">${deck.cardsCount} карт • ${deck.lang}</div>
            </div>
        </div>
    `).join('');
}

function renderPopularDecks() {
    const container = document.getElementById('popularDecks');
    if (!container) return;
    
    container.innerHTML = AppState.publicDecks.slice(2, 6).map(deck => `
        <div class="deck-card" onclick="addPublicDeck('${deck.id}')">
            <div class="deck-preview" style="background: linear-gradient(135deg, #ff9f0a, #ff6b0a);">
                <div class="deck-actions">
                    <button class="btn-icon">+</button>
                </div>
            </div>
            <div class="deck-info">
                <div class="deck-name">${deck.name}</div>
                <div class="deck-meta">${deck.cardsCount} карт • ${deck.lang}</div>
            </div>
        </div>
    `).join('');
}

function renderNewDecks() {
    const container = document.getElementById('newDecks');
    if (!container) return;
    
    container.innerHTML = AppState.publicDecks.slice(0, 3).map(deck => `
        <div class="deck-card" onclick="addPublicDeck('${deck.id}')">
            <div class="deck-preview" style="background: linear-gradient(135deg, #34c759, #30b753);">
                <div class="deck-actions">
                    <button class="btn-icon">+</button>
                </div>
            </div>
            <div class="deck-info">
                <div class="deck-name">${deck.name}</div>
                <div class="deck-meta">${deck.cardsCount} карт • ${deck.lang}</div>
            </div>
        </div>
    `).join('');
}

function addPublicDeck(deckId) {
    const deck = AppState.publicDecks.find(d => d.id === deckId);
    if (!deck) return;
    
    if (!canCreateDeck()) {
        showNotification('Слишком много созданий колод. Подождите час', 'error');
        return;
    }
    
    AppState.deckCreateTimes.push(Date.now());
    
    const newDeck = {
        id: 'deck_' + Date.now(),
        name: deck.name,
        cards: [],
        createdAt: new Date().toISOString(),
        isFavorite: false,
        source: 'public'
    };
    
    AppState.userDecks.push(newDeck);
    saveState();
    
    showNotification('Колода добавлена в Мои колоды');
}

window.addPublicDeck = addPublicDeck;