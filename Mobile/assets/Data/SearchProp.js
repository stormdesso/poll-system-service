export const SearchProp = {
    searchText: "",
    sortedType: "name",
    listeners: [],
    
    setSearchText(value) {
      this.searchText = value;
      this.notify();
    },
    
    setSortedType(value) {
      this.sortedType = value;
      this.notify();
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