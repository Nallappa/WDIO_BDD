
chai = require('chai');
var utils = require('../functionsPage/utils')
const path = require('path')
const fs = require('fs')

var commonPage = function () {
  var currentRootDirectory = process.cwd();
  var path = require('path');
  var fs = require('fs');

  var expect = chai.expect;

  //####################################################################################################
  //Function Name		   : getElementUsing
  //Description      	 : This function can be used to get the element locator.
  //Parameters Used  	 : None
  //########################################################################################################
  // To enter any value
   async function getElementUsing(locator, selector) {
    //wdio
    utils.print('selector' + selector);
    utils.print('locator' + locator);
    return  await $(locator);
  }
  //####################################################################################################
  //Function Name		   : getAllElementsUsing
  //Description      	 : This function can be used to get the all element locators.
  //Parameters Used  	 : None
  //########################################################################################################
  function getAllElementsUsing(locator, selector) {
    //wdio
    utils.print('selector' + selector)
    utils.print('locator' + locator);
    return $$(locator)
  }
  //####################################################################################################
  //Function Name		   : verifyHighlighted
  //Description      	 : This function can be used to check wheather the element is highlighted or not.
  //Parameters Used  	 : Reading  getAttributeElement parameter from excel
  //########################################################################################################

  this.verifyHighlighted = async function (testData) {
    var element_name = testData["getAttributeElement"].split(';')
    var getAttributeElement = getElementUsing(element_name[0], element_name[1])
    //browser.ignoreSynchronization = true
    return new Promise(async function (resolve, reject) {
      await getAttributeElement.getAttribute("class").then(function (value) {
        utils.print(value);
        expect(value).to.include('active');
        resolve(true);
      }).catch((e) => {
        utils.print("element not present in the page=" + e);
        // utils.printError("verifyHighlighted: element not selected in the page", e);
        reject(false);
      });
      // browser.ignoreSynchronization = false
    });
  }
  //####################################################################################################
  //Function Name		   : getElementAttribute
  //Description      	 : This function can be used to get the element attribute value.
  //Parameters Used  	 : Reading element_name and expected_text parameters from excel.
  //########################################################################################################
  this.getElementAttribute = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    //wdio
    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true
      await element_name.getAttribute(testData["attlocator"]).then((actualText) => {
        expect(actualText).to.include(testData["expected_text"]);
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
      //browser.ignoreSynchronization = false
    });
  }
  //####################################################################################################
  //Function Name		   : getAllElementAttribute
  //Description      	 : This function can be used to get all the elements attribute value.
  //Parameters Used  	 : Reading element_name and expected_text parameters from excel.
  //########################################################################################################
  this.getAllElementAttribute = async function (testData) {
    var element = testData["element_name"].split(';')
    var expected_text = testData["expected_text"].split(',')
    var tempArray = []
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getAllElementsUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      //  browser.ignoreSynchronization = true
      await element_name.map(async (element_name, index) => {
        await element_name.getAttribute(testData["attlocator"]).then((actual_text) => {
          tempArray.push(actual_text)
        })
      }).then(function () {
        expect(tempArray).to.include.members(expected_text);
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
      //browser.ignoreSynchronization = false
    });
  }
  //####################################################################################################
  //Function Name		   : setTextValue
  //Description      	 : This function can be used to set the value in textbox
  //Parameters Used  	 : Reading element_name and enterValue parameters from excel.
  //########################################################################################################
  this.setTextValue = async function (testData) {
    //wdio
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name =  await getElementUsing(element[0], element[1])
    var enterValue = testData["enterValue"]


    return new Promise(async function (resolve, reject) {

      await element_name.clearValue().then(async () => {
        await element_name.setValue(enterValue).then(() => {
          utils.print("Value entered: " + enterValue)
          resolve(true);
        }).catch((e) => {
          //utils.print("element not present in the page=" + e);
          utils.printError("element not present in the page", e);
          reject(false);
        });
      });
    });
  }
  //wdio
  // this.setTextValue = async function (testData) {
  //   var element = testData["element_name"].split(';')
  //   utils.print("element:" + element[0] + "locator:" + element[1])
  //   var element_name = getElementUsing(element[0], element[1])

  //   var enterValue = testData["enterValue"]

  //   await (await element_name).setValue(enterValue);
  //   return true;
  // }

  //####################################################################################################
  //Function Name		   : setTextAllElements
  //Description      	 : This function can be used to set all the values in textboxes
  //Parameters Used  	 : Reading element_name and enterValue parameters from excel.
  //########################################################################################################  

  this.setTextAllElements = async function (testData) {
    //wdio
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getAllElementsUsing(element[0], element[1])
    var enterValue = testData["enterValue"]
    // utils.print(element_name + "element_name")
    return new Promise(async function (resolve, reject) {
      //  browser.ignoreSynchronization = true
      await element_name.map(async (element_name, index) => {
        await element_name.clearValue().then(async () => {
          await element_name.setValue(enterValue).then(() => {
            utils.print("Value entered: " + enterValue)
            resolve(true);
          })
        }).catch((e) => {
          ///utils.print("element not present in the page=" + e);
          utils.printError("element not present in the page", e);
          reject(false);
        })
        //  browser.ignoreSynchronization = false
      })
    })
  }
  //####################################################################################################
  //Function Name		   : selectDropDownValue
  //Description      	 : This function can be used to select a value from the Dropdown
  //Parameters Used  	 : Reading element_name and enterValue parameters from excel.
  //########################################################################################################  
  this.selectDropDownValue = async function (testData) {
    //wdio
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    var enterValue = testData["enterValue"]
    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true
      await element_name.selectByAttribute('value', enterValue).then(async () => {
        await element_name.click().then(() => {
          browser.pause(2000)
          utils.print("Value selected: " + enterValue)
          resolve(true);

        }).catch((e) => {
          //utils.print("element not present in the page=" + e);
          utils.printError("element not present in the page", e);
          reject(false);
        });
        // browser.ignoreSynchronization = false
      });
    })
  }
  //####################################################################################################
  //Function Name		   : selectAllDropDownByIndex
  //Description      	 : This function can be used to select all element value based on the index from the Dropdown
  //Parameters Used  	 : Reading element_name and enterValue parameters from excel.
  //########################################################################################################
  this.selectAllDropDownByIndex = async function (testData) {
    //wdio
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getAllElementsUsing(element[0], element[1])
    // var enterValue = parseInt(testData["enterValue"])
    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true
      await element_name.map(async (element_name) => {
        await element_name.click().then(() => {
          resolve(true);
        })
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      })
    })
    // browser.ignoreSynchronization = false

  }
  //####################################################################################################
  //Function Name		   : selectDropDownByIndex
  //Description      	 : This function can be used to select a element value based on the index from the Dropdown
  //Parameters Used  	 : Reading element_name and enterValue parameters from excel.
  //########################################################################################################
  this.selectDropDownByIndex = async function (testData) {
    //wdio
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    var index = parseInt(testData["enterValue"])
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true
      await element_name.selectByIndex(index).then(() => {
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
        //  browser.ignoreSynchronization = false
      })
    })
  }
  //####################################################################################################
  //Function Name		   : getTextValue
  //Description      	 : This function can be used to get the text from a element
  //Parameters Used  	 : Reading element_name and expected_text parameters from excel.
  //########################################################################################################

  // this.getTextValue = async function (testData) {
  //   var element = testData["element_name"].split(';')
  //   utils.print("element:" + element[0] + "locator:" + element[1])
  //   var element_name = getElementUsing(element[0], element[1])
  //   return new Promise(function (resolve, reject) {
  //     browser.ignoreSynchronization = true
  //     element_name.getText().then((actual_text) => {
  //       browser.pause(5000)
  //       utils.print("getText Value : " + actual_text)
  //       expect(actual_text).to.include(testData["expected_text"]);
  //       resolve(true);

  //     }).catch((e) => {
  //       //utils.print("element not present in the page=" + e);
  //       utils.printError("failed in getTextValue validation: ", e);
  //       reject(false);
  //     });
  //     browser.ignoreSynchronization = false
  //   });
  // }

  this.getTextValue = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])

    //wdio change
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true
      await element_name.getText().then(actual_text => {
        //browser.pause(5000)
        utils.print("getText Value : " + actual_text)
        expect(actual_text).to.include(testData["expected_text"]);
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("failed in getTextValue validation: ", e);
        reject(false);
      });
      // browser.ignoreSynchronization = false
    });
  }


  //####################################################################################################
  //Function Name		   : matchRegExpression
  //Description      	 : This function can be used to check the regular expression of a element
  //Parameters Used  	 : Reading element_name and regexp parameters from excel.
  //########################################################################################################
  this.matchRegExpression = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getAllElementsUsing(element[0], element[1])
    var regexp = testData["regexp"]
    //wido
    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true
      await element_name.getText().then(actual_text => {
        utils.print("getText Value : " + actual_text)
        expect(actual_text).to.match(new RegExp(regexp));
        resolve(true);

      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
      // browser.ignoreSynchronization = false
    });
  }

  //####################################################################################################
  //Function Name		   : checkBackgroundColor
  //Description      	 : This function can be used to check the background color of a element
  //Parameters Used  	 : Reading element_name and bgColor parameters from excel.
  //######################################################################################################## 

  this.checkBackgroundColor = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    //wdio
    return new Promise(async function (resolve, reject) {
      //  browser.ignoreSynchronization = true
      await element_name.getCSSProperty('background-color').then((bgColor) => {
        // utils.print("bgColor Value : " + bgColor)
        expect(bgColor).to.include(testData["bgvColor"]);
        resolve(true);

      }).catch((e) => {
        // utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
      // browser.ignoreSynchronization = false
    });
  }
  //####################################################################################################
  //Function Name		   : checkBackgroundColorAllelements
  //Description      	 : This function can be used to check the background color of all the elements
  //Parameters Used  	 : Reading element_name and bgColor parameters from excel.
  //######################################################################################################## 
  this.checkBackgroundColorAllelements = async function (testData) {
    var element = testData["element_name"].split(';')
    //  utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getAllElementsUsing(element[0], element[1])
    // wdio
    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true
      await element_name.map(async (element_name, index) => {
        await element_name.getCSSProperty('background-color').then((bgColor) => {
          //utils.print("bgColor Value : " + bgColor)
          expect(bgColor).to.include(testData["bgvColor"]);
          resolve(true);
        })
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
      // browser.ignoreSynchronization = false
    });
  }
  //####################################################################################################
  //Function Name		   : getAllElementTextValue
  //Description      	 : This function can be used to get the textvalue for all the elements
  //Parameters Used  	 : Reading element_name and expected_text parameters from excel.
  //######################################################################################################## 
  this.getAllElementTextValue = async function (testData) {
    var element = testData["element_name"].split(';')
    // utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getAllElementsUsing(element[0], element[1])
    var expected_text = testData["expected_text"].split(',')
    var tempArray = [];
    //wdio
    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true
      await element_name.map(async (eleText, index) => {
        await eleText.getText().then((actual_text) => {
          utils.print("actual_text : " + actual_text)
          tempArray.push(actual_text)
        })

      }).then(function () {
        expect(tempArray).to.include.members(expected_text);
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
      // browser.ignoreSynchronization = false
    });
  }
  //####################################################################################################
  //Function Name		   : getAllElementTitle
  //Description      	 : This function can be used to get the title for all the elements
  //Parameters Used  	 : Reading element_name and expected_text parameters from excel.
  //######################################################################################################## 
  this.getAllElementTitle = async function (testData) {
    var element = testData["element_name"].split(';')
    //  utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getAllElementsUsing(element[0], element[1])
    var expected_text = testData["expected_text"].split(',')
    var tempArray = []
    //wdio
    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true
      await element_name.map(async (eleText, index) => {
        await eleText.getTitle().then((actual_text) => {
          utils.print("actual_text : " + actual_text)
          tempArray.push(actual_text)
        })
      }).then(function () {
        expect(tempArray).to.include.members(expected_text);
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
      // browser.ignoreSynchronization = false
    });
  }
  //####################################################################################################
  //Function Name		   : getElementCountValue
  //Description      	 : This function can be used to get count of elements
  //Parameters Used  	 : Reading element_name and regexp parameters from excel.
  //######################################################################################################## 
  this.getElementCountValue = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getAllElementsUsing(element[0], element[1])
    var expected = parseInt(testData["expected_count"])
    //wdio
    return new Promise(async function (resolve, reject) {

      // browser.ignoreSynchronization = true
      await element_name.length.then((count) => {
        utils.print("count Value : " + count)
        expect(count).to.equal(expected)
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
    })
  }

  this.getElementCount = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getAllElementsUsing(element[0], element[1])
    var expected = parseInt(testData["expected_count"])
    //wdio
    return new Promise(async function (resolve, reject) {

      // browser.ignoreSynchronization = true
      await element_name.length.then((count) => {
        utils.print("count Value : " + count)
        // expect(count).to.equal(expected)
        resolve(count);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
    })
  }

  //####################################################################################################
  //Function Name		   : validatePageContainsText
  //Description      	 : This function can be used to validate the element based on text of the element with 
  //element and Text argument
  //Parameters Used  	 : Reading element_name parameters from excel.
  //######################################################################################################## 
  this.validatePageContainsTextUsingElement = async function (testData) {
    //wdio
    //var objPath = "//*[contains(text(),'" + visibleText + "')]";
    var visibleText = testData["visibleText"]
    var element = testData["element"]
    var element_name = await $(element + '=' + visibleText)
    //var element_name = element(by.xpath(objPath))
    utils.print("visibleText: " + visibleText)
    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true;
      await element_name.isDisplayed().then((isPresent) => {
        utils.print("isPresent=" + isPresent);
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
    })
  }

  //####################################################################################################
  //Function Name		   : validatePageContainsText
  //Description      	 : This function can be used to validate the element based on text of the element
  //Parameters Used  	 : Reading element_name parameters from excel.
  //######################################################################################################## 
  async function validatePageContainsText(visibleText) {
    var objPath = "//*[contains(text(),'" + visibleText + "')]";
    //var element_name = element(by.xpath(objPath))
    //wdio
    var element_name = await $(objPath);
    utils.print("visibleText: " + visibleText)
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true;
      await element_name.isDisplayed().then((isPresent) => {
        utils.print("isPresent=" + isPresent);
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
    })
  }

  //####################################################################################################
  //Function Name		   : validateAllElementContainsText
  //Description      	 : This function can be used to validate the element based on text of the element
  //Parameters Used  	 : Reading element_name parameters from excel.
  //######################################################################################################## 


  this.validateAllElementContainsText = async function (testData) {
    browser.pause(5000)
    // to check text on any page
    //wdio
    //var visibleText = testData["visibleText"].split(',')
    var visibleText = testData["element_name"].split(',')
    // utils.print(element_name)
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true
      await visibleText.map(async function (element_name) {
        await validatePageContainsText(element_name).then((retFlag) => {
          utils.print("retFlag=" + retFlag);
          expect(retFlag).to.equal(true);
        })
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
      // browser.ignoreSynchronization = false;
    })

  }

  //####################################################################################################
  //Function Name		   : validatePageContainsText
  //Description      	 : This function can be used to validate the element based on text of the element with 
  //class and Text argument
  //Parameters Used  	 : Reading element_name parameters from excel.
  //######################################################################################################## 
  this.validatePageContainsTextUsingClass = async function (testData) {
    //wdio
    //var objPath = "//*[contains(text(),'" + visibleText + "')]";
    var visibleText = testData["visibleText"]
    var className = testData["className"]
    var element_name = await $('.' + className + '=' + visibleText)
    //var element_name = element(by.xpath(objPath))
    utils.print("visibleText: " + visibleText)
    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true;
      await element_name.isDisplayed().then((isPresent) => {
        //utils.print("isPresent=" + isPresent);
        resolve(isPresent);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
    })
  }


  //####################################################################################################
  //Function Name		   : ClickPageContainsText
  //Description      	 : This function can be used to click the element based on text of the element using ClassName
  //Parameters Used  	 : Reading element_name and expected_count parameters from excel.
  //######################################################################################################## 

  this.ClickPageContainsTextUsingClassName = async function (testData) {
    var visibleText = testData["visibleText"]
    var className = testData["className"]
    //wdio
    /*  var element_name = element(
       by.xpath("//*[contains(text(),'" + testData["element_name"] + "')]")
     ); */
    var element_name = await $("." + className + '=' + visibleText)
    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true;
      await element_name
        .click()
        .then(() => {
          utils.print("click element:");
          resolve(true);
        })
        .catch((e) => {
          //utils.print("error in clickelement=" + e);
          utils.printError("error in clickelement", e);
          reject(false);
        });
      // browser.ignoreSynchronization = false;
    });
  };

  //####################################################################################################
  //Function Name		   : ClickPageContainsText
  //Description      	 : This function can be used to click the element based on text of the element
  //Parameters Used  	 : Reading element_name and expected_count parameters from excel.
  //######################################################################################################## 

  this.ClickPageContainsText = async function (testData) {
    //wdio
    //var element_name = await $("//*[contains(text(),'" + testData["visibleText"] + "')]");
    var element_name = await $("//*[contains(text(),'" + testData["element_name"] + "')]");

    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true;
      await element_name
        .click()
        .then(() => {
          utils.print("click element:");
          resolve(true);
        })
        .catch((e) => {
          //utils.print("error in clickelement=" + e);
          utils.printError("error in clickelement", e);
          reject(false);
        });
      //browser.ignoreSynchronization = false;
    });
  };

  // This is an internal function; Use ClickPageContainsText for external calls
  async function clickPageContainsText(visibleText) {
    //wdio
    var pageText = "//*[contains(text(),'" + visibleText + "')]";
    utils.print("element  =" + visibleText);
    var element_name = await $(pageText)
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true;
      await element_name.click().then(() => {
        utils.print("element clicked in the page");
        resolve(true);

      }).catch((e) => {
        //utils.print("element not clicked in the page=" + e);
        utils.printError("element not clicked in the page", e);
        reject(false);
      });
      //browser.ignoreSynchronization = false;
    })
  }

  //SESA436017: added clickChildElement
  //####################################################################################################
  //Function Name		   : clickChildElement
  //Description      	 : This function can be used to click the child element based on text of the element
  //Parameters Used  	 : Reading element_name and visible text parameters from excel.
  //######################################################################################################## 

  this.clickChildElement = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getAllElementsUsing(element[0], element[1])
    var visibleText = testData["visibleText"]
    utils.print(element_name + " :visibleText: " + visibleText)
    // get list of child elements
    var names = await element_name.map(async function (elem) {
      return await elem.getText();
    });
    // click on child element with visible text same as test data paramter
    names.then(async function (names) {
      for (var i = 0; i < names.length; ++i) {
        utils.print("child element:" + i + ":" + names[i]);
        await clickPageContainsText(visibleText);
      }
    });

    return true;
  }

  //####################################################################################################
  //Function Name		   : convertExcelDataSheetToJson
  //Description      	 : This function can be used to read the excel data and convert to json
  //Parameters Used  	 : Reading excel data file and sheet name parameter from excel.
  //######################################################################################################## 

  this.convertExcelDataSheetToJson = async function (testData) {
    var runTimeValues = require(currentRootDirectory + seatConfig.DownloadPath + '/runTimeValues.json');
    if (testData["data_key"]) {
      runTimeValues["excelDataKey"] = testData["data_key"];
    }
    if (testData["column_name"]) {
      runTimeValues["ScenarioName"] = testData["column_name"];
    }
    runTimeValues["testSetname"] = testData["sheet_name"];
    var excelFilename = currentRootDirectory + seatConfig.DownloadPath + "/" + testData["excel_file"];;
    var jsonFilename = path.basename(excelFilename).replace(".xlsx", ".json");
    jsonFilename = currentRootDirectory + seatConfig.DownloadPath + "/" + jsonFilename;
    runTimeValues["excelDataPath"] = excelFilename;
    fs.writeFileSync(currentRootDirectory + seatConfig.DownloadPath + '/runTimeValues.json', JSON.stringify(runTimeValues));

    // to set the file and sheet for excel based data driven testing
    var excelSuite = require('../../Scripts/mainMod')().start();
    var ExlDataObj = await excelSuite.readExcelFile(testData["sheet_name"]);
    fs.writeFileSync(jsonFilename, JSON.stringify(ExlDataObj));

    utils.print("Datasheet converted to json");
    return true;
  }

  //####################################################################################################
  //Function Name		   : clickAllElementContainsText
  //Description      	 : This function can be used to click the element based on text of the element
  //Parameters Used  	 : Reading element_name and expected_count parameters from excel.
  //######################################################################################################## 

  this.clickAllElementContainsText = async function (testData) {
    // to check text on any page
    browser.pause(3000)
    //wdio
    var element_name = await testData["visibleText"].split(',')
    // utils.print(element_name)
    await element_name.map(async function (element_name) {
      browser.pause(2000)
      await clickPageContainsText(element_name).then((retFlag) => {
        utils.print("retFlag=" + retFlag);
        expect(retFlag).to.equal(true);
      })

    })
    return true;

  }

  //####################################################################################################
  //Function Name		   : verifyAllElementsPresent
  //Description      	 : This function can be used to verify the all the elements are present in the page
  //Parameters Used  	 : Reading element_name and expected_count parameters from excel.
  //########################################################################################################
  this.verifyAllElementsPresent = async function (testData) {
    // to check text on any page
    browser.pause(3000)
    var element = testData["element_name"].split(';')
    var element_names = getAllElementsUsing(element[0], element[1])
    //wdio
    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true;
      await element_names.map(async function (element_name) {
        browser.pause(1000)

        await element_name.isDisplayed().then((isPresent) => {
          utils.print("isPresent=" + isPresent);
          resolve(true);
        }).catch((e) => {
          //utils.print("element not present in the page=" + e);
          utils.printError("element not present in the page", e);
          reject(false);
        });
      })
    })
  }
  //####################################################################################################
  //Function Name		   : isElementPresent
  //Description      	 : This function can be used to verify a element are present in the page
  //Parameters Used  	 : Reading element_name from excel.
  //########################################################################################################

  async function isElementPresent(testData) {

    var element = testData["element_name"].split(';')

    utils.print("element:" + element[0] + "locator:" + element[1])

    var element_name = await getElementUsing(element[0], element[1])

    return new Promise(async function (resolve, reject) {

      try{

      let isPresent = await element_name.isDisplayed();

        utils.print("isPresent=" + isPresent);

        expect(isPresent).to.equal(true);

        resolve(true);

      } catch(e) {

        if (testData["SKIP-TESTSET-ONFAIL"]) {

          utils.print("*** SKIP Test set on fail: " + testData["SKIP-TESTSET-ONFAIL"]);

          utils.setDictValues("SKIP-TESTSET", "TRUE");

        }

        utils.printError("Error while checking the presence of element in the page", e);

        reject(false);

      }

    })

  }

  //####################################################################################################
  //Function Name		   : isElementExists in Dom
  //Description      	 : This function can be used to verify a element are present in the page
  //Parameters Used  	 : Reading element_name from excel.
  //########################################################################################################

  this.isElementPresentonDom = async function (testData) {
    browser.pause(2000)
    //wdio
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true;
      await element_name.isExisting().then((isPresent) => {
        utils.print("isPresent=" + isPresent);
        resolve(isPresent);
      }).catch((e) => {
        if (testData["SKIP-TESTSET-ONFAIL"]) {
          utils.print("*** SKIP Test set on fail: " + testData["SKIP-TESTSET-ONFAIL"]);
          utils.setDictValues("SKIP-TESTSET", "TRUE");
        }
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
      // browser.ignoreSynchronization = false;
    })
  }

  //####################################################################################################
  //Function Name		   : clickElement
  //Description      	 : This function can be used to click a element in the page
  //Parameters Used  	 : Reading element_name from excel.
  //######################################################################################################## 
  // this.clickElement = function (testData) {
  //   browser.pause(2000)
  //   var element = testData["element_name"].split(';')
  //   utils.print("element: " + element[0] + "locator: " + element[1])
  //   var element_name = getElementUsing(element[0], element[1])
  //   return new Promise(function (resolve, reject) {
  //     browser.ignoreSynchronization = true;
  //     //wdio -no changes
  //     element_name.click().then(() => {
  //       utils.print("click element:")
  //       resolve(true);
  //     }).catch((e) => {
  //       //utils.print("error in clickelement=" + e);
  //       utils.printError("error in clickelement", e);
  //       reject(false);
  //     });
  //     browser.ignoreSynchronization = false;
  //   })
  // }

  this.clickElement = async function (testData) {
    //browser.sleep(2000) //wdio comment
    var element = testData["element_name"].split(';')
    utils.print("element: " + element[0] + "locator: " + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    //wdio
    return new Promise(async function (resolve, reject) {

      //wdio -no changes
      await element_name.click().then(() => {
        utils.print("click element:")
        resolve(true);
      }).catch((e) => {
        // utils.print("error in clickelement=" + e);
        utils.printError("error in clickelement", e);
        reject(false);
      });
      //browser.ignoreSynchronization = false;
    })
  }


  //####################################################################################################
  //Function Name		   : scrollToClickElement
  //Description      	 : This function can be used to scroll to click a element in the page
  //Parameters Used  	 : Reading element_name from excel.
  //######################################################################################################## 

  this.scrollToClickElement = async function (testData) {
    browser.pause(2000)
    //wdio
    var element = testData["element_name"].split(';')
    utils.print("element: " + element[0] + "locator: " + element[1])
    var element_name = getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {

      // browser.ignoreSynchronization = true;
      //   browser.executeScript("arguments[0].scrollIntoView();", element_name.getWebElement()).then(() => {
      //     browser.executeScript("arguments[0].click();", element_name.getWebElement());
      //     resolve(true);
      //   }).catch((e) => {
      //     //utils.print("error in clickelement=" + e);
      //     utils.printError("error in scrollToClickElement", e);
      //     reject(false);
      //   });
      //   browser.ignoreSynchronization = false;
      // })

      await element_name.scrollIntoView().then(async () => {
        await element_name.click().then(() => {
          utils.print("success clickelement");
          resolve(true);
        }).catch((e) => {
          //utils.print("error in clickelement=" + e);
          utils.printError("error in scrollToClickElement", e);
          reject(false);
        });
      });

    })
  }
  //####################################################################################################
  //Function Name		   : scrollToViewElement
  //Description      	 : This function can be used to scroll to view a element in the page
  //Parameters Used  	 : Reading element_name from excel.
  //######################################################################################################## 
  this.scrollToViewElement = async function (testData) {
    browser.pause(2000)
    //wdio
    var element = testData["element_name"].split(';')
    utils.print("element: " + element[0] + "locator: " + element[1])
    var element_name = getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      //   browser.ignoreSynchronization = true;
      //   browser.executeScript("arguments[0].scrollIntoView();", element_name.getWebElement()).then(() => {
      //     resolve(true);
      //   }).catch((e) => {
      //     //utils.print("error in clickelement=" + e);
      //     utils.printError("error in scrollToViewElement", e);
      //     reject(false);
      //   });
      //   browser.ignoreSynchronization = false;
      // })

      await element_name.scrollIntoView().then(() => {
        utils.print("successfully scrolled to element view");
        resolve(true);
      }).catch((e) => {
        //utils.print("error in scrollToClickElement" + e);
        utils.printError("error in scrollToClickElement", e);
        reject(false);
      });
    });
  }
  //####################################################################################################
  //Function Name		   : doubleClickElement
  //Description      	 : This function can be used to double click a element in the page
  //Parameters Used  	 : Reading element_name from excel.
  //######################################################################################################## 	
  this.doubleClickElement = async function (testData) {
    //wdio
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true;
      await element_name.doubleClick().then(() => {
        utils.print("double click element:")
        resolve(true);
      }).catch((e) => {
        //utils.print("error in doubleClickelement=" + e);
        utils.printError("error in doubleClickElement", e);
        reject(false);
      });
      //  browser.ignoreSynchronization = false;
    })
  }

  //####################################################################################################
  //Function Name		   : deleteAlreadyDownloadedFiles
  //Description      	 : This function can be used to delete all the files from Downloads folder.
  //Parameters Used  	 : none
  //########################################################################################################  
  this.deleteAlreadyDownloadedFiles = function (testData) {
    //const directory = browser.params.userTemplatesTempPath
    const directory = currentRootDirectory + seatConfig.DownloadPath
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
          utils.print("File deleted..!")
        });
      }
    });
  }

  //####################################################################################################
  //Function Name		   : deleteFilesFromDirectory 
  //Description      	 : To delete all the files from the directory.
  //Parameters Used  	 : directory
  //########################################################################################################  
  this.deleteFilesFromDirectory = function (testData) {
    const directory = testData["directory"];
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
          utils.print("File deleted from: " + directory)
        });
      }
    });
  }
  //####################################################################################################
  //Function Name		   : verifyFileDownload
  //Description      	 : This function can be used to verify all the files downloaded in the directory.
  //Parameters Used  	 : Reading fileName from excel.
  //########################################################################################################  
  this.verifyFileDownload = function (testData) {
    return new Promise(function (resolve, reject) {
      utils.print('entering in to verify method 1');
      //filepath = browser.params.userTemplatesTempPath + testData["fileName"];
      filepath = currentRootDirectory + seatConfig.DownloadPath + testData["fileName"];
      //browser.driver.wait(async function () {
      browser.pause(5000)
      fs.exists(filepath, (exists) => {
        if (exists) {
          utils.print('file exist');
          // utils.print(filepath);
          resolve(true)
        } else {
          console.error('file does not exist');
          reject(false)
        }
      })
    })
  }

  //####################################################################################################
  //Function Name		   : uploadFile
  //Description      	 : This function can be used to upload a file  
  //Parameters Used  	 : Reading element_name,filename from excel. The default path is seatConfig.DownloadPath 
  //########################################################################################################	
  this.uploadFile = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    var filename = testData["filename"]
    //wdio
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true;
      //var fileToUpload = browser.params.userTemplatesTempPath + "\\" + filename
      var fileToUpload = currentRootDirectory + seatConfig.DownloadPath + "\\" + filename
      var absolutePath = await path.join(__dirname, fileToUpload);
      await element_name.setValue(absolutePath).then(() => {
        //uploadBtn.click();
        browser.pause(8000)
        // validatePageContainsText(testData["message"]).then((retFlag)=>{
        //   expect(retFlag).to.equal(true)        
        // })
        resolve(true);
        //  browser.ignoreSynchronization = false;
      }).catch((e) => {
        //utils.print("error in uploadBtn=" + e);
        utils.printError("error in uploadBtn", e);
        reject(false);
      })
    })
  }
  //####################################################################################################
  //Function Name		   : uploadAllFiles
  //Description      	 : This function can be used to upload a file to all the elements 
  //Parameters Used  	 : Reading element_name,filename from excel. The default path is seatConfig.DownloadPath
  //########################################################################################################	
  this.uploadAllFiles = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    var filename = testData["filename"].split(',')
    //wdio
    return new Promise(async function (resolve, reject) {
      await filename.map(async function (filename) {
        // browser.ignoreSynchronization = true;
        //var fileToUpload = browser.params.userTemplatesTempPath + "\\" + filename
        var fileToUpload = currentRootDirectory + seatConfig.DownloadPath + "\\" + filename

        var absolutePath = path.join(__dirname, fileToUpload);
        await element_name.setValue(absolutePath).then(() => {
          //uploadBtn.click();
          browser.pause(8000)
          // validatePageContainsText(testData["message"]).then((retFlag)=>{
          //   expect(retFlag).to.equal(true)        
          // })
          resolve(true);
          // browser.ignoreSynchronization = false;
        }).catch((e) => {
          //utils.print("error in uploadBtn=" + e);
          utils.printError("error in uploadAllFiles", e);
          reject(false);
        })
      })
    })
  }
  //####################################################################################################
  //Function Name		   : isElementEnabled
  //Description      	 : This function can be used to check element is enabled or not. 
  //Parameters Used  	 : Reading element_name from excel. 
  //########################################################################################################

  this.isElementEnabled = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    //wdio
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true;
      await element_name.isEnabled().then((isEnabled) => {
        utils.print("isEnabled=" + isEnabled);
        resolve(isEnabled);
      }).catch((e) => {
        //utils.print("element is not enabled in the page=" + e);
        utils.printError("element is not enabled in the page", e);
        reject(false);
      });
      //browser.ignoreSynchronization = false;
    })
  }
  //####################################################################################################
  //Function Name		   : isElementEnabledAll
  //Description      	 : This function can be used to check list of elements is enabled or not. 
  //Parameters Used  	 : Reading element_name from excel. 
  //########################################################################################################
  this.isElementEnabledAll = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getAllElementsUsing(element[0], element[1])
    //wdio
    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true;
      await element_name.map(async (eleText, index) => {
        await eleText.isEnabled().then((isEnabled) => {
          if (isEnabled === true) {
            utils.print("isEnabled=" + isEnabled);
            expect(isEnabled).to.equal(true)
          } else {
            utils.print("element disabled=" + isEnabled);
            expect(isEnabled).to.equal(false)
          }

          resolve(true);
        })
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element is not present in the page", e);
        reject(false);
      });
      //browser.ignoreSynchronization = false;
    })
  }

  //####################################################################################################
  //Function Name		   : elementPresent
  //Description      	 : This function can be used to check element is present or not. 
  //Parameters Used  	 : Reading element_name from excel. 
  //########################################################################################################
  async function elementPresent(testData) {
    //await appDr.enterValueObj(inputPwd,"Input Password",pwd);
    browser.pause(2000)
    var element_name = getElementUsing(testData["element_name"], testData["locator"])
    //wdio
    return new Promise(async function (resolve, reject) {
      // browser.ignoreSynchronization = true;
      await element_name.isDisplayed().then((isPresent) => {
        utils.print("isPresent=" + isPresent);
        expect(isPresent).to.equal(true)
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element is not present in the page", e);
        reject(false);
      });
      //browser.ignoreSynchronization = false;
    })
  }
  //####################################################################################################
  //Function Name		   : doubleClickValidateElements
  //Description      	 : This function can be used to double click and check element text. 
  //Parameters Used  	 : Reading element_name and expected_text from excel. 
  //########################################################################################################
  this.doubleClickValidateElements = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getAllElementsUsing(element[0], element[1])
    var data = testData["data"].split(',')

    //wdio
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true
      await element_name.map(async (element_name, count) => {
        await element_name.doubleClick().then(async () => {
          utils.print("element clicked")
          await data.map(async function (expected_text) {
            await validatePageContainsText(expected_text).then((retFlag) => {
              browser.pause(5000)
              utils.print("retFlag=" + retFlag);
              expect(retFlag).to.equal(true);
            })
          })
        })
        resolve(true);
      }).catch((e) => {
        //utils.print("element not clicked in the page=" + e);
        utils.printError("element is not clicked in the page", e);
        reject(false);
        //browser.ignoreSynchronization = false
      })
    })
  }
  //####################################################################################################
  //Function Name		 : clickAlertPrompt
  //Description      	 : This function can be used to accept or dismiss the alert prompt. 
  //Parameters Used  	 : Reading element_name and expected_text from excel. 
  //########################################################################################################
  this.clickAlertPrompt = async function (testData) {
    //wdio
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true;
      if (testData["AlertPrompt"] == 'Yes') {
        await element_name.click().then(async () => {
          await browser.acceptAlert();
          resolve(true);
        }).catch((e) => {
          //utils.print("error in Accept the alert=" + e);
          utils.printError("error in Accept the alert", e);
          reject(false);
        });
      } else {
        await element_name.click().then(async () => {
          await browser.dismissAlert();
          resolve(true);
        }).catch((e) => {
          //utils.print("error in Dismiss the alert=" + e);
          utils.printError("error in Dismiss the alert", e);
          reject(false);
        });
      }
      //browser.ignoreSynchronization = false;
    })
  }

  //####################################################################################################
  //Function Name		 : dragAndDropUsingCords
  //Description      	 : This function can be used to drag and drop an element using x and y cords. 
  //Parameters Used  	 : Reading element_name and X and Y Cords from excel. 
  //########################################################################################################
  this.dragAndDropUsingCords = async function (testData) {
    //Need to checkk--------
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      await element_name.dragAndDrop({ x: parseInt(testData["Xcord"]), y: parseInt(testData["Ycord"]) }).then(() => {
        browser.pause(2000)
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
      //browser.ignoreSynchronization = false
    });
  }
  //####################################################################################################
  //Function Name		 : dragAndDropElementExtent
  //Description      	 : This function can be used to drag and drop an element which is specified in DragDrop.js file. 
  //Parameters Used  	 : Reading from DragDrop.js file. 
  //########################################################################################################
  this.dragAndDropElementExtent = async function (testData) {
    //wdio
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true
      await browser.executeAsync(script).then(() => {
        browser.pause(2000)
        resolve(true);

      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
      //browser.ignoreSynchronization = false
    });
  }
  //####################################################################################################
  //Function Name		 : clearTextValue
  //Description      	 : This function can be used to clear the text value. 
  //Parameters Used  	 : Reading from element_name 
  //########################################################################################################
  this.clearTextValue = async function (testData) {
    //wdio
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true
      await element_name.clearValue().then(() => {
        utils.print("Value cleared: ")
        resolve(true);
        //browser.refresh();
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
      //browser.ignoreSynchronization = false
    });
  }
  //####################################################################################################
  //Function Name		 : dragAndDropElement
  //Description      	 : This function can be used to drag and drop an element uisng source and destination elements. 
  //Parameters Used  	 : Reading source_name and dest_element from excel.
  //########################################################################################################

  
  // this.dragAndDropElement = async function (testData) {
  //   //wdio
  //   var element = testData["source_name"].split(';')
  //   // utils.print("element:" + element[0] + "locator:" + element[1])
  //   var element_name = getElementUsing(element[0], element[1])
  //   var delement = testData["dest_element"].split(';')
  //   var dest_element = getElementUsing(delement[0], delement[1])
  //   return new Promise(async function (resolve, reject) {
  //     //browser.ignoreSynchronization = true
  //     await browser.dragAndDrop(element_name, dest_element).then(() => {
  //       browser.pause(2000)
  //       resolve(true);

  //     }).catch((e) => {
  //       //utils.print("element not present in the page=" + e);
  //       utils.printError("element not present in the page", e);
  //       reject(false);
  //     });
  //     //browser.ignoreSynchronization = false
  //   });
  // }

    this.dragAndDropNode = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = await getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      try {
          await element_name.dragAndDrop({x: parseInt(testData["Xcord"]), y:parseInt(testData["Ycord"])});
          await browser.pause(5000);
          resolve(true);
        }catch (e) {
          utils.printError("Error while dragging and dropping the element", e);
          reject(false);
        }
    });
  }

  this.dragAndDropElement = async function (testData) {
    var element = testData["source_name"].split(';')
    var element_name = await getElementUsing(element[0], element[1])
    var delement = testData["dest_element"].split(';')
    var dest_element = await getElementUsing(delement[0], delement[1])
    return new Promise(async function (resolve, reject) {
      try {
        await element_name.click();
        await element_name.dragAndDrop(dest_element,10000);
        resolve(true);
        }catch (e) {
          utils.printError("Error while dragging and dropping the element", e);
          reject(false);
        }
    });
  }

  // this.dragAndDropElement = async function (testData) {
  //   //wdio
  //   var element = testData["source_name"].split(';')
  //   // utils.print("element:" + element[0] + "locator:" + element[1])
  //   var element_name = getElementUsing(element[0], element[1])
  //   var delement = testData["dest_element"].split(';')
  //   var dest_element = getElementUsing(delement[0], delement[1])
  //   return new Promise(async function (resolve, reject) {
  //     //browser.ignoreSynchronization = true
  //     await element_name.dragAndDrop(dest_element).then(() => {
  //       browser.pause(2000)
  //       resolve(true);

  //     }).catch((e) => {
  //       //utils.print("element not present in the page=" + e);
  //       utils.printError("element not present in the page", e);
  //       reject(false);
  //     });
  //     //browser.ignoreSynchronization = false
  //   });
  // }

  //####################################################################################################
  //Function Name		   : mouseMoveAction
  //Description      	 : This function can be used to move the mouse to an element 
  //Parameters Used  	 : Reading element_name from excel.
  //########################################################################################################
  this.mouseMoveAction = async function (testData) {
    //wdio
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true
      await element_name.moveTo().then(() => {
        resolve(true);
      }).catch((e) => {
        // utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
        //browser.ignoreSynchronization = false
      })
    })
  }

  /* Wait for element to be clickable 
*/
  async function waitForObjectToBeClickable(obj) {
    //wdio
    //var isClickable = global.EC.elementToBeClickable(obj);
    //var isClickable = await obj.isClickable();
    utils.print("waitForObjectToBeClickable");
    await obj.waitForClickable({ timeout: 10000 });
    //browser.wait(isClickable, 5000); //wait for an element to become clickable
  }

  /* parameters:
    * oRef - Object which has to be clicked
    */
  async function click(oRef, name) {
    //wdio
    try {
      //return oRef().click();
      return await oRef.click();
    } catch (e) {
      var m = "Error in Clicking the element"
      if (name) m += " " + name
      //utils.print(m, e)
      utils.printError(m, e)
    }
  }

  /* parameters:
   * oRef - Object which has to be set. Can be Text/Textarea etc. types
   * val - alpha numeric value to be set
   */

  async function setValue(oRef, val, name) {
    //wdio
    try {
      //return oRef().sendKeys(val);
      return await oRef.setValue(val);
    } catch (e) {
      var m = "Error in sending keys "
      if (name) m += " " + name
      utils.print(m, e)
    }
  }

  // following functions to be tested and verified

  /* parameters:
   * url - Full Url to launch the application
   */
  async function launch(url) {
    //wdio
    try {
      //browser.get(url);
      await browser.url(url);
      //browser.waitForAngular();
      //browser.driver.manage().window().maximize();
    } catch (e) {
      // utils.print("Error in launching app with url: " + url, e)
      utils.printError("Error in launching app with url: " + url, e)
    }
  }
  /* parameters:
   * obj - parent Object which has child option tags
   * index - start from 0 - n as visible on screen
   */
  async function selectOptionByIndex(obj, index) {
    // Need to check
    // obj.all(by.tagName('option')).then(function (options) {
    try {
      await obj.selectByIndex(index);
      return true;
    } catch (e) {
      utils.printError("Error in selecting Option by index", obj, index, e)
    }

  }


  /* parameters:
   * oRef - Object which has to be clicked
   */
  async function getText(oRef, name) {
    try {
      //return oRef().getText();
      //wdio
      return await oRef.getText();
    } catch (e) {
      var m = "Error in getting the element text"
      if (name) m += " " + name
      //utils.print(m, e)
      utils.printError(m, e)
    }
  }

  /* returns the current url on screen
   */
  async function getCurrentUrl() {
    //wdio
    try {
      return await browser.getUrl();
    } catch (e) {
      //utils.print("Error in getting current url: ", e)
      utils.printError("Error in getting current url: ", e)
    }
  }

  /* returns the current title of the browser
   */
  async function getTitle() {
    //wdio
    try {
      return await browser.getTitle();
    } catch (e) {
      utils.print("Error in getting current url: ", e)
      //utils.printError("Error in getting current url: ", e)
    }
  }

  /* Switches to the newly opened tab
   */
  async function switchToNewTab() {
    //wdio
    await browser.getWindowHandles().then(async function (handles) {
      await browser.switchToWindow(handles[1]);
    });
  }

  /* Switches back to main tab by closing the new tab
   */
  async function switchBackToMainTab() {
    //wdio
    await browser.getWindowHandles().then(async function (handles) {
      //We currently are on the second tab...
      await browser.switchToWindow(handles[1]);
      await browser.close();
      await browser.switchToWindow(handles[0]);
    });
  }

  /* Wait for element to be visible 
   */
  async function waitForObjectToBeVisible(obj) {
    //var EC = protractor.ExpectedConditions;
    //wdio
    //var isClickable = EC.elementToBeVisible(obj);
    utils.print("waitForObjectToBeVisible");
    await obj.waitForDisplayed({ timeout: 10000 })
    //browser.wait(isClickable, 5000); //wait for an element to become clickable
  }

  async function quitAll() {
    //browser.driver.close();
    //wdio
    const handles = await browser.getWindowHandles();
    if (handles.length > 1) {
      for (var i = handles.length - 1; i >= 0; i--) {
        await browser.switchToWindow(handles[i]);
        await browser.close();
      }
    }
  }

  function reportExpectMsg(m) {
    expect("Msg:" + m).toContain(m)
  }

  function checkExpectStr(s, txt, paramName) {
    if (txt.includes(s)) {
      var oStr = "Checked Value: <b><i>" + s + "</i></b>"
      if (paramName)
        oStr = "Checked " + paramName + ": <b><i>" + s + "</i></b>"
      reportExpectMsg(oStr);
    }
    else
      expect(txt).toContain(s)
  }

  async function restart() {
    //wdio
    try {
      await browser.reloadSession();
    } catch (e) {
      //utils.print("Error While restarting", e)
      utils.printError("Error While restarting", e)
    }
  }

  async function scrollToView(el) {
    //wdio
    // await browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    await el.scrollIntoView();
  }


  //####################################################################################################
  //Function Name		   : OpenURL
  //Description      	 : This function can be used to To open URL of the application with return of the promise
  //Parameters Used  	 : {array} testData:  test data for the action
  //########################################################################################################
  this.OpenURL = async function (testData) {
    //wdio
    var url = testData["url"];
    await browser.url(url);
    await browser.maximizeWindow()
    await browser.pause(3000);
    return true;
  }

  /*Function:OpenURLNewTab: can be called automatically from data file using Test case handler...
    Mandatory Parameter: Each function should have only single parameter (testData object)
     * @param {array} testData:  test data for each action
     * @return {boolean} true (no validation for login)
    */
  // To open URL of the application in another tab
  this.OpenURLNewTab = async function (testData) {
    //wdio
    var url = testData["url"];

    // for some places: ignore sync based on browser and angular page
    if (browser.browserName !== 'chrome') {
      //for edge: before url get function
      browser.ignoreSynchronization = true;
    }

    utils.print("Open in new tab: " + url);
    await browser.newWindow(url)
    await browser.maximizeWindow()
    // await browser.executeScript("window.open('about:blank','_blank');")

    await browser.getWindowHandles().then(async function (handles) {
      await browser.switchToWindow(handles[1]);
    });

    await browser.pause(3000);

    //   await browser.url(url);

    return true;
  }

  // To Set focus on new tab
  this.openFaqTab = async function (testData) {
    //wdio
    //await browser.waitForAngularEnabled(false);
    let windowHandles = await browser.getWindowHandles();
    var url = testData["url"];

    // for some places: ignore sync based on browser and angular page
    if (browser.browserName !== 'chrome') {
      //for edge: before url get function
      browser.ignoreSynchronization = true;
    }
    utils.print("Open in new tab: " + url);
    await browser.getWindowHandles().then(async function (handles) {
      await browser.switchToWindow(handles[1]);
    });
    // await appDr.switchToNewTab();
    await browser.pause(30000);

    //loping opened windows and navigating to main tab
    await browser.getWindowHandles().then(async function (handles) {
      await browser.switchToWindow(handles[0])
    })
    return true;
  }

  //####################################################################################################
  //Function Name		   : syncTimeSetup
  //Description      	 : This function can be used to To syc time and obj repo optinal setting to json
  //Parameters Used  	 : {array} testData:  test data for the action
  //########################################################################################################
  this.syncTimeSetup = async function (testData) {
    var waitTime="2000";  //default
        // set wait time: read from test data file
        if (testData["SLEEP"]) {
          waitTime=testData["SLEEP"];
          if (testData["SLEEP"] == "2000") {
            browser.pause(2000);
          } else if (testData["SLEEP"] == "4000") {
            browser.pause(4000);
          } else if (testData["SLEEP"] == "8000") {
            browser.pause(8000);
          } else {
            utils.print("pause: wait for: " + testData["SLEEP"]);
            browser.pause(parseInt(testData["SLEEP"]));
          }
          //since sleep is not stable, add implicit also
          await browser.setTimeout({ 'additional implicit wait': parseInt(waitTime) })
        }
        
        
    if (testData["WAIT_PROPS"]) {
      //wait for element
      var waitProps = testData["WAIT_PROPS"];
      var element = testData["element_name"].split(';')
      utils.print("element:" + element[0] + "locator:" + element[1])
      var element_name = getElementUsing(element[0], element[1])


      return new Promise(async function (resolve, reject) {

        try {

          switch (waitProps) {
            case "elementToBeClickable":
              utils.print("syncTimeSetup: elementToBeClickable");
              const el = await $(element[0]);
              let clickable = await el.isClickable();
              console.log(clickable); // outputs: true or false
              // wait for element to be clickable
              await browser.waitUntil(() => el.isClickable())
              break;
            case "visibilityOf":
              utils.print("syncTimeSetup: visibilityOf");
              await (await element_name).waitForDisplayed({ timeout: 3000 });
              break;
            case "Implicit":
              utils.print("syncTimeSetup: Implicit");
              await browser.setTimeout({ 'implicit': parseInt(waitTime) })
              break;
            default:
              throw ('This wait is not handled in common page');
              break;
          }

          resolve(true);

        }
        catch (e) {
          //utils.print("element not present in the page=" + e);
          utils.printError("failed in syncTimeSetup waitProps: ", e);
          reject(false);
        };

      });

    }


    // for non-angular site
    if (testData["IGNORE_SYNC"]) {
      if (testData["IGNORE_SYNC"] == "TRUE") {
        utils.print("ignore Synchronization");
        browser.ignoreSynchronization = true;
        //await browser.waitForAngularEnabled(false);
      } else {
        utils.print("use Synchronization");
        browser.ignoreSynchronization = false;
        //await browser.waitForAngularEnabled(true);
      }
    }

    /* Load object repository file json or global data text file
*  This is used to load object repository required to execute actions execute or validate
*/
    if (testData["OBJ_REPO"]) {
      if (testData["OBJ_REPO"] == "TEXT") {
        global.objProps = "";
      } else {
        utils.print("JSON Repo: Read object properties")
        global.objProps = require(currentRootDirectory + "\\" + testData["OBJ_REPO"]);
      }
    }

    return true;
  }


  //####################################################################################################
  //Function Name		   : keySelection
  //Description      	 : This function can be used to To send keys to the page in focus
  //Parameters Used  	 : {array} testData:  test data for the action
  //########################################################################################################
  this.keySelection = async function (testData) {
    await browser.pause(2000);
    utils.print("******* Send Key to the focussed page: " + testData["KEY"])
    if (testData["KEY"] == "ESCAPE") {
      browser.keys("\uE00C")
    } else if (testData["KEY"] == "ENTER") {
      browser.keys("\uE007")
    } else if (testData["KEY"] == "BACK_SPACE") {
      browser.keys("\uE003")
    } else if (testData["KEY"] == "TAB") {
      browser.keys("\uE004")
    } else if (testData["KEY"] == "REFRESH") {
      browser.refresh();
    } else if (testData["KEY"] == "CONTROL") {
      browser.keys("\uE009");
    } else if (testData["KEY"] == "CLEAR") {
      browser.keys("\uE005")
    } else {
      //send any text value using KEY
      browser.keys(testData["KEY"]);
    }
    browser.pause(2000);
    return true;
  }

  //####################################################################################################
  //Function Name		 : executeBroswerScript
  //Description      	 : This function can be used to execute any browser java script 
  //Parameters Used  	 : Reading from SCRIPT name 
  //########################################################################################################
  this.executeBroswerScript = async function (testData) {
    var scriptPath = testData["SCRIPT"];
    //wdio
    if (scriptPath) {
      var script = fs.readFileSync(process.cwd() + "/" + scriptPath, 'utf8');
      return new Promise(async function (resolve, reject) {
        //browser.ignoreSynchronization = true
        await browser.executeAsync(script).then(async () => {
          await browser.pause(2000)
          resolve(true);

        }).catch((e) => {
          //utils.print("element not present in the page=" + e);
          utils.printError("error in executeBroswerScript", e);
          reject(false);
        });
        //browser.ignoreSynchronization = false
      });
    }
  }


  //####################################################################################################
  //Function Name		   : elementNotDisplayed
  //Description      	 : This function can be used to verify a element IS NOT present in the page
  //Parameters Used  	 : Reading element_name from excel.
  //########################################################################################################
  async function elementNotDisplayed(testData) {
    //wdio
    browser.pause(2000)
    var element = testData["element_name"].split(';')
    utils.print("element: " + element[0] + "locator: " + element[1])
    var element_name = getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true;
      await element_name.isDisplayed().then((isPresent) => {
        utils.print("isPresent=" + isPresent);
        reject(false);
      }).catch((e) => {
        //utils.print("Expected: element not present in the page=" + e);
        utils.printError("elementNotDisplayed: element not present in the page", e);
        resolve(true);
      });
      // browser.ignoreSynchronization = false;
    })
  }


  //####################################################################################################
  //Function Name		   : clickElementContainsText
  //Description      	 : This function can be used to click the element based on text of the element
  //Parameters Used  	 : Reading element_name visible text from excel.
  //######################################################################################################## 

  this.clickElementContainsText = async function (testData) {
    // to check text on any page
    //wdio
    await browser.pause(3000)
    var visibleText = testData["visibleText"];
    // utils.print(element_name)
    return new Promise(async function (resolve, reject) {
      await browser.pause(2000)
      await clickPageContainsText(visibleText).then((retFlag) => {
        utils.print("retFlag=" + retFlag);
        expect(retFlag).to.equal(true);
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("clickElementContainsText: element not present in the page", e);
        reject(false);
      });
      //reject(false);
    })
  }


  //####################################################################################################
  //Function Name		   : validateElementContainsText
  //Description      	 : This function can be used to validate the element based on text of the element
  //Parameters Used  	 : Reading element_name visible text from excel.
  //######################################################################################################## 

  this.validateElementContainsText = async function (testData) {
    await browser.pause(5000)
    //wdio
    // to check text on any page
    var visibleText = testData["visibleText"];
    //utils.print(element_name);
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true
      await validatePageContainsText(visibleText).then((retFlag) => {
        utils.print("retFlag=" + retFlag);
        expect(retFlag).to.equal(true);
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("validateElementContainsText: element not present in the page", e);
        reject(false);
      });
      //reject(false);
      // browser.ignoreSynchronization = false;
    })

  }

  //####################################################################################################
  //Function Name		   : isElementSelected
  //Description      	 : This function can be used to check element is selected or not
  //Parameters Used  	 : Reading element_name from excel. 
  //########################################################################################################

  this.isElementSelected = async function (testData) {
    //wdio
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      //browser.ignoreSynchronization = true;
      await element_name.isSelected().then((isSelected) => {
        utils.print("isSelected=" + isSelected);
        resolve(true);
      }).catch((e) => {
        //utils.print("element is not selected in the page=" + e);
        utils.printError("isElementSelected: element not selected in the page", e);
        reject(false);
      });
      //browser.ignoreSynchronization = false;
    })
  }

  //####################################################################################################
  //Function Name		   : waitForElementToBeClickable
  //Description      	 : This function can be used to wait for the element to be clickable
  //Parameters Used  	 : {array} testData:  test data for the action
  //######################################################################################################## 

  this.waitForElementToBeClickable = async function (testData) {
    // to check element on any page
    //wdio

    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getElementUsing(element[0], element[1])
    // return new Promise(function (resolve, reject) {
    //   browser.ignoreSynchronization = true
    //   appDr.clickButtonObj(element_name, element[0], clickFlag).then(() => {
    //     utils.print("waitForElementToBeClickable: Passed");
    //     resolve(true);
    //   }).catch((e) => {
    //     utils.printError("waitForElementToBeClickable: Failed", e);
    //     reject(false);
    //   });

    //   browser.ignoreSynchronization = false;
    // })
    //wdio
    return new Promise(async function (resolve, reject) {
      await element_name.waitForClickable({ timeout: 50000 }).then(async () => {


        utils.print("waitForElementToBeClickable: Passed");
        resolve(true);
      }).catch((e) => {
        //utils.print("waitForElementToBeClickable: Failed", e);
        utils.printError("waitForElementToBeClickable: Failed", e);
        reject(false);
      });


      //   browser.ignoreSynchronization = true
      //   browser.ignoreSynchronization = false;
    })

  }


  //####################################################################################################
  //Function Name		   : getLatestDownloadedfile
  //Description      	 : This function can be used to get the file name of the downloaded file
  //Parameters Used  	 : Reading testdata file name extension
  //########################################################################################################

  this.getLatestDownloadedfile = async function (testData) {
    //wdio
    var startFileWith = testData["file_start_with"];
    var downloadFilePath = path.resolve(__dirname, currentRootDirectory + seatConfig.DownloadPath);
    utils.print("File Download directory path: " + downloadFilePath);

    await getLatestFile({ directory: downloadFilePath, extension: startFileWith }, async (filename = null) => {
      utils.print("Downloads-getLatestFile: " + filename);
      //readWriteRunTimeValues("IPLStatusDataFile",filename);
      await readWriteRunTimeValues(startFileWith, filename);
      expect(filename).to.include(startFileWith);
    });

    return true;
  }

  //internal method for getLatestDownloadedfile - to write run time values for IPLStatusDataFile
  async function readWriteRunTimeValues(paramName, paramData) {
    //wdio
    //read run time values
    var runTimeValues = require(currentRootDirectory + seatConfig.DownloadPath + '/runTimeValues.json');
    //store run time values
    runTimeValues[paramName] = paramData;
    fs.writeFileSync(currentRootDirectory + seatConfig.DownloadPath + '/runTimeValues.json', JSON.stringify(runTimeValues));

    return true;
  }

  //internal method for getLatestDownloadedfile - to check file start with
  async function getLatestFile({ directory, extension }, callback) {
    //wdio
    fs.readdir(directory, (_, dirlist) => {
      const latest = dirlist.map(_path => ({ stat: fs.lstatSync(path.join(directory, _path)), dir: _path }))
        .filter(_path => _path.stat.isFile())
        .filter(_path => extension ? _path.dir.startsWith(`${extension}`) : 1)
        .sort((a, b) => b.stat.mtime - a.stat.mtime)
        .map(_path => _path.dir);
      callback(latest[0]);
    });
  }
  //internal method for getLatestDownloadedfile - to check file end with  :NOT USED
  function getLatestFileExtn({ directory, extension }, callback) {
    fs.readdir(directory, (_, dirlist) => {
      const latest = dirlist.map(_path => ({ stat: fs.lstatSync(path.join(directory, _path)), dir: _path }))
        .filter(_path => _path.stat.isFile())
        .filter(_path => extension ? _path.dir.endsWith(`.${extension}`) : 1)
        .sort((a, b) => b.stat.mtime - a.stat.mtime)
        .map(_path => _path.dir);
      callback(latest[0]);
    });
  }


  //####################################################################################################
  //Function Name		   : readDownloadedExcelData
  //Description      	 : This function can be used to read the data of the downloaded excel file
  //Parameters Used  	 : Reading testdata file (from a run time values variable) and sheet name
  //########################################################################################################
  this.readDownloadedExcelData = async function (testData) {
    var startFileWith = testData["file_start_with"]; // this holds run time variable which contains actual file name
    var sheetName = testData["sheet_name"];
    //var sheetName = "IPLStatus";
    //read run time values
    var runTimeValues = require(currentRootDirectory + seatConfig.DownloadPath + '/runTimeValues.json');

    var sourceFile = currentRootDirectory + seatConfig.DownloadPath + "/" + runTimeValues[startFileWith];
    var targetFile = currentRootDirectory + seatConfig.DownloadPath + "/latest-" + runTimeValues[startFileWith];
    //var targetFile = currentRootDirectory + seatConfig.DownloadPath + "/" + "latest-IPL Status-2021_07_02_13_24_13.xlsx";
    //store run time values
    runTimeValues["testSetname"] = sheetName;
    //runTimeValues["excelDataPath"] = currentRootDirectory + seatConfig.DownloadPath + "/" + runTimeValues["IPLStatusDataFile"];
    runTimeValues["excelDataPath"] = targetFile;
    fs.writeFileSync(currentRootDirectory + seatConfig.DownloadPath + '/runTimeValues.json', JSON.stringify(runTimeValues));

    fs.writeFileSync(targetFile, fs.readFileSync(sourceFile));
    // to read contents of excel 
    var excelSuite = require('../../Scripts/mainMod')().start();
    var objExcelData = await excelSuite.readExcelFile(sheetName); // ExcelData is the global variable from config
    utils.print("Datasheet object ======>>>>>>>: " + objExcelData);
    // convert to json
    var jsonFilename = path.basename(targetFile).replace(".xlsx", ".json");
    jsonFilename = currentRootDirectory + seatConfig.DownloadPath + "/" + jsonFilename;
    fs.writeFileSync(jsonFilename, JSON.stringify(objExcelData));
    utils.print("Datasheet converted to json");

    return true;
  }
  //####################################################################################################
  //Function Name		   : getAllElementCountValue
  //Description      	 : This function can be used to get count of elements
  //Parameters Used  	 : Reading element_name and expected_count parameters from excel.
  //######################################################################################################## 
  this.getAllElementCountValue = async function (testData) {
    var element = testData["element_name"].split(';')
    utils.print("element:" + element[0] + "locator:" + element[1])
    var element_name = getAllElementsUsing(element[0], element[1])
    return new Promise(async function (resolve, reject) {
      browser.ignoreSynchronization = true
      await element_name.length.then((count) => {
        utils.print("count Value : " + count)
        expect(count).to.equal(parseInt(testData["expected_count"]))
        resolve(true);
      }).catch((e) => {
        //utils.print("element not present in the page=" + e);
        utils.printError("element not present in the page", e);
        reject(false);
      });
      browser.ignoreSynchronization = false
    });
  }

   function rmdir(dir) {
    var list = fs.readdirSync(dir);
    for(var i = 0; i < list.length; i++) {
      var filename = path.join(dir, list[i]);
      var stat = fs.statSync(filename);
  
      if(filename == "." || filename == "..") {
        // pass these files
      } else if(stat.isDirectory()) {
        // rmdir recursively
        //  browser.pause(3000);
        rmdir(filename);
      } else {
        // rm fiilename
        fs.unlinkSync(filename);
      }
    }
    fs.rmdirSync(dir);
  }

  return {
    launch: launch,
    restart: restart,
    setValue: setValue,
    selectOptionByIndex: selectOptionByIndex,
    click: click,
    getText: getText,
    getCurrentUrl: getCurrentUrl,
    getAllElementsUsing: getAllElementsUsing,
    getTitle: getTitle,
    getElementUsing: getElementUsing,
    switchToNewTab: switchToNewTab,
    waitForObjectToBeVisible: waitForObjectToBeVisible,
    switchBackToMainTab: switchBackToMainTab,
    reportExpectMsg: reportExpectMsg,
    checkExpectStr: checkExpectStr,
    scrollToView: scrollToView,
    quitAll: quitAll,
    waitForObjectToBeClickable: waitForObjectToBeClickable,
    ClickPageContainsText: ClickPageContainsText,
    clickPageContainsText: clickPageContainsText,
    checkBackgroundColorAllelements: checkBackgroundColorAllelements,
    clickElement: clickElement,
    isElementPresent: isElementPresent,
    setTextValue: setTextValue,
    getTextValue: getTextValue,
    getAllElementTextValue: getAllElementTextValue,
    checkBackgroundColor: checkBackgroundColor,
    matchRegExpression: matchRegExpression,
    getElementCountValue: getElementCountValue,
    doubleClickElement: doubleClickElement,
    uploadFile: uploadFile,
    isElementEnabled: isElementEnabled,
    isElementEnabledAll: isElementEnabledAll,
    verifyHighlighted: verifyHighlighted,
    clickAllElementContainsText: clickAllElementContainsText,
    uploadAllFiles: uploadAllFiles,
    verifyAllElementsPresent: verifyAllElementsPresent,
    doubleClickValidateElements: doubleClickValidateElements,
    getAllElementAttribute: getAllElementAttribute,
    setTextAllElements: setTextAllElements,
    selectDropDownValue: selectDropDownValue,
    selectDropDownByIndex: selectDropDownByIndex,
    selectAllDropDownByIndex: selectAllDropDownByIndex,
    clickAlertPrompt: clickAlertPrompt,
    getAllElementTitle: getAllElementTitle,
    getElementAttribute: getElementAttribute,
    scrollToViewElement: scrollToViewElement,
    scrollToClickElement: scrollToClickElement,
    deleteFilesFromDirectory: deleteFilesFromDirectory,
    verifyFileDownload: verifyFileDownload,
    deleteAlreadyDownloadedFiles: deleteAlreadyDownloadedFiles,
    clickChildElement: clickChildElement,
    convertExcelDataSheetToJson: convertExcelDataSheetToJson,
    dragAndDropElement: dragAndDropElement,
    clearTextValue: clearTextValue,
    dragAndDropElementExtent: dragAndDropElementExtent,
    dragAndDropUsingCords: dragAndDropUsingCords,
    mouseMoveAction: mouseMoveAction,
    validateAllElementContainsText: validateAllElementContainsText,
    OpenURL: OpenURL,
    OpenURLNewTab: OpenURLNewTab,
    openFaqTab: openFaqTab,
    syncTimeSetup: syncTimeSetup,
    keySelection: keySelection,
    executeBroswerScript: executeBroswerScript,
    elementNotDisplayed: elementNotDisplayed,
    validateElementContainsText: validateElementContainsText,
    clickElementContainsText: clickElementContainsText,
    isElementSelected: isElementSelected,
    waitForElementToBeClickable: waitForElementToBeClickable,
    getLatestDownloadedfile: getLatestDownloadedfile,
    readDownloadedExcelData: readDownloadedExcelData,
    validatePageContainsTextUsingElement: validatePageContainsTextUsingElement,
    validatePageContainsTextUsingClass: validatePageContainsTextUsingClass,
    validatePageContainsText: validatePageContainsText,
    ClickPageContainsTextUsingClassName: ClickPageContainsTextUsingClassName,
    readWriteRunTimeValues: readWriteRunTimeValues,
    getLatestFile: getLatestFile,
    getAllElementCountValue: getAllElementCountValue,
    isElementPresentonDom:isElementPresentonDom,
    dragAndDropNode :this.dragAndDropNode,
    getElementCount:getElementCount,
    rmdir:rmdir

  }
};
module.exports = commonPage();
