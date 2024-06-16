export const SearchProp = {
    searchText: "",
    sortedType: "name",
    filterPollPage: [],
    listeners: [],
    updatePolls: [],
    
    setSearchText(value) {
      this.searchText = value;
      this.notify();
    },
    
    setSortedType(value) {
      this.sortedType = value;
      this.notify();
    },

    setFilterPollPage(value) {
      this.filterPollPage = value;
      this.notify();
    },

    updatePoll(newPoll) {
      this.updatePolls.push(newPoll); // Добавляем новый опрос в polls
      this.notify(); // Уведомляем всех подписчиков
    },
    
    notify() {
      this.listeners.forEach(listener => listener());
    },
    
    subscribe(listener) {
      this.listeners.push(listener);
    },
    
    unsubscribe(listener) {
      this.listeners = this.listeners.filter(l => l !== listener);
    }
};