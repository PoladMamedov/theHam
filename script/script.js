"use strict";
// Перемикання вкладок у секції `Our services`
function serviceSectionTabChanger(event) {
  const serviceSectionTabs = document.querySelectorAll(".service-section-tabs");
  const serviceSectionTabsContent = document.querySelectorAll(
    ".service-section-tabs-content"
  );
  serviceSectionTabs.forEach((elem) => {
    elem.classList.remove("service-section-tabs-active");
  });
  event.target.classList.add("service-section-tabs-active");
  const tabName = event.target.dataset.tab;
  serviceSectionTabsContent.forEach((elem) => {
    if (elem.classList.contains(tabName)) {
      elem.classList.add("show");
    } else {
      elem.classList.remove("show");
    }
  });
}
const serviceSectionTabsList = document.querySelector(".service-tabs-list");
serviceSectionTabsList.addEventListener("click", serviceSectionTabChanger);

// Перемикання вкладок, фільтрація та додавання фото у секції `Our Amazing Work`
function imgSorter() {
  const imgList = document.querySelectorAll(".our-work-photos-item");
  imgList.forEach((elem) => {
    elem.removeAttribute("hidden");
    if (selectedTabFilter === "all") {
      return;
    } else if (elem.dataset.filter !== selectedTabFilter) {
      elem.setAttribute("hidden", "true");
    }
  });
}

let selectedTabFilter = "all";
function tabChanger() {
  const ourWorkTabs = document.querySelectorAll(".our-work-section-tabs");
  ourWorkTabs.forEach((elem) => {
    elem.classList.remove("our-work-section-tabs-active");
  });
  selectedTabFilter = event.target.dataset.name;
  event.target.classList.add("our-work-section-tabs-active");
  imgSorter();
}

const ourWorkTabsList = document.querySelector(".our-work-tabs");
ourWorkTabsList.addEventListener("click", tabChanger);

let addingCount = 0;
function imgAdder() {
  document.querySelector(".loading-animation").remove();
  document.querySelector(".our-work-container").append(loadMoreBtn1);
  const imgWrapper = document.querySelector(".our-work-photos");
  addingCount += 12;
  for (let i = 1; i <= 12; i++) {
    let newLi = document.querySelectorAll(".our-work-photos-item")[i - 1].cloneNode(true);
    let liImgSrc = newLi.firstElementChild.getAttribute("src").split("--");
    let newLiImgSrc = liImgSrc[0] + "--" + (addingCount + i) + ".jpg";
    newLi.firstElementChild.setAttribute("src", newLiImgSrc);
    imgWrapper.append(newLi);
  }
  if (addingCount >= 24) {
    loadMoreBtn1.remove();
  }
  imgSorter();
}

function loader() {
  loadMoreBtn1.remove();
  const loadingAnimation = document.createElement("div");
  loadingAnimation.classList.add("loading-animation");
  document.querySelector(".our-work-container").append(loadingAnimation);
  setTimeout(imgAdder, 2000);
}

const loadMoreBtn1 = document.querySelector(".load-more-btn1");
loadMoreBtn1.addEventListener("click", loader);

// Перемикання вкладок каруселі у секції `What people say about theHam
let selectedTab = 1;
function feedbackSectionTabChanger(event) {
  const feedbackTabsContent = document.querySelectorAll(".feedback-tab");
  const feedbackTabs = document.querySelectorAll(".feedback-tab-btn");
  event.preventDefault();
  const targetLink = event.target.closest("a");

  if (targetLink.classList.contains("feedback-tab-btn-arrow")) {
    if (targetLink.dataset.direction === "left") {
      selectedTab === 1 ? (selectedTab = 4) : (selectedTab = selectedTab - 1);
    }
    if (targetLink.dataset.direction === "right") {
      selectedTab === 4 ? (selectedTab = 1) : (selectedTab = selectedTab + 1);
    }
    feedbackTabs.forEach((elem) => {
      elem.classList.remove("active");
    });
    feedbackTabs[selectedTab - 1].classList.add("active");
  }
  if (
    !targetLink.classList.contains("active") &&
    !targetLink.classList.contains("feedback-tab-btn-arrow")
  ) {
    feedbackTabs.forEach((elem) => {
      elem.classList.remove("active");
    });
    targetLink.classList.add("active");
    selectedTab = +targetLink.dataset.number;
  }
  feedbackTabsContent.forEach((elem) => {
    elem.classList.remove("showed");
  });
  feedbackTabsContent[selectedTab - 1].classList.add("showed");
}

const tabList = document.querySelector(".feedback-tabs-list");
tabList.addEventListener("click", feedbackSectionTabChanger);

// gallery of best images:
function msnryGrid() {
  const smallerGridLayout = document.querySelector(".grid-item-3");
  const msnryGrid2 = new Masonry(smallerGridLayout, {
    itemSelector: ".smaller-grid-item",
    columnWidth: 61,
    gutter: 1,
  });
  const gridLayout = document.querySelector(".best-images-grid");
  const msnryGrid = new Masonry(gridLayout, {
    itemSelector: ".grid-item",
    columnWidth: 373,
    gutter: 20,
  });
}
window.onload = msnryGrid;

function gridImgAdder() {
  loadMoreBtn2.remove();
  const loadingAnimation = document.createElement("div");
  loadingAnimation.classList.add("loading-animation");
  document.querySelector(".best-img-container").append(loadingAnimation);
  setTimeout(() => {
    loadingAnimation.remove();
    const grid = document.querySelector(".best-images-grid");
    for (let i = 19; i <= 26; i++) {
      let newGridImg = document.querySelectorAll(".grid-item")[0].cloneNode(true);
      let imgSrc = newGridImg.firstElementChild.getAttribute("src").split("1");
      newGridImg.firstElementChild.setAttribute("src",`${imgSrc[0] + i + imgSrc[1]}`);
      grid.append(newGridImg);
    }
    msnryGrid();
  }, 2000);
}

const loadMoreBtn2 = document.querySelector(".load-more-btn2");
loadMoreBtn2.addEventListener("click", gridImgAdder);
