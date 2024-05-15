function renderTheAgeToTheEndUser(ageInYears, ageInMonths, ageInDays) {
    document.querySelector(".restult-cont .years span").innerHTML = ageInYears;
    document.querySelector(".restult-cont .months span").innerHTML = ageInMonths;
    document.querySelector(".restult-cont .days span").innerHTML = ageInDays;
}


function deletePrevErrors() {
    document.querySelector(".card #day").style.borderColor = "#DBDBDBFF";
    document.querySelector(".card #month").style.borderColor = "#DBDBDBFF";
    document.querySelector(".card #year").style.borderColor = "#DBDBDBFF";
    const errors = document.querySelectorAll(".error");
    errors.forEach((error) => {
        error.remove();
    })
}

function RenderError(input, errorMessage = "invalid input") {
    input.style.borderColor = "red";
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error");
    errorDiv.innerHTML = errorMessage;
    errorDiv.style.fontSize = "10px";
    errorDiv.style.marginTop = "5px";
    errorDiv.style.fontWeight = "400";
    errorDiv.style.color = "red";

    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

function MonthWith30Days(monthValue) {
    return monthValue === 4 || monthValue === 6 || monthValue === 9 || monthValue === 11;
}

function isFebruary(monthValue) {
    return monthValue === 2
}

function validate(yearInput, monthInput, dayInput) {
    if (dayInput.value === "" || monthInput.value === "" || yearInput.value === "") {
        if (dayInput.value === "")
            RenderError(dayInput, "this field is required ");
        if (monthInput.value === "")
            RenderError(monthInput, "this field is required ");
        if (yearInput.value === "")
            RenderError(yearInput, "this field is required ");
        return false;
    }

    if (isNaN(dayInput.value) || isNaN(monthInput.value) || isNaN(yearInput.value)) {
        if (isNaN(dayInput.value))
            RenderError(dayInput, "invalid input");
        if (isNaN(monthInput.value))
            RenderError(monthInput, "invalid input");
        if (isNaN(yearInput.value))
            RenderError(yearInput, "invalid input");
        return false;
    }

    const dayValue = parseInt(dayInput.value);
    const monthValue = parseInt(monthInput.value);
    const yearValue = parseInt(yearInput.value);

    if (dayValue > 31 || dayValue < 0)
        RenderError(dayInput);
    if (monthValue >= 13 || monthValue < 0)
        RenderError(monthInput, "invalid month");

    const TodayDate = new Date();
    if (yearValue > TodayDate.getFullYear() || yearValue < 0 || yearValue < 1889)
        RenderError(yearInput, "invalid year");

    if (MonthWith30Days(monthValue)) {
        if (dayValue > 30)
            RenderError(dayInput, "Month has max 30 days")
    }

    if (isFebruary(monthValue)) {
        if (dayValue > 29)
            RenderError(dayInput, "Month has max 29 days")
    }


    const errors = document.querySelectorAll(".error");
    return errors.length <= 0;
}

function calculate() {
    deletePrevErrors();
    const dayInput = document.querySelector(".card #day");
    const monthInput = document.querySelector(".card #month");
    const yearInput = document.querySelector(".card #year");

    if (validate(yearInput, monthInput, dayInput)) {
        const enteredDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
        const todayDate = new Date();

        let ageInYears = todayDate.getFullYear() - enteredDate.getFullYear();
        let ageInMonths = todayDate.getMonth() - enteredDate.getMonth();
        let ageInDays = todayDate.getDate() - enteredDate.getDate();

        if (ageInDays < 0) {
            ageInDays += 30;
            ageInMonths--;
        }

        if (ageInMonths < 0) {
            ageInMonths += 12;
            ageInYears--;
        }

        renderTheAgeToTheEndUser(ageInYears, ageInMonths, ageInDays);
    }


}