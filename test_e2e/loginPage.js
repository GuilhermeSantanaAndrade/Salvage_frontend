const webdriver = require('selenium-webdriver'), 
by = webdriver.By, 
until = webdriver.until, 
key = webdriver.Key

const driver = new webdriver.Builder()
                    .forBrowser('chrome')
                    .build()
 
driver.get('http://localhost:8080/#/acesso/login')
    .then(r => {
        driver.findElement(by.name('login')).sendKeys("thiago@teste.com.br")
        driver.findElement(by.name('password')).sendKeys("123456345345345345345")  
        driver.findElement(by.xpath('//*[@id="app"]/div/main/div/div/div/div[2]/form/div/div[2]/button')).click()
    })
    .then(r => driver.wait(until.urlIs('http://localhost:8080/#/home'), 1000))
    //.then(r => driver.quit());


