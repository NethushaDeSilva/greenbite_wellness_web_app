// Reusable save to localStorage
function saveToLocal(key, value) {
    let data = JSON.parse(localStorage.getItem(key)) || [];
    data.push(value);
    localStorage.setItem(key, JSON.stringify(data));
}

