window.uxgFn = {
  ...window.uxgFn, // 혹시 있을지 모르는 uxgFn 업데이트

  debounce(func, delay) {
    let timeoutId;
    const time = delay ? delay : 200;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, time);
    };
  },

  watch(options) {
    // https://caniuse.com/?search=MutationObserver 브라우저 낮은 버전 + Opera Mini 에선 불가능
    if (options.el) {
      options.el =
        typeof options.el === "string"
          ? document.querySelector(options.el)
          : options.el;
    }
    const opt = {
      el: document.body, // - DOM 감시 대상 엘리먼트. default : document.body.
      config: { childList: true, subtree: true }, // - Mutation Observer의 설정. default : { childList: true, subtree: true }.
      console: false, // - 변화를 콘솔에 출력할지 여부. default : false.
      callback() {
        console.log("DOM이 변경되었습니다.");
      }, // - DOM 변화가 감지될 때 실행되는 콜백 함수. default : 기본 동작 콜백.
      ...options,
    };

    setTimeout(() => {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList") {
            if (opt.console) {
              console.log(mutation);
            }
            opt.callback(mutation);
          }
        }
      });
      observer.observe(opt.el, opt.config);
    });
  },
};

// Loaded for Public Common ( Dom 생성후 이미지 포함 X ) - 개발이 비동기 안하면 여기에
document.addEventListener("DOMContentLoaded", () => {});

// Loaded for Public Common ( 모든 리소스 로드후 이미지,js,css ) - 개발이 비동기로드후 필요하면 여기에
window.addEventListener("load", function () {
  // Update
  uxgFn.watch({
    callback(param) {},
  });

  if (document.querySelector(".swiper01")) {
    var swiper01 = new Swiper(".swiper01", {
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      loop: true,
    });
  }
  if (document.querySelector(".swiper02")) {
    var swiper02 = new Swiper(".swiper02", {
      direction: "vertical",
      loop: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      allowTouchMove: false,
      slidesPerView: "auto", // 자동으로 슬라이드 뷰 설정
      speed: 2000, // 슬라이드 속도 조정
    });
  }
  if (document.querySelector(".coach-swiper-container")) {
    var swiper03 = new Swiper(".coach-swiper-container", {
      scrollbar: {
        el: ".coach-swiper-container .swiper-scrollbar",
        hide: false,
      },
      slidesPerView: 1.2,
      spaceBetween: 17,
    });
  }
  if (document.querySelector(".PJ_PG01_001 .swiper04")) {
    document.querySelectorAll(".PJ_PG01_001 .swiper04").forEach(($this) => {
      var swiper04 = new Swiper($this, {
        direction: "vertical",
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        allowTouchMove: false,
        speed: 2000,
        slidesPerView: 3,
        loopAdditionalSlides: 1,
      });
    });
  }
  if (document.querySelector(".ui-tab-btn")) {
    const btnGroup = document.querySelector(".ui-tab-btn");
    const btn = btnGroup.querySelectorAll(".btn-tab");
    const tabContainer = btnGroup.nextElementSibling;
    const tabBoxs = tabContainer.querySelectorAll(".ui-tab-box");
    btn.forEach(($el, idx) => {
      $el.addEventListener("click", () => {
        btn.forEach(($elSub, idxSub) => {
          $elSub.classList.remove("active");
        });
        tabBoxs.forEach(($box) => {
          $box.style.display = "none";
        });
        $el.classList.add("active");
        tabBoxs[idx].style.display = "block";
      });
    });
  }

  if (document.querySelector(".nav-menu")) {
    const navMenu = document.querySelector(".nav-menu");
    const navbarToggle = document.getElementById("navbar-toggle");
    const dropdownMenus = document.querySelectorAll(".dropdown-menu");

    navMenu.style.display = "none";

    navbarToggle.addEventListener("click", function () {
      if (navMenu.style.display === "none") {
        navMenu.style.display = "block";
        setTimeout(() => {
          navMenu.classList.add("active");
        }, 0);
      } else {
        navMenu.classList.remove("active");
        setTimeout(() => {
          navMenu.style.display = "none";
        }, 200);
      }
    });

    navMenu.addEventListener("click", function (e) {
      const trigger = e.target.closest(".dropdown-toggle");
      if (!trigger) return;

      const dropdownMenu = trigger.nextElementSibling;
      const isActive = dropdownMenu.classList.contains("active");

      // 이벤트 전파 방지
      e.stopPropagation();

      dropdownMenus.forEach((menu) => {
        if (menu !== dropdownMenu) {
          menu.classList.remove("active");
          setTimeout(() => {
            menu.style.display = "none";
          }, 200);
          menu.previousElementSibling
            .querySelector(".dropdown-icon")
            .classList.remove("rotate-icon");
          menu.previousElementSibling.classList.remove("active");
        }
      });

      if (!isActive) {
        dropdownMenu.style.display = "block";
        setTimeout(() => {
          dropdownMenu.classList.add("active");
        }, 0);
        trigger.querySelector(".dropdown-icon").classList.add("rotate-icon");
        trigger.classList.add("active");
      } else {
        dropdownMenu.classList.remove("active");
        setTimeout(() => {
          dropdownMenu.style.display = "none";
        }, 200);
        trigger.querySelector(".dropdown-icon").classList.remove("rotate-icon");
        trigger.classList.remove("active");
      }
    });
  }

  // footer 팝업
  function closeAllPopups() {
    document.querySelectorAll(".popup").forEach((popup) => {
      popup.classList.remove("show");
    });
  }

  function openPopup(popupId) {
    closeAllPopups();
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.classList.add("show");
    }
  }

  if (document.querySelectorAll(".ui-popup-open")) {
    const openBtn = document.querySelectorAll(".ui-popup-open");
    openBtn.forEach(($el, idx) => {
      const target = $el.dataset.popup;

      $el.addEventListener("click", () => {
        openPopup(target);
      });
    });
    document.querySelectorAll(".close-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const popup = this.closest(".popup");
        if (popup) {
          popup.classList.remove("show");
        }
      });
    });
  }

  // footer 팝업 끝

  if (document.querySelector(".review-more .more-btn")) {
    document
      .querySelectorAll(".review-more .more-btn")
      .forEach(function (moreBtn) {
        moreBtn.addEventListener("click", function () {
          const reviewContent =
            this.closest(".review-card").querySelector(".review-content");

          const isExpanded = reviewContent.classList.contains("expanded");

          if (isExpanded) {
            reviewContent.classList.remove("expanded");
            reviewContent.style.overflow = "hidden";
            reviewContent.style.textOverflow = "ellipsis";
            reviewContent.style.display = "-webkit-box";
            reviewContent.style.webkitLineClamp = "3";
            reviewContent.style.webkitBoxOrient = "vertical";
          } else {
            reviewContent.classList.add("expanded");
            reviewContent.style.overflow = "visible";
            reviewContent.style.textOverflow = "clip";
            reviewContent.style.display = "block";
            reviewContent.style.webkitLineClamp = "unset";
            reviewContent.style.webkitBoxOrient = "unset";
          }
        });
      });
  }

  if (document.querySelector(".question-list .que")) {
    document.querySelectorAll(".que").forEach(function (que) {
      que.addEventListener("click", function () {
        const ans = this.nextElementSibling;
        if (ans.classList.contains("active")) {
          ans.classList.remove("active");
          setTimeout(() => {
            ans.style.visibility = "hidden";
          }, 300);
        } else {
          ans.style.visibility = "visible";
          setTimeout(() => {
            ans.classList.add("active");
          }, 10);
        }
      });
    });
  }
});

// Resize for Public Common
window.addEventListener(
  "resize",
  uxgFn.debounce(() => {})
);
