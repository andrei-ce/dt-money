This is a simple persinal finance TS React app created using vite@latest, experimenting using custom hooks, useCallback, useMemo, useContext (& context selector). This project uses jsonserver lib to simulate a database.

To run this project you will need to
* Download the repository
* Run ```npm install```
* Run ```npm run jsonserver```
* Run ```npm run dev```
* Access http://localhost:5173/ in your browser, or the address printed in the console. You can configure this port by passing it as a variable in the vite.config.ts file.

A few screenshots and functionalities:

**1) Initial load**
![alt text](/src/assets/loading.jpg)

**2) Home page with total sums at the top cards**
![alt text](/src/assets/main-view.jpg)

**3) Create new transaction**
![alt text](/src/assets/new-transaction.jpg)

**3) Search for transactions. Note that the total cards will change -- you can find out the balance for a particular category**
![alt text](/src/assets/search.jpg)