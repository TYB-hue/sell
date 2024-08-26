const PORT = 8000;
const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

const url = "https://p2p.binance.com/en/trade/sell/USDT?fiat=SDG&payment=BankofKhartoum";

app.get('/', async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url);
        await page.setViewport({ width: 1280, height: 800 });

        // Wait for the specific element to load
        await page.waitForSelector('.headline5.text-primaryText');
        
        // Optional: Add a delay to ensure all elements are loaded
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds

        const rates = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.headline5.text-primaryText')).map(rate => rate.innerText);
        });

        console.log(rates);
        await browser.close();

        // Convert the scraped rate to a number, removing commas
        const numberRTS = Number(rates[2].replace(/,/g, ""));
        const adjustedRate = numberRTS * 0.95; // Adjust the rate by multiplying by 0.95

        // Create the HTML response with the scraped data and a script for handling button clicks
        let htmlResponse = `
           <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Scraped Data</title>
    <style>

    * {
    transition:  0.3s ;
}
        /* styles.css */
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
             transition:  0.3s ;
        }

        body {
            display: flex;
            flex-direction: column;
        }

        .content-wrapper {
            flex: 1;
        }

        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .nav-logo {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }

        .text-sky-500 {
            color: #00aaff;
        }

        .flex {
            display: flex;
        }

        .items-center {
            align-items: center;
        }

        .gap-1 {
            gap: 0.25rem; /* 4px */
        }

        .gap-6 {
            gap: 1.5rem; /* 24px */
        }

        .font-bold {
            font-weight: bold;
        }

        .text-3xl {
            font-size: 1.875rem; /* 30px */
        }

        .hover\:text-sky-500:hover {
            color: #00aaff;
        }

        .convert-icon {
            font-size: 24px;
            margin-right: 8px;
        }

        .duration-300 {
            transition-duration: 300ms;
        }

        .nav-link h2 {
            display: flex;
            align-items: center;
            font-size: 1rem;
            color: #333;
            text-decoration: none;
        }

        .nav-link h2:hover {
            color: #00aaff;
        }

        .mt-1 {
            margin-top: 4px;
        }

        .transition {
            transition: color 0.3s ease;
        }

        .nav-link {
            text-decoration: none; /* Ensure no underline */
        }

        .underline {
            text-decoration: none;
        }

        .footer {
            background-color: #00aaff; /* Same as bg-sky-500 */
            color: white; /* text-white */
            padding: 2rem 0; /* py-8 */
            text-align: center;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .footer-logo {
            margin-bottom: 1rem; /* mb-4 */
           
        }

        .text-center {
            text-align: center;
        }

        .mb-4 {
            margin-bottom: 1rem; /* mb-4 */
        }

        .footer-links {
            list-style: none;
            padding: 0;
            display: flex;
            gap: 1rem; /* Equivalent to space-x-4 */
        }

        .footer-links li {
            display: inline;
        }

        .footer-links a {
            color: white;
            text-decoration: none;
        }

        .footer-links a:hover {
            text-decoration: underline; /* hover:underline */
        }

        #data-container {
            margin-bottom: 100px;
            align-items: center;
            display: flex;
            flex-direction: column;
            padding : 50px 20px;
        }

        .title{
        margin-bottom: 30px;
        }

        .rate{
        display:flex;
        flex-direction:row; 
        gap:30px;
        margin-bottom: 30px;
         background-color: #D6E4F0;
            border-radius: 20px; /* Changed from 10% to 20px */
    padding: 10px; /* Add some padding for better aesthetics */
             transition-duration: 500ms;
transition-property: margin-right;
        }

        .dollar{
         font-size:large;
       

        }
         .d-container{
          
           padding: 5px 10px;
       
         }


          input[type="number"] {
            border: none;
            background-color: transparent;
            outline: none;
            font-size: 16px;
            color: #333;
            padding-left: 30px;
            width: 100px;
             font-size:large;
               font-weight: bold;
        }
            .theinput{
            margin-left: "60px" 
            }
       

            .immg{
             width:50px
            height:50px
             size: 50px;
            }

            button{
                background-color: rgb(14 165 233);
                color: white;
                border: 1px solid rgb(14 165 233);
                width: 80px;
                height:34px;
                border-radius: 10px;
                font-size: large;
transition-duration: 0.3s;
            }
                button:hover{
                background-color: white;
                color: rgb(14 165 233)
                }
    </style>
</head>

<body>
    <!-- Content Wrapper -->
    <div class="content-wrapper">
        <header class="w-full">
            <nav class="nav">
                <a href="/" class="flex items-center gap-1 underline">
                    <img src="https://i.ibb.co/s3pNdRv/Untitled-design.png" width="31" height="31" alt="logo">
                    <p class="nav-logo">
                        Cash<span class="text-sky-500">Kosh</span>
                    </p>
                </a>
                <div class="flex gap-6">
                    <a href="mailto:cashkosh2024@gmail.com" class="nav-link">
                        <h2 class="hover:text-sky-500 duration-300 flex font-bold">
                            <i class="fas fa-exchange-alt convert-icon text-3xl"></i> Contact Us
                        </h2>
                    </a>
                    <a href="/about" class="nav-link">
                        <h2 class="hover:text-sky-500 transition duration-300 flex gap-1 font-bold">
                            <i class="fas fa-chart-pie mt-1"></i> About
                        </h2>
                    </a>
                </div>
            </nav>
        </header>

        <div id="data-container">
            <h1 class="title">Calculate The Amount (Sell)</h1>
            <div class="rate">
                <div class="d-container"><h2 id="dollar">1 $</h2></div> 
                <h2 id="dollar">=</h2>
                <div class="d-container"><h2 id="dollar">${adjustedRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SDG</h2></div>
                <!-- Display the adjusted rate -->
            </div>


             <div class="rate">
                  <input type="number" id="inputNumber" placeholder="150$..." class="theinput"/>
                <h2 id="dollar">=</h2>
                <div class="d-container"><div class="output">
                    <h1 id="result"></h1>
                </div></div>
                <!-- Display the adjusted rate -->
            </div>


                <button class="convertBTN" onclick="convert()">Convert</button>
            </div>
        </div>
    </div>

    <!-- Footer Section -->
    <footer class="footer bg-sky-500 text-white py-8">
        <div class="container">
            <img src="https://i.ibb.co/Qv3WqZL/8486c153-2a9c-48e8-9381-0aec8894ffe1.png" alt="CashKosh Logo" class="footer-logo immg mb-4" width="60px" height="60">
            <p class="text-center mb-4">
                &copy; <span id="year"></span> CashKosh. All rights reserved.
            </p>
            <ul class="footer-links">
                <li><a href="#" class="hover-underline">Privacy Policy</a></li>
                <li><a href="/terms" class="hover-underline">Terms of Service</a></li>
                <li><a href="mailto:cashkosh2024@gmail.com" class="hover-underline">Contact Us</a></li>
            </ul>
        </div>
    </footer>

    <script>
        function convert() {
            const inputNum = document.getElementById("inputNumber").value;
            const rate = ${adjustedRate.toFixed(2)}; // Use the adjusted rate
            const output = document.getElementById("result");
            if (inputNum) {
                const result = inputNum * rate;
                output.textContent = result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' SDG'; // Format the output
            } else {
                output.textContent = 'Please enter a number';
            }
        }

        document.getElementById("year").textContent = new Date().getFullYear();
    </script>
</body>

</html>

        `;

        // Send the HTML response to the client
        res.send(htmlResponse);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while scraping the data.');
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



            // <div class="amount">
            //     <input type="number" id="inputNumber" />
            //     <div class="output">
            //         <h1 id="result"></h1>
            //     </div>


//the best code till now !!



// const PORT = 8000;
// const express = require('express');
// const puppeteer = require('puppeteer');

// const app = express();

// const url = "https://p2p.binance.com/en/trade/sell/USDT?fiat=SDG&payment=BankofKhartoum";

// (async () => {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.goto(url);
//     await page.setViewport({ width: 1280, height: 800 });

//     // Wait for the specific element to load
//     await page.waitForSelector('.headline5.text-primaryText');
    
//     // Optional: Add a delay to ensure all elements are loaded
//     await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 2 second// Wait for 2 seconds

//     const rates = await page.evaluate(() => {
//         return Array.from(document.querySelectorAll('.headline5.text-primaryText')).map(rate => rate.innerText);
//     });

//     console.log(rates);

//     await browser.close();

//remove:)X
//     let htmlResponse = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <link rel="stylesheet" href="style.css">
//             <title>Scraped Data</title>
//         </head>
//         <body>
//             <div id="data-container">
//                 <h1>Scraped Data</h1>
//                 <ul>
//                     ${rates.map(rate => `<li>${rate}</li>`).join('')}
//                 </ul>
//             </div>
//         </body>
//         </html>
//     `;

//     res.send(htmlResponse);
//remove:)Z
// })();

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
 



//the best code till now !!








































// const PORT = 8000;
// const express = require('express');
// const puppeteer = require('puppeteer');

// const app = express();

// const url = "https://p2p.binance.com/en/trade/sell/USDT?fiat=SDG&payment=BankofKhartoum";

// (async () => {
//     const browser = await puppeteer.launch({ headless: false }); // headless: false keeps the browser window open
//     const page = await browser.newPage();
//     await page.goto(url);
//     await page.setViewport({ width: 1280, height: 800 });

//     const rates = await page.evaluate(() => {
//         return Array.from(document.querySelectorAll('.headline5')).map(rate => rate.innerText);
//     });

//     console.log(rates);

//     await browser.close();
// })();

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
