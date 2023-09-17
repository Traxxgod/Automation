
const loginLink = "https://www.hackerrank.com/auth/login";
// const emailpassObj = require("./secrets");
const email = '';        // write your email
const password = '';   // write your password
const {answers} = require("./codes");
const puppeteer = require("puppeteer")
// creates headless browser
let browserStartPromise = puppeteer.launch({
    // visible 
    headless: false,
    // type 1sec // slowMo: 1000,
    defaultViewport: null,
    // browser setting 
    args: ["--start-maximized", "--disable-notifications"]
}); 
let page, browser;
browserStartPromise 
    .then(function (browserObj) {
        console.log("Browser opened");
        // new tab 
        browser = browserObj
        let browserTabOpenPromise = browserObj.newPage();
        return browserTabOpenPromise;
    }).then(function (newTab) {
        page = newTab
        console.log("new tab opened ")
        let gPageOpenPromise = newTab.goto(loginLink);
        return gPageOpenPromise;
    }).then(function () {
        let emailWillBeEnteredPromise = page.type("input[id='input-1']", email, { delay: 50 });
        console.log('Email written');
        return emailWillBeEnteredPromise;
    }).then(function () {
        let passwordWillBeEnteredPromise = page.type("input[type='password']", password, { delay: 50 });
        console.log('Password written');
        return passwordWillBeEnteredPromise;
    }).then(function () {
        console.log('login done');
        let loginWillBeDOnepromise =
            page.click('button[data-analytics="LoginPassword"]', { delay: 100 });
        return loginWillBeDOnepromise;
    }).then(function () {
        console.log('click to Algorithms');
        let clickedOnAlgoPromise =
            waitAndClick(".topic-card a[data-attr1='algorithms']", page);
        return clickedOnAlgoPromise;
    }).then(function () {
        console.log('click to warmup');
        let getToWarmUp =
            waitAndClick(".checkbox-wrap input[value='warmup']", page);
        return getToWarmUp;
    })
    
    
    
    .then(function () {
        let AllChallengesArrPromise =
            page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", { delay: 100 });
        return AllChallengesArrPromise;
    }).then(function (questionsArr) {
        // n number of question first 
        console.log("number of questions", questionsArr.length);
        let qWillBeSolvedPromise = questionSolver(page, questionsArr[0], answers[0]);
        // console.log(answers[0]);
        return qWillBeSolvedPromise;
    }).then(function () {
        console.log("question is solved");
    })
function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector, { visible: true });
        waitForModalPromise
            .then(function () {
                let clickModal =
                    cPage.click(selector, { delay: 100 });
                return clickModal;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err)
            })
    }
    )
}

function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let qWillBeCLickedPromise = question.click();
        qWillBeCLickedPromise

            .then(function () {
                // focus 
                let waitFOrEditorToBeInFocus =
                    waitAndClick(".monaco-editor.no-user-select.vs", page);
                return waitFOrEditorToBeInFocus;
            })
            // click
            .then(function () {
                return waitAndClick(".checkbox-input", page);
            })
            
            .then(function () {
                console.log(answer);
                return page.waitForSelector("#input-1", { visible: true });
            })
            .then(function () {
                return page.type("#input-1", answer, { delay: 50 });
            })
            
            .then(function () {
                let ctrlIsPressedP = page.keyboard.down("Control");
                return ctrlIsPressedP;
            }).then(function () {
                let AIsPressedP = page.keyboard.press("A", { delay: 100 });
                return AIsPressedP;
            }).then(function () {
                return page.keyboard.press("X", { delay: 100 });
            }).then(function () {
                let ctrlIsPressedP = page.keyboard.up("Control");
                return ctrlIsPressedP;
            })
            .then(function () {
                // focus 
                let waitFOrEditorToBeInFocus =
                    waitAndClick(".monaco-editor.no-user-select.vs", page);
                return waitFOrEditorToBeInFocus;
            })
            .then(function () {
                let ctrlIsPressedP = page.keyboard.down("Control");
                return ctrlIsPressedP;
            }).then(function () {
                let AIsPressedP = page.keyboard.press("A", { delay: 100 });
                return AIsPressedP;
            }).then(function () {
                let AIsPressedP = page.keyboard.press("V", { delay: 100 });
                return AIsPressedP;
            }).then(function () {
                let ctrlIsPressedP = page.keyboard.up("Control");
                return ctrlIsPressedP;
            }).then(function () {
                return waitAndClick(".hr-monaco__run-code", page,  { delay: 50 });
            })
            
            .then(function(){
                console.log("Done");
                let ClickOnSubmitButton = waitAndClick("button[class='ui-btn ui-btn-normal ui-btn-primary pull-right hr-monaco-submit ui-btn-styled']", page,  {delay : 50});
                return ClickOnSubmitButton;
            })
            .then(function () {
                resolve();
            }).catch(function (err) {
                console.log(err)
                reject(err);
            })
    })
}