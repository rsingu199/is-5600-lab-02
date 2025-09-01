/* add your code here */

document.addEventListener('DOMContentLoaded', () => {

    const usersData = JSON.parse(userContent);
    const stocksData = JSON.parse(stockContent);

    const saveButton = document.querySelector('#btnSave');
    const deleteButton = document.querySelector('#btnDelete');
    generateUserList(usersData, stocksData);

    function generateUserList(users, stocks) {
        const userList = document.querySelector('.user-list');
        userList.innerHTML = ''; 

        users.forEach(({ user, id }) => {
            const li = document.createElement('li')
            li.innerText = `${user.lastname}, ${user.firstname}`;
            li.setAttribute('id', id);
            userList.appendChild(li);
        });

        userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
    }

    function handleUserListClick(event, users, stocks) {
        const userId = event.target.id; 
        const user = users.find(user => user.id == userId); 

        populateForm(user);
        renderPortfolio(user, stocks);
    }

    function populateForm(userData) {
        const { user, id } = userData;

        document.querySelector('#userID').value = id;
        document.querySelector('#firstname').value = user.firstname;
        document.querySelector('#lastname').value = user.lastname;
        document.querySelector('#address').value = user.address;
        document.querySelector('#city').value = user.city;
        document.querySelector('#email').value = user.email;
    }

    function renderPortfolio(user, stocks) {
        const { portfolio } = user;
        const portfolioDetails = document.querySelector('.portfolio-list');
        portfolioDetails.innerHTML = ''; 

        portfolio.map(({ symbol, owned }) => {
            const symbolEl = document.createElement('p');
            const sharesEl = document.createElement('p');
            const viewBtn = document.createElement('button');

            symbolEl.innerText = symbol;
            sharesEl.innerText = owned;
            viewBtn.innerText = 'View';
            viewBtn.setAttribute('id', symbol);

            portfolioDetails.appendChild(symbolEl);
            portfolioDetails.appendChild(sharesEl);
            portfolioDetails.appendChild(viewBtn);
        });

        portfolioDetails.addEventListener('click',(event)=>{
            if(event.target.tagName=='BUTTON'){
                viewStock(event.target.id,stocks)
            }
        })
    }

    function viewStock(symbol, stocks) {
        const stockArea = document.querySelector('.stock-form');
        if (stockArea){
            const stock=stocks.find(function(s){return s.symbol == symbol});

            document.querySelector('#stockName').textContent = stock.name;
            document.querySelector('#stockSector').textContent = stock.sector;
            document.querySelector('#stockIndustry').textContent = stock.subIndustry;
            document.querySelector('#stockAddress').textContent = stock.address;
            document.querySelector('#logo').src = `logos/${symbol}.svg`;
        }
    }

    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        const id = document.querySelector('#userID').value;
        const userIndex = usersData.findIndex(user => user.id == id);

        const newUsers = [
            ...usersData.slice(0, userIndex),
            {
                ...usersData[userIndex],
                user: {
                    firstname: document.querySelector('#firstname').value,
                    lastname: document.querySelector('#lastname').value,
                    address: document.querySelector('#address').value,
                    city: document.querySelector('#city').value,
                    email: document.querySelector('#email').value,
                },
            },
            ...usersData.slice(userIndex + 1)
        ];


        generateUserList(newUsers, stocksData);
    });

    deleteButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        const userId = document.querySelector('#userID').value;
        const index = usersData.findIndex(u => u.id == userId);

        if (index > -1) {
            usersData.splice(index, 1); 
        }
        generateUserList(usersData, stocksData);
    });

});