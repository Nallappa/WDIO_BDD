const commonPage = require('../../functionsPage/WdioPage')
const utils = require('../../functionsPage/utils')
const { executeBroswerScript } = require('../../functionsPage/WdioPage')
const { expect } = require('chai')
var userElment = "[name='username']"
var passElement = "[name='password']"
var loginButton = '.button'
var team44 = "//h3[contains(text(),'team44')]"
var testroom = "//h3[contains(text(),'testroom')]"
var EquipmentSearchbox = "//input[contains(@placeholder,'Find Equipment on the floor..')]"
var selectabcdRack = "//li[contains(@class,'text-ellipsis active ng-star-inserted') and contains(text(),'Team44')]"
var showLink = "//a[contains(text(),'Show')]"
var addEquipmentButton = "//span[contains(text(),'Add equipment')]"
var searchEquipment = "//input[contains(@placeholder,'Search equipment...')]"
var selectEquipment1 = "//li[contains(@class,'text-ellipsis active ng-star-inserted') and contains(text(),'SRT5KRMXLT')]"
var equipmentbase1 = "//*[contains(text(),'APC Smart-UPS SRT 5000VA RM 208V')]"
var equipmentbase = ".genome"
var frontviewRack18 = "(//rack[contains(@class,'rack-front-view')]//div[contains(text(),'18')])[1]"
var rackcount = "//rack[contains(@class,'rack-front-view')]//div[contains(@class,'UPositionContainer ng-tns-c42-8')]"
var rackitemcount = "(//div[@class='rack-mounted ng-star-inserted'])[1]"
var frontviewvalidateRack = "//rack[contains(@class,'rack-rear-view')]//div//rack-item[contains(@style, 'top: 336px')]"
var clickRear ="//span[contains(text(),'Rear')]"
var frontviewRack42 = "//rack[contains(@class,'rack-front-view')]//div[contains(@class,'ng-tns-c') and contains(text(),'42')]"
var rearviewRack30 = "//rack[contains(@class,'rack-rear-view')]//div[contains(@class,'ng-tns-c') and contains(text(),'30')]"
var clickActions ="//a[contains(text(),'Actions')]"
var clickDelete ="//a[contains(text(),'Delete')]"
var validateRackfront = "//rack[contains(@class,'rack-front-view')]//div//rack-item"
var validateRackrear = "//rack[contains(@class,'rack-rear-view')]//div//rack-item"

class RackPage {
  
    async NavigatetoEquipmentPage(rack,equipmentName)
    {
        var testData = {"element_name":team44}
        var testData1 = {"element_name":testroom}
        var testData3 = {
            "element_name":EquipmentSearchbox,
            "enterValue":rack
        }
        var testData4 = {"element_name":selectabcdRack}
        var testData5 = {"element_name":showLink}
        var testData6 = {"element_name":addEquipmentButton}
        var testData7 = {
            "element_name":searchEquipment,
            "enterValue":equipmentName
        }
        await commonPage.clickElement(testData)
        await commonPage.clickElement(testData1)
        await commonPage.setTextValue(testData3)
        await commonPage.clickElement(testData4)
        await commonPage.clickElement(testData5)
        await commonPage.clickElement(testData6)
        await commonPage.setTextValue(testData7)
        await browser.pause(5000);
    
    }

    async ValidateRackCount(countexpected)
    {
        var testData = {
            "element_name":rackcount,
            "expected_count" :countexpected
        }
        await commonPage.getElementCountValue(testData);
    }

    async getRackItemCount()
    {
        var testData = {
            "element_name":rackitemcount
        }
       let isPresent =  await commonPage.isElementPresent(testData);
        if(isPresent){
            let count = await commonPage.getElementCountValue(testData);
            await utils.print(`The rack item count is ${count}`)
        }else {
            await utils.print(`There is no items in the rack`)
        }
    }
    
    async validateDragandDrop()
    {
        var testData10 = {
            "source_name":equipmentbase,
            "dest_element":frontviewRack18,
        }
        await commonPage.dragAndDropElement(testData10);

        // var testData9 = { 
        //     "element_name":equipmentbase,
        //     "Xcord":696,
        //     "Ycord":380
        // }
        // var ele = await $("//rack[contains(@class,'rack-front-view')]//div[contains(text(),'18')]");
        // let xco = await ele.getLocation('x');
        // let yco = await ele.getLocation('y');
        // console.log(xco);
        // console.log(yco);
        // await commonPage.dragAndDropNode(testData9);
    }

    async navigatetoDownloadsPage(execfile)
    {
        var testData = {
            "element_name":rackitemcount
        }
        let count = await commonPage.getElementCountValue(testData);
        await utils.print(`The rack item count is ${count}`)
    }
    

    
    
}

module.exports = new RackPage();
