// カロリーを保持する変数
let cal = 0;
let calPerSecond = 0;

// カロリーの表示を更新する関数
function updateCal() {
  let displayCal;
  if (cal > 1000) {
    displayCal = (Math.floor(cal) / 1000).toFixed(3) + "kcal";
  } else {
    displayCal = Math.floor(cal) + "cal";
  }
  let displayCalPerSecond;
  if (calPerSecond > 1000) {
    displayCalPerSecond = "-" + (calPerSecond / 1000).toFixed(3) + "kcal/s";
  } else {
    displayCalPerSecond = "-" + calPerSecond + "cal/s";
  }
  document.getElementById("cal").textContent = displayCal + displayCalPerSecond;
}

// ボタンクリック時の処理
document.getElementById("clickButton").addEventListener("click", function () {
  cal++; // カロリーをインクリメント
  updateCal(); // カロリーの表示を更新
  createHeart(); // ハートを生成してアニメーション開始
});

// 初期表示時にカロリーを更新
updateCal();

// ハートを生成してアニメーション開始する関数
function createHeart() {
  const heart = document.createElement("span");
  heart.classList.add("heart");
  heart.innerHTML = "❤";
  document.body.appendChild(heart);

  const x = Math.random() * window.innerWidth;
  const y = window.innerHeight - 200;
  const size = Math.random() * 30 + 10;
  const animationDuration = Math.random() * 2 + 1;

  heart.style.left = `${x}px`;
  heart.style.bottom = `${y}px`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${animationDuration}s`;

  setTimeout(() => {
    heart.remove();
  }, animationDuration * 1000);
}


// アイテムのパワーに応じて毎秒カロリーを増やす処理
setInterval(function () {
  calPerSecond = 0;
    for(let i = 0; i < shopItems.length; i++)
    calPerSecond += shopItems[i].power * shopItems[i].count; 
    cal += calPerSecond/100;
    updateCal();
  }, 10); // 0.001秒ごとに実行
  
// ショップアイテムのデータ
const shopItems = [
  { name: "Protein Shake", price: 10, count: 0, power:1 },
  { name: "Chicken Breast", price: 20, count: 0, power:2 },
  { name: "Broccoli", price: 30, count: 0, power:3 },
  { name: "Brown Rice", price: 40, count: 0, power:4 },
  { name: "Salmon Fillet", price: 50, count: 0, power:5 },
  { name: "Avocado", price: 60, count: 0, power:6 },
  { name: "Greek Yogurt", price: 70, count: 0, power:7 },
  { name: "Spinach", price: 80, count: 0, power:8 },
  { name: "Quinoa", price: 90, count: 0, power:9 },
  { name: "Almonds", price: 100, count: 0, power:10 },
  { name: "Oatmeal", price: 110, count: 0, power:11 },
  { name: "Cottage Cheese", price: 120, count: 0, power:12 },
  { name: "Kale", price: 130, count: 0, power:13 },
  { name: "Tofu", price: 140, count: 0, power:14 },
  { name: "Eggs", price: 150, count: 0, power:15 },
  { name: "CalorieMate", price: 160, count: 0, power:20 },
  { name: "Asai", price: 170, count: 0, power:25 },
  { name: "Natto", price: 180, count: 0, power:35 },
  { name: "Ramb", price: 190, count: 0, power:50 },
  { name: "Banana Protein", price: 200, count: 0, power:100 },
  { name: "Cola Remove CO2", price: 2000, count: 0, power:10000 }
];


// ショップの表示を更新する関数
function updateItems() {
    const itemContainer = document.getElementById("itemContainer");
    itemContainer.innerHTML = "";
  
    for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
      if (i >= shopItems.length) {
        break;
      }
  
      const item = shopItems[i];
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span class="item-name">${item.name}</span>
        <span class="item-price">${item.price} cal</span>
        <button class="buyButton" data-index="${i}">Buy</button>
        <button class="sellButton" data-index="${i}">Sell</button>
        <span class="item-count">Count: ${item.count}</span>
      `;
      itemContainer.appendChild(listItem);
    }
  }
  
  // ショップアイテムを売却する関数
  function sellItem(index) {
    const item = shopItems[index];
    if (item.count > 0) {
      cal += item.price * 1/2;
      item.count--;
      updateCal();
      updateItemCount(index, item.count); // アイテムの個数をアップデート
    }
  }
  
  // ページネーションのボタンクリック時の処理
  document.getElementById("itemContainer").addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("buyButton")) {
      const index = parseInt(target.getAttribute("data-index"));
      buyItem(index);
    } else if (target.classList.contains("sellButton")) {
      const index = parseInt(target.getAttribute("data-index"));
      sellItem(index);
    }
  });
  

// ページネーションの表示を更新する関数
function updatePagination() {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  if (startIndex === 0) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  if (startIndex + itemsPerPage >= shopItems.length) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

// アイテムの個数をアップデートする関数
function updateItemCount(index, count) {
    const item = shopItems[index];
    item.count = count;
    updateItems(); // アイテムの表示を更新
  }
  
  // ショップアイテムを購入する関数
  function buyItem(index) {
    const item = shopItems[index];
    if (cal >= item.price) {
      cal -= item.price;
      item.count++;
      updateCal();
      updateItemCount(index, item.count); // アイテムの個数をアップデート
    }
  }
  

// ページネーションのボタンクリック時の処理
document.getElementById("prevButton").addEventListener("click", function () {
  startIndex -= itemsPerPage;
  if (startIndex < 0) {
    startIndex = 0;
  }
  updateItems();
  updatePagination();
});

document.getElementById("nextButton").addEventListener("click", function () {
  startIndex += itemsPerPage;
  if (startIndex >= shopItems.length) {
    startIndex = shopItems.length - (shopItems.length % itemsPerPage);
  }
  updateItems();
  updatePagination();
});

// ショップアイテムの購入ボタンクリック時の処理
document.getElementById("itemContainer").addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("buyButton")) {
    const index = parseInt(target.getAttribute("data-index"));
    buyItem(index);
  }
});

// 初期表示時にショップのアイテムとページネーションを更新
const itemsPerPage = 5;
let startIndex = 0;

updateItems();
updatePagination();
