const sellerOrderDetailsPage = require("../../../selectors/seller/orderDetails");
const customerOrderDetailsPage = require("../../../selectors/customer/orderDetails");
const customerOrdersPage = require("../../../selectors/customer/orders");
const sellerOrdersPage = require("../../../selectors/seller/orders");

const action = require("../../actions");

const { pending, preparing, inTransit, delivered } =
  require("../../../config/constants").frontEnd.deliveryStatus;

const validateCOD = async ({COD, SOD, situation, status, deliveryBtnDisabled, currentOrder: { saleId }}) => {
  if([1,2,3].includes(situation)){
    await COD.bringToFront();
    
    if([1,3].includes(situation)){
      await expect(COD).toGetTextFromElement(
        customerOrderDetailsPage.element.orderDetails.label.deliveryStatus,
        status
      );
    
      await expect(COD).toFindElement(
        customerOrderDetailsPage.button.deliveryCheck[deliveryBtnDisabled]
      );
    }

    if(situation === 2){
      await expect(COD).toGetTextFromElement(
        customerOrdersPage.element.card.deliveryStatus + `[data-testid$='-${saleId}']`,
        status
      );     
    }

    await COD.waitForTimeout(1000);
    await SOD.bringToFront();
  }
}

const restartPage = async ({ realTime, situation, SOD, COD, currentOrder: { saleId: orderId }, sellerOrderPage= false }) => {
  if(realTime) return Promise.resolve(true);
  
  await SOD.bringToFront();

  expect(
    (await action.common.navigate.logout.default(SOD)) &&
    (await action.common.navigate.login.default(SOD, 'seller')) &&
    !sellerOrderPage ? 
      (await action.common.navigate.seller.orderDetails.default(SOD, orderId)) :
      true
  ).toBeTruthy();

  await SOD.waitForTimeout(1000);

  if([1,2,3].includes(situation)){
    await COD.bringToFront();

    expect(
      (await action.common.navigate.logout.default(COD)) &&
      (await action.common.navigate.login.default(COD, 'customer')) &&
      (await action.common.navigate.customer.orders.default(COD)) && 
      [1,3].includes(situation) ? 
        (await action.common.navigate.customer.orderDetails.default(COD, orderId)) : 
        true
    ).toBeTruthy();

    await COD.waitForTimeout(1000);
  }

  return Promise.resolve(true);
};

const updateStatus = async ({ 
  situation = 0, 
  SOD, 
  COD, 
  realTime = false, 
  currentOrder 
}) => {
  if(situation === 2){
    expect(
      await action.common.navigate.customer.orders.default(COD)
    ).toBeTruthy();
  }

  // Pendente
  await expect(SOD).toGetTextFromElement(
    sellerOrderDetailsPage.element.orderDetails.label.deliveryStatus,
    pending
  );

  await expect(SOD).toFindElement(
    sellerOrderDetailsPage.button.preparingCheck.notDisabled
  );

  await validateCOD({ 
    COD, 
    SOD, 
    situation, 
    status: pending, 
    deliveryBtnDisabled: "disabled",
    currentOrder 
  });

  await expect(SOD).toClickOnElement({
    selector: sellerOrderDetailsPage.button.preparingCheck.default,
    clickCount: 2,
    delay: 200
  });

  await SOD.waitForTimeout(1000);

  await restartPage({ realTime, situation, SOD, COD, currentOrder });

  await expect(SOD).toGetTextFromElement(
    sellerOrderDetailsPage.element.orderDetails.label.deliveryStatus,
    preparing
  );

  await expect(SOD).toFindElement(
    sellerOrderDetailsPage.button.preparingCheck.disabled
  );

  await validateCOD({ 
    COD, 
    SOD, 
    situation, 
    status: preparing, 
    deliveryBtnDisabled: "disabled",
    currentOrder 
  });

  // Preparando

  await expect(SOD).toFindElement(
    sellerOrderDetailsPage.button.dispatchCheck.notDisabled
  );

  await expect(SOD).toClickOnElement({
    selector: sellerOrderDetailsPage.button.dispatchCheck.notDisabled,
    clickCount: 2,
    delay: 200
  });

  await SOD.waitForTimeout(1000);

  await restartPage({ realTime, situation, SOD, COD, currentOrder });

  await expect(SOD).toGetTextFromElement(
    sellerOrderDetailsPage.element.orderDetails.label.deliveryStatus,
    inTransit
  );

  await expect(SOD).toFindElement(
    sellerOrderDetailsPage.button.dispatchCheck.disabled
  );

  await validateCOD({ 
    COD, 
    SOD, 
    situation, 
    status: inTransit, 
    deliveryBtnDisabled: "notDisabled",
    currentOrder 
  });

  // Entregue

  if([1,3].includes(situation)){
    if(situation === 3){
      expect(
        await action.common.navigate.seller.orders.default(SOD)
      ).toBeTruthy();

      await expect(SOD).toGetTextFromElement(
        sellerOrdersPage.element.card.deliveryStatus,
        inTransit
      );

      await SOD.waitForTimeout(1000);
    }

    await COD.bringToFront();

    await expect(COD).toClickOnElement({
      selector: customerOrderDetailsPage.button.deliveryCheck.notDisabled,
      clickCount: 2,
      delay: 200
    });

    await validateCOD({ 
      COD, 
      SOD, 
      situation, 
      status: delivered, 
      deliveryBtnDisabled: "disabled",
      currentOrder 
    }); 

    if(situation === 1){
      await restartPage({ realTime, situation, SOD, COD, currentOrder });

      await expect(SOD).toGetTextFromElement(
        sellerOrderDetailsPage.element.orderDetails.label.deliveryStatus,
        delivered
      );

      await expect(SOD).toFindElement(
        sellerOrderDetailsPage.button.preparingCheck.disabled
      );

      await expect(SOD).toFindElement(
        sellerOrderDetailsPage.button.dispatchCheck.disabled
      );
    }

    if(situation === 3){
      await restartPage({ realTime, situation, SOD, COD, currentOrder, sellerOrderPage: true });

      await expect(SOD).toGetTextFromElement(
        sellerOrdersPage.element.card.deliveryStatus,
        delivered
      );

      await SOD.waitForTimeout(1000);
    }
  }
  
  return true;
}

module.exports = updateStatus;
