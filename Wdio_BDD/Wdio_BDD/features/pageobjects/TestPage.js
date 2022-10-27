const commonPage = require('../../functionsPage/WdioPage')
const utils = require('../../functionsPage/utils')
var userElment = "[name='username']"
var passElement = "[name='password']"
var loginButton = '.button'

 
class TestPage {
  
    async openurl (url) {
        var testData = {
            "url":url
        }

       await commonPage.OpenURL(testData)
       utils.print("sdsd")
        
    }

    async enterUserName(usr)
    {
        var testData = {
            "element_name":userElment,
            "enterValue":usr
        }

        await commonPage.setTextValue(testData)
    }

    async enterPassword(pass)
    {
        var testData = {
            "element_name":passElement,
            "enterValue":pass
        }

        await commonPage.setTextValue(testData)
    }

    async clickLogin()
    {
        var testData = {
            "element_name":loginButton,
            
        }
        await commonPage.clickElement(testData)
    }
 
}

module.exports = new TestPage();
