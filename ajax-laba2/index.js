const cars = document.querySelector('.cars');

// Полученный доход с проката по состоянию на выбранную дату
function getPrice() {
    const ajax = new XMLHttpRequest();
    ajax.open('get', `pdo-laba1/mongo.php?car=${cars.value}`);
    ajax.send();
    ajax.onload = function() {
        const result = JSON.parse(ajax.response);
        const startDate = new Date(document.querySelector('.start-date').value);
        const endDate = new Date(document.querySelector('.end-date').value);
        const price = document.querySelector('.price');
        const priceRange = Math.ceil((endDate - startDate) / 1000 / 60 / 60 / 24 * result);
        price.innerHTML = `<p>Цена за сутки: ${result}$</p><p>Цена на выбранную дату: ${priceRange}$</p>`;
    };
}

// получение JSON и вывод машин по выбранному производителю в таблицу
function getCars() {
    const ajax = new XMLHttpRequest();
    const race = document.querySelector('.race');
    ajax.open('get', `pdo-laba1/mongo.php?race=${race.value}`);
    ajax.send();
    ajax.onload = function() {
        const table = document.querySelector('.table-race-cars');
        const ajaxResponse = JSON.parse(ajax.response);
        let rowHTML = '<tr>';
        for(let key in ajaxResponse[0]) {
            if(key !== '_id')
                rowHTML += `<th>${key}</th>`;
        }
        table.innerHTML = rowHTML + '</tr>';

        for(let row of ajaxResponse) {
            rowHTML = '<tr>';
            for(let obj in row) {
                if(obj !== '_id')
                    rowHTML += `<td>${row[obj]}</td>`;
            }
            table.innerHTML += rowHTML + '</tr>';
        }
    }
}

// получение JSON и вывод машин по выбранной дате в таблицу
function getFreeCars() {
    const ajax = new XMLHttpRequest();
    const carInput = document.querySelector('.car-input');

    
    ajax.open('get', `pdo-laba1/mongo.php?cars=${carInput.value}`);
    ajax.send();
    ajax.onload = function() {
        const table = document.querySelector('.table-car');
        console.log(ajax.response);
        const ajaxResponse = JSON.parse(ajax.response);
        
        let rowHTML = '<tr>';
        for(let key in ajaxResponse[0]) {
            if(key !== '_id')
                rowHTML += `<th>${key}</th>`;
        }
        table.innerHTML = rowHTML + '</tr>';

        for(let row of ajaxResponse) {
            rowHTML = '<tr>';
            for(let obj in row) {
                if(obj !== '_id')
                    rowHTML += `<td>${row[obj]}</td>`;
            }
            table.innerHTML += rowHTML + '</tr>';
        }
    }
}