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

  if (document.querySelector(".mySwiper")) {
    const swiper = new Swiper(document.querySelector(".mySwiper"));
    console.log(swiper);
  }
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
        delay: 1000,
        disableOnInteraction: false,
      },
      slidesPerView: "auto", // 자동으로 슬라이드 뷰 설정
      speed: 1000, // 슬라이드 속도 조정
    });
  }
  if (document.querySelector(".swiper03")) {
    var swiper03 = new Swiper(".swiper03", {
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
      },
      slidesPerView: 1.2,
      spaceBetween: 17,
    });
  }
  if (document.querySelector(".swiper04")) {
    var swiper04 = new Swiper(".swiper04", {
      direction: "vertical",
      loop: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      speed: 2000,
      slidesPerView: 3,
      loopAdditionalSlides: 1,
    });
  }
});

// Resize for Public Common
window.addEventListener(
  "resize",
  uxgFn.debounce(() => {})
);
