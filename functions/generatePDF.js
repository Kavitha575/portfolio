require('dotenv').config();
const puppeteer = require('puppeteer');

exports.handler = async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    
    // Example HTML content for PDF generation
    await page.setContent("<h1>Portfolio PDF Content</h1>");
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return {
        statusCode: 200,
        headers: { 
            'Content-Type': 'application/pdf', 
            'Content-Disposition': 'attachment; filename=portfolio.pdf' 
        },
        body: pdfBuffer.toString('base64'),
        isBase64Encoded: true
    };
};
