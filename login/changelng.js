const isKorean = navigator.language === "ko-KR";
if (isKorean) {
  document
    .getElementById("lang-select")
    .options[1].setAttribute("selected", true);
}
i18next.init(
  {
    lng: isKorean ? "ko" : "en",
    debug: true,
    resources: {
      ko: {
        translation: {
          title: "로그인",
          content: "계정이 없으신가요?",
          youneed: "회원가입!",
          goback: "뒤로가기"
        }
      },
      en: {
        translation: {
          title: "login",
          content: "Don't you have an account?",
          youneed: "Sign up!",
          goback: "back"
        }
      },
      fr: {
        translation: {
          title: "jonction,",
          content: "Passez une bonne journée!",
          youneed: "se joindre!",
          goback: "reculer"
        }
      }
    }
  },
  function(err, t) {
    // init set content
    if (err) {
      console.error(err);
    } else {
      updateContent();
    }
  }
);

function updateContent() {
  document.getElementById("title").innerHTML = i18next.t("title");
  document.getElementById("content").innerHTML = i18next.t("content");
  document.getElementById("youneed").innerHTML = i18next.t("youneed");
  document.getElementById("goback").innerHTML = i18next.t("goback");


  var youneedLink = document.getElementById("youneed");
  youneedLink.innerText = i18next.t("youneed");
  youneedLink.href = "/signup/newuser.html"; // 링크 URL 지정


  var gobackLink = document.getElementById("goback");
  gobackLink.innerText = i18next.t("goback");
  gobackLink.href = "/domabam.html"; // 링크 URL 지정
}

i18next.on("languageChanged", () => {
  updateContent();
});

/*
function updateContent() {
    document.getElementById("title").innerHTML = i18next.t("title");
    document.getElementById("content").innerHTML = i18next.t("content");
    var youneedLink = document.getElementById("youneed");
    youneedLink.innerText = i18next.t("youneed");
    youneedLink.href = "/signup/newuser.html"; // 링크 URL 지정
}
*/