let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let spinnersEl = document.getElementById("spinners");
let resultEl = document.getElementById("result");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let span_timeEl = document.getElementById("spantime");

let answers = {
    a: "",
    b: ""
}

let quoteDisplayElTC = function() {
    let options = {
        method: "GET",
    };
    let url = "https://apis.ccbp.in/random-quote";
    fetch(url, options)
        .then(function(response) {
            return response.text();
        })
        .then(function(response) {
            let aa = JSON.parse(response);
            let bb = aa.content;
            quoteDisplayEl.textContent = bb;
            answers.a = bb;
        });
};

spinnersEl.classList.remove("d-none");
quoteDisplayElTC();
let numb = 0;
spinnersEl.classList.add("d-none");
let clock
function timeStartFunction(){
    clock = setInterval(function() {
        numb = numb + 1;
        span_timeEl.textContent = numb;
        answers.b = numb;
        //console.log(numb);
    }, 1000);
}
timeStartFunction(); 

submitBtnEl.addEventListener("click", function() {
    if (quoteInputEl.value === answers.a) {
        numb = 0;
        clearInterval(clock);
        resultEl.textContent = "You typed in " + answers.b + " seconds";
    } else if (quoteInputEl.value !== answers.a) {
        numb = 0;
        clearInterval(clock);
        resultEl.textContent = "You typed incorrect sentence";
    }
});

resetBtnEl.addEventListener("click", function() {
    clearInterval(clock);
    quoteDisplayElTC();
    numb = 0;
    quoteInputEl.value = "";
    resultEl.textContent = "";
    timeStartFunction();
})