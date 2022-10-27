const commonPage = require("../../functionsPage/WdioPage");
const utils = require("../../functionsPage/utils");
const { executeBroswerScript } = require("../../functionsPage/WdioPage");
const { expect } = require("chai");
const path = require("path");
const fs = require("fs");
const { URL } = require("url");
var avataricon = "//div[@class='auto-avatar small']";
var selectoption =
  "(//*[@id='dropdown-account']//span[contains(text(),'Download')]/ancestor::a)[1]";
var clickdownloadling = "//div[@class='dropdown-parent ng-star-inserted']/a";
var selectwindowns32 =
  "//ul[@class='f-dropdown f-open-dropdown']//a[contains(text(),'Windows 32-bit')]";
let downloadHref;

class downloadPage {
  async navigatetoDownloadsPage() {
    var testData = {
      element_name: avataricon,
    };
    var testData1 = {
      element_name: selectoption,
    };
    var testData2 = {
      element_name: clickdownloadling,
    };
    await commonPage.clickElement(testData);
    await browser.pause(3000);
    await commonPage.clickElement(testData1);
    await browser.pause(3000);
    await commonPage.clickElement(testData2);
    await browser.pause(3000);
    let downloadLink = await $(selectwindowns32);
    downloadHref = await downloadLink.getAttribute("href");
  }

  async ValidateDownladedFile() {
    const rootDirectory = process.cwd();
    const downloadsPath = path.join(rootDirectory, global.downloadDir);
    console.log(downloadsPath);
    await browser.cdp("Page", "setDownloadBehavior", {
      behavior: "allow",
      downloadPath: downloadsPath,
    });
    var testData3 = {
      element_name: selectwindowns32,
    };
    await commonPage.clickElement(testData3);

    const downloadUrl = new URL(downloadHref);
    const fullPath = downloadUrl.pathname;
    const splitPath = fullPath.split("/");
    const fileName = splitPath.splice(-1)[0];
    const filePath = path.join(downloadsPath, fileName);
    const timeout = 600000;

    let fileexist = await browser.call(() => {
      return new Promise(function (resolve, reject) {
        var timer = setTimeout(function () {
          watcher.close();
          reject(
            new Error(
              "File did not exists and was not created during the timeout."
            )
          );
        }, timeout);

        fs.access(filePath, fs.constants.R_OK, function (err) {
          if (!err) {
            clearTimeout(timer);
            watcher.close();
            resolve(true);
          }
        });

        var dir = path.dirname(filePath);
        var basename = path.basename(filePath);
        var watcher = fs.watch(dir, function (eventType, filename) {
          if (eventType === "rename" && filename === basename) {
            clearTimeout(timer);
            watcher.close();
            resolve(true);
          }
        });
      });
    });
    expect(fileexist).to.equal(true);
  }
}

module.exports = new downloadPage();
