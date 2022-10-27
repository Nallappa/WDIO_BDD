const { Given, When, Then} = require('@cucumber/cucumber');
const testPage = require('../pageobjects/TestPage')
const rackPage = require('../pageobjects/RackPage')
const downloadpage = require('../pageobjects/downloadPage')


Given("User Login to DCO IP {string} with the given credentials {string} {string}", async (url,usr,pas) => {
    await testPage.openurl(url)
    await testPage.enterUserName(usr)
    await testPage.enterPassword(pas)
    await testPage.clickLogin()
});

When("Naviagate to abcd room {string} and equipment room {string}", async (rack,equipment) => {
    // await browser.pause(10000);
    await rackPage.NavigatetoEquipmentPage(rack,equipment);
});

Then("Get Rack item count", async () => {
    await rackPage.getRackItemCount();
});
 
Then("Validate Rack count {string}", async (count) => {
    await rackPage.ValidateRackCount(count);
});

Then("Drag and drop in the front view", async () => {
    await rackPage.validateDragandDrop();
});

Then("Drag and drop in the front view", async () => {
    await rackPage.validateDragandDrop();
});

Then("Navigate to downloads page and download the exe file", async () => {
    await downloadpage.navigatetoDownloadsPage();
});

Then("Validate the downloaded exe file", async () => {
    await downloadpage.ValidateDownladedFile();
});





