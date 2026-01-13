const buttons = document.querySelectorAll("button");
const result = document.getElementById("result");

const backspace_unicode = "\u232B";

result.focus();

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnValue = btn.textContent;
        if (btnValue === "C") {
            result.value = "";
        } else if (btnValue === backspace_unicode) {
            result.value = result.value.slice(0, -1);
        } else if (btnValue === "=") {
            result.value = calculate(result.value)
        } else {
            result.value += btnValue;
        }
        result.focus();
    });
});

result.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        result.value = calculate(result.value);
        return;
    }

    if (e.key === "Backspace") {
        e.preventDefault();
        result.value = result.value.slice(0, -1);
        return;
    }

    if (e.key.toUpperCase() === "C") {
        e.preventDefault();
        result.value = "";
        return;
    }
});


function calculate(expression) {
    if (!expression || expression === "Error") return "Error";

    const sqrt = "\u221A";  // √
    const pi = "\u03C0";    // π
    try {
        expression = expression
            // Add '*' when a number or ')' appears before a square root
            // 2√2 => 2*√2
            // (2+1)√9 => (2+1)*√9
            .replace(new RegExp(`(\\d|\\))${sqrt}`, "g"), `$1*${sqrt}`) //.replace(/(\d|\))√/g, "$1*√")

            // Add '*' when a number or ')' appears before pi
            // 2π => 2*π
            // (2+1)π => (2+1)*π
            .replace(new RegExp(`(\\d|\\))${pi}`, "g"), `$1*Math.pi`) //.replace(/(\d|\))π/g, "$1*Math.pi")

            // Add '*' after ')' when appears before number or '('
            // (2+1)2 => (2)*2
            // (2+1)(2+1) => (2+1)*(2+1)
            .replace(/\)(?=\d|\()/g, ")*")

            //Add '*' when number appears before '(' 
            //2(2+1) => 2*(2+1)
            .replace(/(\d)\(/g, "$1*(");


        // After √, this takes either a number (including decimals) or a simple expression inside parentheses
        // and wraps it with Math.sqrt()
        // √2 => Math.sqrt(2)
        // √3.14 => Math.sqrt(3.14)
        // √(2+1) => Math.sqrt(2+1)  
        // Note: Regex cannot easily handle nested parentheses. 
        // We use [^)]+ to match everything until the first closing parenthesis.
        // This works for simple expressions but will fail for nested ones like √(2+(2*1)).
        expression = expression.replace(new RegExp(`${sqrt}(\\d+(\\.\\d+)?|\\([^)]+\\))`, "g"),
            "Math.sqrt($1)"); //expression = expression.replace(/√(\d+(\.\d+)?|\([^)]+\))/g, "Math.sqrt($1)");

         expression = expression.replace(new RegExp(pi, "g"), "Math.pi"); //expression = expression.replace(/π/g, "Math.pi");

        return eval(expression);
    }
    catch {
        return "Error";
    }
}